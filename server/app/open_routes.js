
var express     = require('express');
var jwt         = require('jsonwebtoken');
var LoginModel  = require('./models/login');
var UserModel   = require('./models/user');
var PieModel    = require('./models/pie');
var config      = require('../config/config');
var app         = express();
var openRouter  = express.Router();

var HTML_OK = 200
var HTML_CREATED = 201
var HTML_UNAUTHORIZED = 401

app.set('secretWord', config.secret)

openRouter.get('/',             GetTopLevel);   // GET  ./
openRouter.get('/pies',         GetPies);       // GET  ./pies
openRouter.post('/register',    PostRegister);  // POST ./register
openRouter.post('/login',       PostLogin);     // POST ./login

function GetTopLevel(request, response)
{
    response.json({ message: 'hooray! welcome to our api in a function!' });
}

function GetPies(request, response)
{
    console.log('Getting all pies.');
    PieModel.find(function(error, pies) {
        if (error)
            response.send(error);

        RespondWithOK(response, pies);
    });

}

function PostRegister(request, response)
{
    console.log('Registration request - username: ' + request.body.displayName +
                ' email: ' + request.body.email + 
                ' passsword: ' + request.body.password);

    var newLogin = GetUserDocument(request);
//    var newLogin = GetLoginDocument(request);

    if (!newLogin.usernames[0].username || 
//    if (!newLogin.username || 
        !newLogin.email || 
        !newLogin.password)
    {
        return response.status(400).send("You must include the username, email and the password");
    }

    var checkedEmail = false;
    var checkedUsername = false;
    var uniqueEmail = false;
    var uniqueUsername = false;

    UserModel.findOne( { email: request.body.email }, function(error, login)
//    LoginModel.findOne( { email: request.body.email }, function(error, login)
    {
        checkedEmail = true;

        if (error)
        {
            console.log('ERROR in model.findOne(email)');
            throw error;
        }

        if (!login)
            uniqueEmail = true;

        if (checkedUsername)
            RespondToRegistrationAttempt(uniqueUsername, uniqueEmail, newLogin, response);
    });

    UserModel.findOne( { "usernames.username": request.body.displayName }, function(error, login)
//    LoginModel.findOne( { username: request.body.displayName }, function(error, login)
    {
        checkedUsername = false;

        if (error)
        {
            console.log('ERROR in model.findOne(displayName) 1');
            throw error;
        }

        if (!login)
            uniqueUsername = true;

        if (checkedEmail)
            RespondToRegistrationAttempt(uniqueUsername, uniqueEmail, newLogin, response);
    });
}

function PostLogin(request, response)
{
    console.log('Login request - email: ' + request.body.email + 
                ' passsword: ' + request.body.password);

    UserModel.findOne( { email: request.body.email }, function(error, login)
//    LoginModel.findOne( { email: request.body.email }, function(error, login)
    {
        if (error)
        {
            console.log('ERROR in model.findOne(displayName) 2');
            throw error;
        }

        if (login && login.password == request.body.password)
            RespondWithSuccessfulCreation(response, login);
        else
            RespondWithUnauthorizedError(response, "Those credentials are not valid on this system.");
    });
}

function GetUserDocument(request)
{
    var now = new Date();
    console.log('Creating user at ' + now);

    var newUser = new UserModel({ 
        email:          request.body.email, 
        password:       request.body.password,
        usernames: [{
            username:   request.body.displayName,
            created:    now
        }],
        admin:          false,
        created:        now
    });

    return newUser;
}
/*
function GetLoginDocument(request)
{
    var newLogin = new LoginModel({ 
        username:   request.body.displayName, 
        email:      request.body.email, 
        password:   request.body.password
    });

    return newLogin;
}
*/
function CreateToken(user)
{
    var returnedUser = {
        username:   user.usernames[0].username,
//        username:   user.username,
        email:      user.email
    }

    return jwt.sign(returnedUser, app.get('secretWord'), { expiresIn: 24 * 60 * 60 });
}

function OnLoginSave(login, response)
{
    RespondWithSuccessfulCreation(response, login);
}

function RespondToRegistrationAttempt(uniqueUsername, uniqueEmail, newLogin, response)
{
    if (uniqueUsername && uniqueEmail)
        newLogin.save(OnLoginSave(newLogin, response));
    else if (!uniqueUsername && !uniqueEmail)
        RespondWithUnauthorizedError(response, "That username and also that email are already registered with us.");
    else if (!uniqueUsername)
        RespondWithUnauthorizedError(response, "That username is already registered with us.");
    else // if (!uniqueEmail)
        RespondWithUnauthorizedError(response, "That email is already registered with us.");
}

function RespondWithUnauthorizedError(response, errorMessage)
{
    response.status(HTML_UNAUTHORIZED).send(errorMessage);
}

function RespondWithSuccessfulCreation(response, login)
{
    response.status(HTML_CREATED).send({ id_token: CreateToken(login) });
}

function RespondWithOK(response, dataToSend)
{
    response.status(HTML_OK).send(dataToSend);
}

module.exports = openRouter;

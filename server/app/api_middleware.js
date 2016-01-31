var express			= require('express');
var jwt				= require('jsonwebtoken');
var config      	= require('../config/config');
var app         	= express();

app.set('secretWord', config.secret)

function AllApiRoutes(request, response, next)
{
    console.log('Something is happening at ', Date.now());
    next(); // make sure we go to the next routes and don't stop here
}

function VerifyToken(request, response, next) {

    // check header or url parameters or post parameters for token
    var token = request.body.token || 
    			request.query.token || 
    			request.headers['x-access-token'];
    console.log('Token: ' + token);

    // decode token
    if (token)
    {
    	var secret = app.get('secretWord');
		console.log('secret: ' + secret);

        // verifies secret and checks exp
        jwt.verify(token, secret, function(err, decoded) {      
            if (err)
            {
			    console.log('jwt.verify() error: ' + err);
                return response.json({
                                    success: false,
                                    message: 'Failed to authenticate token.'
                                });    
            }
            else
            {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;    
                next();
            }
        });
    }
    else
    {
        // if there is no token, return an error
        return response.status(403).send({
                                        success: false, 
                                        message: 'No token provided.' 
                                    });
    }
}

exports.AllApiRoutes = AllApiRoutes;
exports.VerifyToken  = VerifyToken;
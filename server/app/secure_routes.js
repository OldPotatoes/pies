var express			= require('express');
var jwt             = require('express-jwt');
var config          = require('../config/config');
var Pie 			= require('./models/pie');
var middleware      = require('./api_middleware');
var secureRouter	= express.Router();
var app             = express();                        // define our app using express

// middleware to use for all requests
//secureRouter.use(middleware.AllApiRoutes);
//secureRouter.use(middleware.VerifyToken);

var jwtCheck = jwt( {secret: config.secret} );

app.use('/api', jwtCheck);

secureRouter.post('/pies',  PostPies);           // POST    ./api/pies
secureRouter.get('/pies',   GetPies);            // GET     ./api/pies

secureRouter.get('/pies/:pie_id',   GetPie);     // GET     ./api/pies/:pie_id
secureRouter.put('/pies/:pie_id',   PutPie);     // PUT     ./api/pies/:pie_id
secureRouter.delete('/pies/:pie_id', DeletePie); // DELETE  ./api/pies/:pie_id


function GetPies(request, response)
{
    console.log('Getting all pies.');
    Pie.find(function(error, pies) {
        if (error)
            response.send(error);

        //response.json(pies);
        response.status(200).send(pies);
    });

}

function PostPies(request, response)
{	
    console.log('Making pie.');
    var pie = new Pie();            // create a new instance of the Pie model
    pie.name = request.body.name;   // set the pie's name (comes from the request)
    console.log('Pie called ' + pie.name);

    // save the pie and check for errors
    console.log('Saving pie.');
    pie.save(function(err) {
        if (err)
            response.send(err);

        response.json({ message: 'Pie made!' });
    });
}


function GetPie(request, response)
{
    Pie.findById(request.params.pie_id, function(err, pie) {
        if (err)
            response.send(err);
//        response.json(pie);
        console.log('Getting ' + pie.name);

        response.status(200).send(pie);
    });


}

function PutPie(request, response)
{
    // use our pie model to find the pie we want
    Pie.findById(request.params.pie_id, function(err, pie) {

        if (err)
            response.send(err);

        pie.name = request.body.name;  // update the pie's info

        // save the pie
        pie.save(function(err) {
            if (err)
                response.send(err);

            response.json({ message: 'Pie updated!' });
        });

    });
}

function DeletePie(request, response)
{
    Pie.remove({
        _id: request.params.pie_id
    }, function(err, pie) {
        if (err)
            response.send(err);

        response.json({ message: 'Successfully deleted' });
    });
}

module.exports = secureRouter;

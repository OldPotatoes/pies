
var bodyParser      = require('body-parser');
var cors			= require('cors')
var express         = require('express');
var mongoose        = require('mongoose');
var config          = require('./config/config');
var openRoutes      = require('./app/open_routes');
var secureRoutes    = require('./app/secure_routes');
var app             = express();                        // define our app using express

mongoose.connect(config.database);
var dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'Database connection error:')); // console.error doesn't add the error info

dbConnection.once('open', function()
{
	console.log.bind(console, ('Database is connected.'));
	FireHerUp();
});

function FireHerUp()
{
	//var whitelist = ['http://example1.com', 'http://localhost:8080'];
	//var corsOptions = {
	//		origin: function(origin, callback) {
	//			var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
	//			callback(null, originIsWhitelisted);
	//	}
	//};

	app.use(bodyParser.urlencoded({ extended: true }));     // bodyParser allows the use of POST
	app.use(bodyParser.json());
	app.use(cors());
	//app.use('/', cors(corsOptions), openRoutes);			// Register open routes
	app.use('/', openRoutes);			// Register open routes
	//app.use('/api', cors(corsOptions), secureRoutes);       // Register secured routes
	app.use('/api', secureRoutes);       // Register secured routes
	app.use(PageNotFound);

	var port = process.env.PORT || 8081;                    // Define the port
	app.listen(port);                                       // Start the server

	console.log('Pie happens on port ' + port);
}

function PageNotFound(request, response, next)
{
    console.log('404 Error on url: ' + request.url);
    response.status(404).send("Can't find url " + request.url);
}

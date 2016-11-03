// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: 'xyz@gmail.com', pass: '' } });

// var cors = require('cors');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 
var corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

app.options('*', cors(corsOptions));

router.route('/')

    .post(cors(corsOptions), function(req, res) {

    	var data = req.body;
    	console.log(data);
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: '"Fred Foo " <foo@blurdybloop.com>', // sender address
		    to: 'op.sumitsheoran@gmail.com', // list of receivers
		    subject: 'Hello ', // Subject line
		    text: 'Hello world ', // plaintext body
		    html: '<b>Hello world </b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
    });



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
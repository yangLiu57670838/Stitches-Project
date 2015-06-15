var orders = require('../models/orders');
var multer = require('multer');//
var done = false;//

var express = require('express');//
var mongoose = require('mongoose');//
//var _ = require('lodash');
//var async = require('async-chainable');
//var mkdirp = require('mkdirp');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser'); // bodyparser can get form values through restful post
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// FIXME: Security needed here to ensure only admins can get CRUD access
restify.serve(app, orders);//go to database throught restify

app.get('/api/orders/status/:status', function(req, res) {
	var id = req.params.id;
	orders.findOne({'status': req.params.status }, function(err, item) {
		res.send(item).end();
	});
});


app.get('/api/orders/:id', function(req, res) {
	var id = req.params.id;
	orders.findOne({'_id': req.params.id }, function(err, item) {//findOne is the method of mongoosejs, which is a monodb object for nodejs only!!! 
		res.send(item).end();
	});
});
 
app.get('/api/orders', function(req, res) {
	// FIXME: This needs to be for [type=admin] only
	model.find({}).exec(function(err, items) {
		res.json(items);
	});
});

app.post('/api/orders/create', function(req, res) {
	var data = req.body;
	console.log('Adding order: ' + JSON.stringify(data));
	model.create(data, function(err, result) {
		if (err) {
			res.send({error: 'An error has occurred'}).end();
		} else {
			console.log('Success: ' + JSON.stringify(result[0]));
			res.send(result[0]).end();
		}
	});
});

app.put('/api/orders/:id', function(req, res) {
	var id = req.params.id;
	var data = req.body;
	console.log('Updating order: ' + id + ' with', JSON.stringify(data));
	model.update({'_id': id}, data, function(err, result) {//here, model is an object for access orders table in database
		if (err) {
			console.log('Error updating order: ' + err);
			res.send({'error': 'An error has occurred'}).end();
		} else {
			res.send(data).end();
		}
	});
});


app.use(multer({ dest: './uploads/',//
    rename: function (fieldname, filename, req, res) {
console.log('multer:', req.body);
	//var name = req.body;

    return filename+Date.now();//????json or now, how to convert data to readable name??
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;


}
}));

app.get('./views/partials/users/addOrder.html',function(req,res){//
      res.sendfile("./views/partials/users/addOrder.html");
      
});

app.post('/api/photo',function(req,res){//orderid is the way to pass data from angularjs controller to here
  if(done==true){


    //console.log(req.files);
   // res.end("File uploaded.");
   //res.redirect("back");
    var filename = req.files.userPhoto.name;
	var id = "abc";
  // return res.redirect('http://localhost:4000/#/users/confirm/' + filename + '/' + id);
//return res.redirect('http://128.199.233.242/#/users/confirm/' + filename + '/' + id);
return res.redirect('/#/users/confirm/' + filename + '/' + id);


  }


});//


//
app.get('./views/partials/users/orderDetails.html',function(req,res){//
      res.sendfile("./views/partials/users/orderDetails.html");
      
});

app.post('/api/adminUpload/',function(req,res){//orderid is the way to pass data from angularjs controller to here
  if(done==true){


    //console.log(req.files);
   // res.end("File uploaded.");
   //res.redirect("back");
    var filename = req.files.adminPhoto.name;
	//var id = "abc";
   //return res.redirect('http://localhost:4000/#/users/DTSconfirm/' + filename + '/' + id);
 
	//return res.redirect('http://128.199.233.242/#/users/DTSconfirm/' + filename);
	return res.redirect('/#/users/DTSconfirm/' + filename);
 	//var root = location.protocol + '//' + location.host;
	//return res.redirect(root + '/#/users/DTSconfirm/' + filename);
  }



});//

app.get('/api/email',function(req,res){

var info = req.query.a;
var bb = JSON.parse(info);//parse json data and return object
var user = bb.email;
var date = bb.order_date;
var request = bb.additional_details;
var file = bb.filename;
var id = bb._id;
	// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'yang.liu9@griffithuni.edu.au',//change to company email information!
        pass: 'lyy888'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Yang Liu <ly_musictt@hotmail.com>', // sender address
    to: 'ly_musictt@hotmail.com', // list of receivers
    subject: 'You has just uploaded a file', // Subject line
    text: file + ' has been uploaded on ' + date + '. \n\n' + 'special request: ' + request + '. You will receive the DTS image soon once you make a payment.', // plaintext body
    html: '' // html body
}

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
	
    }
});
	
return res.redirect('/#/users/payment/' + id);
});

app.get('/api/emailDemo',function(req,res){

var info = req.query.a;
var bb = JSON.parse(info);//parse json data and return object
var user = bb.email;
var date = Date.now();
var request = bb.additional_details;
var file = bb.filename;

	// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'yang.liu9@griffithuni.edu.au',//change to company email information!
        pass: 'lyy888'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Yang Liu <ly_musictt@hotmail.com>', // sender address
    to: 'ly_musictt@hotmail.com', // list of receivers
    subject: user + ' is using demo trial', // Subject line
    text: file + ' has been paid on ' + date, // plaintext body
    html: '' // html body
}

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
	
    }
});
	
return res.redirect('/#/users/orders');
});

app.get('/api/emailDTS',function(req,res){

var info = req.query.a;
var bb = JSON.parse(info);//parse json data and return object
var user = bb.email;
var date = Date.now();
var request = bb.additional_details;
var file = bb.uploadedFilename;

	// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'yang.liu9@griffithuni.edu.au',//change to company email information!
        pass: 'lyy888'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Yang Liu <ly_musictt@hotmail.com>', // sender address
    to: 'ly_musictt@hotmail.com', // list of receivers
    subject: 'DTS File Uploaded', // Subject line
    text: file + ' has been uploaded on ' + date, // plaintext body
    html: '' // html body
}

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
	
    }
});
	
return res.redirect('/#/users/orders');
});



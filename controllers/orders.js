var orders = require('../models/orders');
var multer = require('multer');//
var done = false;//
var express = require('express');//
var mongoose = require('mongoose');//
//var _ = require('lodash');
//var async = require('async-chainable');
//var mkdirp = require('mkdirp');


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
    rename: function (fieldname, filename) {
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
   return res.redirect('http://localhost:4000/#/users/confirm/' + filename + '/' + id);

  }


});//




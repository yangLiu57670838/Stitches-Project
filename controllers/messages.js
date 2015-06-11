var messages = require('../models/messages');

// FIXME: Security needed here to ensure only admins can get CRUD access
restify.serve(app, messages);


app.get('/api/messages/:id', function(req, res) {
	var id = req.params.id;
	messages.findOne({'_id': req.params.id }, function(err, item) {//findOne is the method of mongoosejs, which is a monodb object for nodejs only!!! 
		res.send(item).end();
	});
});
 
app.get('/api/messages', function(req, res) {
	// FIXME: This needs to be for [type=admin] only
	model.find({}).exec(function(err, items) {
		res.json(items);
	});
});

app.post('/api/messages/create', function(req, res) {
	var data = req.body;
	console.log('Adding message: ' + JSON.stringify(data));
	model.create(data, function(err, result) {
		if (err) {
			res.send({error: 'An error has occurred'}).end();
		} else {
			console.log('Success: ' + JSON.stringify(result[0]));
			res.send(result[0]).end();
		}
	});
});

app.put('/api/messages/:id', function(req, res) {
	var id = req.params.id;
	var data = req.body;
	console.log('Updating message: ' + id + ' with', JSON.stringify(data));
	model.update({'_id': id}, data, function(err, result) {//here, model is an object for access orders table in database
		if (err) {
			console.log('Error updating message: ' + err);
			res.send({'error': 'An error has occurred'}).end();
		} else {
			res.send(data).end();
		}
	});
});






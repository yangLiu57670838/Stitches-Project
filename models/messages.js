var name = 'messages';


var schema = new mongoose.Schema({
	id: mongoose.Schema.ObjectId,
	remail: {type: String},
	semail: {type: String},
	date: {type: Date},
	detail: {type: String}
});

module.exports = mongoose.model(name, schema);

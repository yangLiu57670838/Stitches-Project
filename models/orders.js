var name = 'orders';

function toLower(v){  
         return v.toLowerCase();  
}

var schema = new mongoose.Schema({
	id: mongoose.Schema.ObjectId,
	_customer: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	email: {type: String},
	order_date: {type: Date},
	additional_details: {type: String},
	payment_status: {type: String, enum: ['Paid','Not Paid', 'Demo Paid']},
	status:{type: String, enum: ['Pending','Accepted','Processing','Completed']},
	PaymentDetails: {type: String},
	filename: {type: String},
	uploadedFilename: {type: String}
});

module.exports = mongoose.model(name, schema);

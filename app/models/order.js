app.factory('Order', function($resource) {
	return $resource('/api/orders/:id', {}, {//get data throught restful
		email: {url: '/api/email'},	//can call Order.email in angularjs
		emailDemo: {url: '/api/emailDemo'},
		emailDTS: {url: '/api/emailDTS'}
	});
});

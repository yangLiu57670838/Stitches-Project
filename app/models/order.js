app.factory('Order', function($resource) {
	return $resource('/api/orders/:id', {}, {//get data throught restful
		
	});
});

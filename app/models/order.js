app.factory('Order', function($resource) {
	return $resource('/api/orders/:id', {}, {
		
	});
});

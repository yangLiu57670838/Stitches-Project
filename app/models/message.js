app.factory('Message', function($resource) {
	return $resource('/api/messages/:id', {}, {
		
	});
});

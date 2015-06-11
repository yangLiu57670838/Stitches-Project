app.controller('frontController', function($scope, $routeParams, $location, $rootScope, User, Message) {

	
	console.log('abc:');

	User.profile().$promise.then(function(data) {
		console.log('abc:',data);

		$scope.username = data.username;
	
		
	//$scope.role = data.role;
        $scope.admin = true;
	$scope.user = false;
		if (data.role == "user") {
				$scope.admin = false;
				$scope.user = true;
				
				
			}

			
	Message.query({remail: $scope.username}).$promise.then(function(data) {
	$scope.count = data.length;
	console.log('length:',$scope.count);
	
	var ms = {};
  	$scope.ms = data;

});
	
	



	});
	

	




});



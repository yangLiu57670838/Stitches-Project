app.controller('frontController', function($scope, $routeParams, $location, $rootScope,User) {

	

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

		
	});
	

	

	




});



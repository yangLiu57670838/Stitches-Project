app.controller('frontController', function($scope, $routeParams, $location, $rootScope,User) {

	$scope.testa = 12;
	console.log('abc:');
	$scope.abctest = true;
	$scope.a = "tt";
	User.profile().$promise.then(function(data) {
		console.log('abc:',data);

		$scope.username = data.username;

		$scope.b = data.username;
	//$scope.role = data.role;
        $scope.admin = true;
	$scope.user = false;
		if (data.role == "user") {
				$scope.admin = false;
				$scope.user = true;
				$scope.testa = 13;
				$scope.abctest = false;
			}

		
	});
	

	

	




});



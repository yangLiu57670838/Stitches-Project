app.controller('dashboardController', function($scope, $routeParams, $location, $rootScope) {

		$customer = $rootScope.user;
	$scope.role = $customer.role;
        $scope.admin = true;
	$scope.user = false;
		if ($customer.role == "user") {
				$scope.admin = false;
				$scope.user = true;
			}

	


	




});

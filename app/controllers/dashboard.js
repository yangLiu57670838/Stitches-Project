app.controller('dashboardController', function($scope, $routeParams, $location, $rootScope, Order) {

		$customer = $rootScope.user;
	$scope.role = $customer.role;
        $scope.admin = true;
	$scope.user = false;

	


	$scope.orders = [];
	$email = $customer.username;
		if ($customer.role == "user") 
		{
				$scope.admin = false;
				$scope.user = true;
				$scope.r = "Customer";
				Order.query({email: $email}).$promise.then(function(data) {
console.log('aaa:' ,data.length);
$scope.count = data.length;
});
				//$scope.count = $scope.orders.length;
	
					/*angular.forEach($scope.orders, function() {

  						$scope.count = $scope.count + 1;
						console.log('abc:',$scope.count);
   					   });*/
				
			} else 
		{
				$scope.r = "Admin";
				Order.query().$promise.then(function(data) {//because nodejs is asynchronous, have to get database data in the promise.then immediately after database query called
console.log('aaa:' ,data.length);

$scope.count = data.length;

});
					
				

		}




});

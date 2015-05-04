app.controller('orderController', function($scope, $routeParams, $location, Order, $rootScope) {

	var order = new Order();

	$scope.order = { //??
		_id: '_new'
	};

	$scope.saving = false;
	
	$customer = $rootScope.user;
	$scope.email = $customer.username;

	$scope.add = function() {
		$scope.saving = true;
		$scope.order.order_date = moment();
		$scope.order.additional_details = $scope.notes;
		$scope.order.email = $scope.email;
		$scope.order.status = "Pending";
		$scope.order.payment_status = "Not Paid";
		$scope.order.filename = "newfile";
		var query = {};

		if ($scope.order._id != '_new') // Save over existing
			query.id = $scope.order._id;
		
		
		Order.save($scope.order).$promise.then(function() {//use restify saving scope data into database
			$location.path("/users/orders"); // Redirect back to order list when done
		});
	};

	// return to previous page
    $scope.back = function () {
      window.history.back();
 };


});



app.controller('orderListController', function($scope, $routeParams, $location, Order, $rootScope) {


		$customer = $rootScope.user;
		$scope.role = $customer.role;
       		$scope.admin = true;
		$scope.user = false;

		if ($customer.role == "user") {
				$scope.admin = false;
				$scope.user = true;
				$email = $customer.username;
				$scope.orders = [];
				$scope.status = $routeParams.status
	
				$scope.refresh = function() {
					$scope.orders = Order.query({status: $routeParams.status, email: $email});
				};
				$scope.refresh();
	



			} else

		{

				$scope.orders = [];
				$scope.status = $routeParams.status
	
				$scope.refresh = function() {
					$scope.orders = Order.query({status: $routeParams.status});
				};
				$scope.refresh();
	

		}	






     // Delete order handler
    $scope.deleteOrder = function (order) {
        if ( confirm("Are you sure you want to delete " + order.name + "?") ){
            order.$delete({_id: order._id});
            $scope.refresh();
        }
    };

	  $scope.downloadOrder = function (order) {
	location.assign("uploads/" + order.filename);
	//$location.path("/users/downloads");

//var mtd = require('mt-downloader');

//var url = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Gadget_the_pug_expressive_eyes.jpg';
//var file = '/uploads/Gadget_the_pug_expressive_eyes.jpg';

//var downloader = new mtd(file, url);

//downloader.start();


		
}

 
        $scope.orderDetails = function (order) {
        $location.path("/users/orderDetails/" + order.email);
    };


/*console.log($scope.orders);*/

$scope.displayMessage = "Orders";


});

app.controller('orderDetailsController', function($scope, $routeParams, $location, User) {
	console.log("paras:",$routeParams.id);
	$scope.user = {};

	User.query({username: $routeParams.id}).$promise.then(function(data) {//before get element from database, should have promise.then
		$scope.user = data[0];
	});

       $scope.payment_status = "Unknown";//need to be fixed
       $scope.status = "Pending";//need to be fixed

    $scope.back = function () {
      window.history.back();
    };

});

app.controller('orderConfirmController', function($scope, $routeParams, $location, Order) {
	console.log("paras:",$routeParams.filename);
        $scope.displayMessage = $routeParams.filename + " has been uploaded." + $routeParams.id;
	
	$scope.lists = Order.query({filename: "newfile"});
	
	var order = new Order();
	$scope.order = { //??
		_id: '_new'
	};

	$scope.confirm = function() {
		/*var a = $scope.lists[0].email;//????
		$scope.displayMessage = a;//????

		$scope.lists[0].filename = $routeParams.filename;

	

		Order.save({filename: "newfile"}, {filename: $routeParams.filename});

			$location.path("/users/orders/");*/
		//??????
    
		//$scope.displayMessage = "abccccc";

         Order.query({filename: "newfile"}).$promise.then(function(data) {//get original, delete, then create new one, need to be fixed later
		
		$scope.order = data[0];
		$scope.order.filename = $routeParams.filename;
		Order.delete({_id: $scope.order._id});
	
			
		$scope.displayMessage = $scope.order._id + $scope.order.status + $scope.order.filename;

		Order.save($scope.order).$promise.then(function() {
			$location.path("/users/orders"); 
		});
	
		
	});
		



};
    

});


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
		//$scope.order.uploadedFilename = "EMPTY";
		var query = {};

		if ($scope.order._id != '_new') // Save over existing
			query.id = $scope.order._id;
		
		
		Order.save($scope.order).$promise.then(function() {//use restify saving scope data into database
			//$location.path("/users/orders"); // need to  be fixed later, cant redirect here in chrome browser??
		});
	};

	// return to previous page
    $scope.back = function () {
      window.history.back();
 };


});



app.controller('orderListController', function($scope, $routeParams, $location, Order, User, $rootScope) {

		User.query({username: $rootScope.user.username}).$promise.then(function(data) {
		$u = data[0];
		$scope.r = $u.first_name;
		console.log("username:",$rootScope.user.username);
	});


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

				Order.query({email: $email}).$promise.then(function(data) {
		$scope.countorder = data.length;
	});

				$scope.refresh = function() {
					//$scope.orders = Order.query({status: $routeParams.status, email: $email});
				$scope.orders = Order.query({email: $email});
				};
				$scope.refresh();
	



			} else

		{

				Order.query().$promise.then(function(data) {
					$scope.countorder = data.length;
				});
						

				$scope.orders = [];
				$scope.status = $routeParams.status
	
				$scope.refresh = function() {
					//$scope.orders = Order.query({status: $routeParams.status});
					$scope.orders = Order.query();
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


		
};

 
        $scope.orderDetails = function (order) {
        $location.path("/users/orderDetails/" + order.email + '/' + order._id);
    };


/*console.log($scope.orders);*/

$scope.displayMessage = "Orders";


});

app.controller('orderDetailsController', function($scope, $routeParams, $location, $rootScope, User, Order) {
	console.log("paras:",$routeParams.email);
	console.log("paras2:",$routeParams.id);


	$customer = $rootScope.user;
	$scope.role = $customer.role;
if ($customer.role == "user") {
        $scope.usera = true;
console.log("paras:",$scope.usera);

}else {
	$scope.usera = false;
console.log("paras:",$scope.usera);
}



	$scope.user = {};

	User.query({username: $routeParams.email}).$promise.then(function(data) {//after get element from database, should have promise.then
		$scope.user = data[0];
	});



	


    $scope.back = function () {
      window.history.back();
    };


   	Order.query({_id: $routeParams.id}).$promise.then(function(data) {
		$scope.b = data[0];
		$scope.orderid = $routeParams.id;
		console.log("order:", $scope.b.additional_details);
		console.log("orderid:", $scope.orderid);
		//console.log("orderuploadfile:", $scope.b.uploadedFilename);

	var order = new Order();
	$scope.order = { //??
		_id: '_new'
	};

   $scope.upload = function() {//need to b fixed later
		
	  
		$scope.order = data[0];

		$scope.order.uploadedFilename = "uploading";
		Order.delete({_id: $scope.order._id});
	

		Order.save($scope.order).$promise.then(function() {
			console.log("changing to u",$routeParams.filename);
		});
	
		
	

	};



    $scope.download = function () {
      location.assign("uploads/" + $scope.b.uploadedFilename);

    };


        $scope.pay = function (b) {
        $location.path("/users/payment/" + b._id);
    };


	});

   

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

			Order.query({filename: $routeParams.filename}).$promise.then(function(data1) {
				//sending email
				Order.email({a: data1[0]}, {email: 'fsdfsdfds'}).$promise.then(function(data) {
					$location.path("/users/payment/" + data1[0]._id);//location.url() is used to go to a new path, location.url is used to go to a new page in the same rooturl.

		});

			//$location.path("/users/orders"); 
               
});


		});
	
		
	});
		



};
    

});



app.controller('DTSConfirmController', function($scope, $routeParams, $location, Order, Message) {
	console.log("paras:",$routeParams.filename);
        $scope.displayMessage = "The DTS file " + $routeParams.filename + " has been uploaded.";
	
	//$scope.lists = Order.query({filename: "newfile"});
	
	var order = new Order();
	$scope.order = { //??
		_id: '_new'
	};

	$scope.confirm = function() {
		
         Order.query({uploadedFilename: "uploading"}).$promise.then(function(data) {//get original, delete, then create new one, need to be fixed later
		
		$scope.order = data[0];
		$scope.order.uploadedFilename = $routeParams.filename;
		Order.delete({_id: $scope.order._id});
	

		Order.save($scope.order).$promise.then(function() {
			 
			Order.emailDTS({a: $scope.order}, {emailDemo: 'fsdfsdfds'}).$promise.then(function(data) {
			var messagea = new Message();

			$scope.messagea = { //??
				_id: '_new'
			};
			$scope.messagea.semail = "vandy@mfdc.biz";
			$scope.messagea.remail = $scope.order.email;
			$scope.messagea.date = Date.now();
			$scope.messagea.detail = "DTS file " + $scope.order.uploadedFilename + " has been uploaded.";
			Message.save($scope.messagea).$promise.then(function() {
				$location.path("/users/orders");

			
				
});
			

			

		});

		
 			
		});
	
		
	});
		



};
    

});




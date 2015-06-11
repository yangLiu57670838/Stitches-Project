app.controller('paymentController', function($scope, $routeParams, $location, Order, Message) {
	
    $scope.types = [{
        type: "temporary",
        name: "One-time Payment"
    },
    {
        type: "short-term",
        name: "One Month Payment"
    },
    {
        type: "mid-term",
        name: "One Month Payment"
    },

    {
        type: "long-term",
        name: 'Six Month Payment'
    }];

	


 $scope.cardTypes = [{
        type: "VISA",
        name: "VISA"
    },
    {
        type: "MasterCard",
        name: "MasterCard"
    },
    {
        type: "AE",
        name: "American Express"
    }];

$scope.month = [{
        type: "January",
        name: "January"
    },
    {
        type: "February",
        name: "February"
    },
    {
        type: "March",
        name: "March"
    },
    {
        type: "April",
        name: "April"
    },

    {
        type: "May",
        name: "May"
    },

    {
        type: "June",
        name: "June"
    },

    {
        type: "July",
        name: "July"
    },

    {
        type: "August",
        name: "August"
    },

    {
        type: "September",
        name: "September"
    },

    {
        type: "October",
        name: "October"
    },

    {
        type: "November",
        name: "November"
    },

    {
        type: "December",
        name: "December"
    }
];

	$scope.year = [{
        type: "2015",
        name: "2015"
    },
    {
        type: "2016",
        name: "2016"
    },
    {
        type: "2017",
        name: "2017"
    }];
console.log("orderid:",$routeParams.order);

    $scope.demo = function () {
      
		var order = new Order();
	$scope.order = { //??
		_id: '_new'
	};
 Order.query({_id: $routeParams.order}).$promise.then(function(data) {
	$scope.order = data[0];
	$scope.order.status = "Accepted";
	$scope.order.payment_status = "Demo Paid";
	Order.delete({_id: $routeParams.order});
	
	Order.save($scope.order).$promise.then(function() {

	Order.emailDemo({a: $scope.order}, {emailDemo: 'fsdfsdfds'}).$promise.then(function(data) {
			var messagea = new Message();

			$scope.messagea = { //??
				_id: '_new'
			};
			$scope.messagea.semail = $scope.order.email;
			$scope.messagea.remail = "vandy@mfdc.biz";
			$scope.messagea.date = Date.now();
			$scope.messagea.detail = "User " + $scope.order.email + " is using demo trial for the order " + $scope.order.filename;
			Message.save($scope.messagea).$promise.then(function() {
				$location.path("/users/orders");

			
				
});
			

			

		});




	
});

	

});
	


    };

});

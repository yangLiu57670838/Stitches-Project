app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/demo', {templateUrl: "/partials/demo.html"})
		.when('/sign_up', {templateUrl: "/partials/register.html"})
		.when('/contact', {templateUrl: "/partials/contact.html"})
		.when('/users/list', {templateUrl: "/partials/users/list.html"})
		.when('/users/edit/:id', {templateUrl: "/partials/users/edit.html"})
                .when('/users/addUsers', {templateUrl: "/partials/users/addUsers.html"})
		.when('/users/orders', {templateUrl: "/partials/users/orders.html"})
		.when('/users/addOrder', {templateUrl: "/partials/users/addOrder.html"})
		.when('/users/orderDetails/:id', {templateUrl: "/partials/users/orderDetails.html"})
	        .when('/users/downloads', {templateUrl: "../uploads/turkish_van_cat1-663x7281428899630874.jpg"})
		.when('/:id', {templateUrl: "/partials/frontpage.html"})
		.when('/users/confirm/:filename', {templateUrl: "/partials/users/orderConfirm.html"})
		.when('/users/payment', {templateUrl: "/partials/users/payment.html"})

		
		.otherwise({templateUrl: "/partials/dashboard.html"});
});

let shopApp = angular.module('shopApp', ['ngRoute']);

shopApp.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'products/products.html',
		controller: 'ProductsCtrl'
	})
	.when('/products', {
		templateUrl: 'products/products.html',
		controller: 'ProductsCtrl'
	})
	.when('/shopcart', {
		templateUrl: 'shopcart/shopcart.html',
		controller: 'ShopcartCtrl'
	})
	.otherwise({
		template: 'Здесь ничего нет!'
	});
	//$locationProvider.html5Mode(true);
})

shopApp.factory('productsFactory', function(){
	let get = function(){
		return [
			{name: 'Product 1', cost: 190, description: 'Product 1 description', image: "1.jpg"},
			{name: 'Product 2', cost: 130, description: 'Product 2 description', image: "2.jpg"},
			{name: 'Product 3', cost: 180, description: 'Product 3 description', image: "3.jpg"},
			{name: 'Product 4', cost: 100, description: 'Product 4 description', image: "4.jpg"},
			{name: 'Product 5', cost: 110, description: 'Product 5 description', image: "5.jpg"},
			{name: 'Product 6', cost: 176, description: 'Product 6 description', image: "6.jpg"},
		]
	}

	return {
		get: get
	}
})

shopApp.factory('shopcartFactory', function(){
	
	let items = [];
	
	let getItems = function(){
		return localStorage.getItem('shopcart') ? JSON.parse(localStorage.getItem('shopcart')) : [];
	}
	
	let getTotalCost = function(){
		let total = 0;
		if(localStorage.getItem('shopcart')){
			JSON.parse(localStorage.getItem('shopcart')).forEach((item, i, arr) => {
				total += item.cost;
			})
		}
		
		return total;
	}
	
	let addItem = function(item){
		items.push(item);
		localStorage.setItem('shopcart', JSON.stringify(items));
	}
	
	let clearShopcart = function(){
		items = [];
		localStorage.removeItem('shopcart');
	}
	
	return {
		getItems: getItems,
		getTotalCost: getTotalCost,
		addItem: addItem,
		clearShopcart: clearShopcart
	}
})

shopApp.controller('MainCtrl', function($scope, $route, $routeParams, $location, shopcartFactory){
	$scope.$route = $route;
	$scope.$location = $location;
    $scope.$routeParams = $routeParams;
	
	$scope.clear = function(){
		shopcartFactory.clearShopcart();
	}
})

shopApp.controller('ProductsCtrl', function($scope, productsFactory, shopcartFactory){
	$scope.products = productsFactory.get();
	
	$scope.addToShopcart = function(item){
		shopcartFactory.addItem(item);
	}
})

shopApp.controller('ShopcartCtrl', function($scope, shopcartFactory){
	$scope.totalCost = shopcartFactory.getTotalCost();
	$scope.shopcart = shopcartFactory.getItems();
	
	
})

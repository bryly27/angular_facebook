// Where you create the angular app and sp?ecify its options
var facebook = angular.module('facebook', ['ngRoute', 'LocalStorageModule']);

facebook.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
		})
		.when('/main', {
			templateUrl: 'partials/main.html',
		})
		.when('/home',{
			templateUrl: 'partials/home.html',
		})
		.when('/profile/edit/photo',{
			templateUrl: 'partials/edit_profile_photo.html',
		})
		.when('/profile/edit',{
			templateUrl: 'partials/edit_profile.html',
		})
		.when('/profile/:id',{
			templateUrl: 'partials/wall.html',
		})
		.when('/profile/about/:id',{
			templateUrl: 'partials/about.html',
		})
		.when('/profile/friends/:id',{
			templateUrl: 'partials/friends.html',
		})
		.when('/profile/photos/:id',{
			templateUrl: 'partials/photos.html',
		})




		.when('/search',{
			templateUrl: 'partials/find_friends.html',
		})

		// .when('/profile/:id',{
		// 	templateUrl: 'partials/profile.html',
		// })
		// .when('/user/:id',{
		// 	templateUrl: 'partials/user.html',
		// })
		.otherwise({
			redirectTo: '/main'
		})
})

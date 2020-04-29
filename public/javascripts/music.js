var app = angular.module('Music', ['ngResource', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
    templateUrl: 'partials/home.html',
    controller:'HomeCtrl'
    })
    .when('/add-album', {
        templateUrl: 'partials/album-form.html',
        controller: 'AddAlbumCtrl'
        })
        .when('/album/:id', {
            templateUrl: 'partials/album-form.html',
            controller: 'EditAlbumCtrl'
            })
            .when('/album/delete/:id', {
                templateUrl: 'partials/album-delete.html', controller: 'DeleteAlbumCtrl'
                })
                
    .otherwise({
    redirectTo: '/'
    });
    }]);
    app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource){
    var Albums = $resource('/api/albums');
    Albums.query(function(albums){
    $scope.albums = albums;
    });
    }]);
    app.controller('AddAlbumCtrl', ['$scope', '$resource', '$location',   
function($scope, $resource, $location){
$scope.save = function(){
var Albums = $resource('/api/albums'); 
Albums.save($scope.album, function(){
$location.path('/');
});
};
}]);
app.controller('EditAlbumCtrl', ['$scope', '$resource', '$location', '$routeParams',
function($scope, $resource, $location, $routeParams){
var Albums = $resource('/api/albums/:id', { id: '@_id' }, { update: { method: 'PUT' }
});

Albums.get({ id: $routeParams.id }, function(album){
$scope.album = album;
});
$scope.save = function(){ 
    Albums.update($scope.album, function(){
$location.path('/');
});
}
}]);
app.controller('DeleteAlbumCtrl', ['$scope', '$resource', '$location', '$routeParams',
function($scope, $resource, $location, $routeParams){
var Albums = $resource('/api/albums/:id');

Albums.get({ id: $routeParams.id }, function(album){
$scope.album = album;
})

$scope.delete = function(){
Albums.delete({ id: $routeParams.id }, function(album){
$location.path('/');
});
}
}]);




    
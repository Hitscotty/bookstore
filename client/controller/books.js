var myApp = angular.module('myApp');

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
        console.log("books controller loaded");
        $scope.getBooks = () => {

                $http.get('/api/books').success( (response) => {
                        $scope.books = response;
                });
        }

        $scope.getBook = () => {
                var id = $routeParams.id;
                $http.get('/api/books/'+id).success( (response) => {
                        $scope.book = response;
                });
        }

        $scope.addBook = () => {
                $http.post('/api/books/', $scope.book).success( (response) => {
                        window.location.href='#/';
                });
        }

        $scope.updateBook = () => {
                var id = $routeParams.id;
                $http.put('/api/books/'+id, $scope.book).success( (response) => {
                        window.location.href='#/';
                });
        }

        $scope.removeBook = (id) => {
                $http.delete('/api/books/'+id).success( (response) => {
                        window.location.href='#/';
                });
        }
}]);

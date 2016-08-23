

(function(){
   'use strict';

    angular.module('thinkster.authentication.services')
        .factory('Authentication', Authentication);

    //TODO: Inject location here
    Authentication.$inject = ['$cookies','$http'];

    function Authentication($cookies, $http) {
        var Authentication = {
            register: register,
            login: login,
            logout: logout,
            getAuthenticatedAccount: getAuthenticatedAccount,
            setAuthenticatedAccount: setAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            unauthenticate: unauthenticate


        };

        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccess, registerFailure);
        }

        function registerSuccess(data, status, headers, config){
            window.location = '/'
        }

        function registerFailure(data, status, headers, config){
            console.log("Failed to register");
        }

        function login(email, password){
            return $http.post('api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccess, loginFailure);
        }

        function logout(){
            return $http.post('/api/v1/auth/logout/')
                .then(logoutSuccess, logoutFailure);
        }

        function loginSuccess(data, status, headers, config){
            setAuthenticatedAccount(data.data);
            window.location = '/';
        }

        function loginFailure(data, status, headers, config){
            console.log("Terrible terrible failure.");
        }

        function logoutSuccess(data, status, headers, config){
            Authentication.unauthenticate();
            window.location = '/'
        }

        function logoutFailure(data, status, headers, config){
            console.error('Unbelievable failure!!!!');
        }

        function getAuthenticatedAccount(){
            if(!$cookies.authenticatedAccount){
                return;
            }
            return JSON.parse($cookies.authenticatedAccount);
        }

        function setAuthenticatedAccount(authenticatedAccount){
            $cookies.authenticatedAccount = JSON.stringify(authenticatedAccount);
        }

        function isAuthenticated(){
            return !!$cookies.authenticatedAccount;
        }

        function unauthenticate(){
            delete $cookies.authenticatedAccount;
        }
        
        return Authentication;
    }
})();
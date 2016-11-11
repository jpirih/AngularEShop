angular.module('app').config(function(lockerProvider){
   lockerProvider.defaults({
       driver: 'local',
       mespace: 'app'
   }); 
});
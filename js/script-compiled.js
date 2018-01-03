"use strict";

var dataController = function () {

  var successLocation = function successLocation(position) {
    var coordinates = position.coords;
    console.log(coordinates);
    console.log(coordinates.latitude);
    console.log(coordinates.longitude);
  };

  var rejectLocation = function rejectLocation(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "User denied the request for Geolocation.";
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable.";
      case error.TIMEOUT:
        return "The request to get user location timed out.";
      case error.UNKNOWN_ERROR:
        return "An unknown error occurred.";
    }
  };

  return {

    getLocation: function getLocation() {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(successLocation, rejectLocation);
      } else {
        return "Geolocation is not supported by this browser.";
      }
    }

  };
}();

var UIController = function () {}();

var appController = function (dataCtrl, UICtrl) {
  var pos = dataCtrl.getLocation();
  return {
    init: function init() {
      console.log(pos);
    }
  };
}(dataController, UIController);

appController.init();

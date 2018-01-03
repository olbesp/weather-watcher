const dataController = (function() {

  const successLocation = function(position) {
    const coordinates = position.coords;
    console.log(coordinates);
    console.log(coordinates.latitude);
    console.log(coordinates.longitude);
  };

  const rejectLocation = function(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return "User denied the request for Geolocation."
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable."
      case error.TIMEOUT:
        return "The request to get user location timed out."
      case error.UNKNOWN_ERROR:
        return "An unknown error occurred."
    }
  };

  return {

    getLocation: function() {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(successLocation, rejectLocation);
      } else {
        return "Geolocation is not supported by this browser.";
      }
    }

  }
})();

const UIController = (function() {

})();

const appController = (function(dataCtrl, UICtrl) {
  const pos = dataCtrl.getLocation();
  return {
    init: function() {
      console.log(pos);
    }
  }
})(dataController, UIController);

appController.init();

// AIzaSyCNnMnCBQZ9HexzA0gigneirn4rWf-FeXU

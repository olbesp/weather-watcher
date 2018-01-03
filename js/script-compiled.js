"use strict";

var init = function () {

  var dataBox = document.getElementById('data');
  var pos = void 0;
  var url = void 0;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      url = "https://fcc-weather-api.glitch.me/api/current?lat=" + pos.lat + "&lon=" + pos.lng;
      sendRequest();
      console.log(url);
      console.log(position);
    }, showError);
  } else {
    // Browser doesn't support Geolocation
    dataBox.innerHTML = "Geolocation is not supported by this browser.";
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        dataBox.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        dataBox.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        dataBox.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        dataBox.innerHTML = "An unknown error occurred.";
        break;
    }
  }

  function sendRequest() {
    axios.get(url).then(updateDOM).catch(handleErrors);
  }

  function updateDOM(res) {
    console.log(res.data);
  }

  // function appendComment(comment) {
  //   var newP = document.createElement('p');
  //   newP.innerText = comment.email;
  //   section.appendChild(newP);
  // }

  function handleErrors(err) {
    if (err.response) {
      dataBox.innerHTML = "Problem with response " + err.response.status;
    } else if (err.request) {
      dataBox.innerHTML = 'Problem with request';
    } else {
      dataBox.innerHTML = "Error " + err.message;
    }
  }
}();

// AIzaSyCNnMnCBQZ9HexzA0gigneirn4rWf-FeXU

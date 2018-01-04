'use strict';

var init = function () {

  var dataBox = document.getElementById('data');
  var icon = document.querySelector('.weather-icon');
  var weather = document.querySelector('.weather');
  var minTemp = document.querySelector('.temp__min');
  var maxTemp = document.querySelector('.temp__max');
  var location = document.querySelector('.location');
  var humidity = document.querySelector('.humidity');
  var pressure = document.querySelector('.pressure');
  var windDegree = document.querySelector('.wind__degree');
  var windSpeed = document.querySelector('.wind__speed');
  var btn = document.querySelector('input[type="checkbox"]');
  var pos = void 0,
      url = void 0;
  var degree = 'C'; // Celsius by default

  var bgImages = {
    day: ['clear-day.jpeg', 'clouds-day.jpeg', 'fog-day.jpeg', 'rain-day.jpeg', 'snow-day.jpeg', 'storm-day.jpeg'],
    night: ['clear-night.jpeg', 'clouds-night.jpeg', 'fog-night.jpeg', 'rain-night.jpeg', 'snow-night.jpeg', 'storm-night.jpeg']
  };

  window.addEventListener('load', setBackground);

  btn.addEventListener('click', function () {
    degree === 'C' ? degree = 'F' : degree = 'C';
    minTemp.textContent = convert(degree, minTemp.textContent);
    maxTemp.textContent = convert(degree, maxTemp.textContent);
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + pos.lat + '&lon=' + pos.lng;
      sendRequest();
    }, showError);
  } else {
    // Browser doesn't support Geolocation
    dataBox.innerHTML = "Geolocation is not supported by this browser.";
  }

  function setBackground() {
    var imgPath = checkWeather() + '-' + checkDayTime() + '.jpeg';
    document.querySelector('.container').style.backgroundImage = 'url(img/' + imgPath + ')';
  }

  function checkDayTime() {
    var time = new Date();
    if (time.getHours() > 5 && time.getHours() < 21) {
      return 'day';
    }
    return 'night';
  }

  function checkWeather() {
    return weather.textContent.toLowerCase();
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
    icon.src = res.data.weather[0].icon;
    weather.textContent = res.data.weather[0].main;
    minTemp.append(res.data.main.temp_min);
    maxTemp.append(res.data.main.temp_max);
    location.textContent = res.data.name;
    humidity.textContent += res.data.main.humidity;
    pressure.textContent += res.data.main.pressure;
    windDegree.textContent = getCardinalDirection(res.data.wind.deg);
    windSpeed.textContent = res.data.wind.speed.toFixed(1) + ' m/s';
  }

  function convert(degree, temp) {
    if (degree == "F") {
      return Math.round(temp * 9 / 5 + 32);
    }
    return Math.round((temp - 32) * 5 / 9);
  }

  function getCardinalDirection(angle) {
    if (typeof angle === 'string') angle = parseInt(angle);
    if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈';
    var arrows = { north: '↑ N', north_east: '↗ NE', east: '→ E', south_east: '↘ SE', south: '↓ S', south_west: '↙ SW', west: '← W', north_west: '↖ NW' };
    var directions = Object.keys(arrows);
    var degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (var i = 0; i < directions.length; i++) {
      if (angle >= i * degree && angle < (i + 1) * degree) return arrows[directions[i]];
    }
    return arrows['north'];
  }

  function handleErrors(err) {
    if (err.response) {
      dataBox.innerHTML = 'Problem with response ' + err.response.status;
    } else if (err.request) {
      dataBox.innerHTML = 'Problem with request';
    } else {
      dataBox.innerHTML = 'Error ' + err.message;
    }
  }
}();

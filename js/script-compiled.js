'use strict';

var init = function () {

  var dataBox = document.getElementById('data');
  var weather = document.querySelector('.weather-type');
  var minTemp = document.querySelector('.weather-box__temp-min');
  var maxTemp = document.querySelector('.weather-box__temp-max');
  var location = document.querySelector('.location');
  var humidity = document.querySelector('.weather-box__data__humidity');
  var pressure = document.querySelector('.weather-box__data__pressure');
  var windDegree = document.querySelector('.weather-box__data__wind-degree');
  var windSpeed = document.querySelector('.weather-box__data__wind-speed');
  var visibility = document.querySelector('.weather-box__data__visibility');
  var btn = document.querySelector('input');
  var pos = void 0,
      url = void 0;
  var degree = 'C'; // Celsius by default

  btn.addEventListener('click', function () {
    degree === 'C' ? degree = 'F' : degree = 'C';
    minTemp.textContent = convert(degree, minTemp.textContent);
    maxTemp.textContent = convert(degree, maxTemp.textContent);
    pressure.textContent = convertUnits(pressure, 'mb↑', 'in↑', 0.02953);
    windSpeed.textContent = convertUnits(windSpeed, 'km/h', 'mph', 0.62);
    visibility.textContent = convertUnits(visibility, 'km', 'mi', 0.62);
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + pos.lat + '&lon=' + pos.lng;
      sendRequest();
      setInterval(sendRequest, 1000 * 60 * 60);
    }, showError);
  } else {
    // Browser doesn't support Geolocation
    dataBox.innerHTML = "Geolocation is not supported by this browser.";
  }

  function setBackground() {
    var imgPath = checkWeather() + '-' + checkDayTime() + '.jpeg';
    document.querySelector('.bg-image').style.cssText = 'background-image: url(img/' + imgPath + '); opacity: 1';
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
      default:
        dataBox.innerHTML = error;
    }
  }

  function sendRequest() {
    axios.get(url).then(updateDOM).catch(handleErrors);
  }

  function updateDOM(res) {
    //console.log(res.data);
    weather.textContent = res.data.weather[0].main;
    minTemp.innerHTML = '' + formatTemp(res.data.main.temp_min);
    maxTemp.innerHTML = '' + formatTemp(res.data.main.temp_max);
    location.textContent = res.data.name;
    humidity.textContent = res.data.main.humidity + '%';
    pressure.textContent = res.data.main.pressure.toFixed(1) + 'mb\u2191';
    windDegree.textContent = getCardinalDirection(res.data.wind.deg);
    windSpeed.textContent = (res.data.wind.speed * 3600 / 1000).toFixed(1) + 'km/h';
    visibility.textContent = (res.data.visibility / 1000).toFixed(1) + 'km';
    setBackground();
  }

  function formatTemp(temp) {
    if (temp <= 0) {
      return temp.toString() + '\u02DA';
    }
    return '+' + temp.toString() + '\u02DA';
  }

  function convert(degree, temp) {
    if (degree == "F") {
      return formatTemp(Math.round(parseInt(temp) * 9 / 5 + 32));
    }
    return formatTemp(Math.round((parseInt(temp) - 32) * 5 / 9));
  }

  function convertUnits(target, fromUnit, toUnit, oneTargetUnit) {
    // target - HTML element where to replace units of measurement
    // fromUnit - String that will be replaced: kilometers to miles etc.
    // toUnit - String to replace to the fromUnit place: miles instead of kilometers
    // oneTargetUnit - Number equal to 1 unit of target unit of measurement: 1km = 0.62m
    if (target.textContent.indexOf(fromUnit) !== -1) {
      return '' + (parseFloat(target.textContent) * oneTargetUnit).toFixed(1) + toUnit;
    }
    return '' + (parseFloat(target.textContent) / oneTargetUnit).toFixed(1) + fromUnit;
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
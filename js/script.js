const init = (function() {

  const dataBox = document.getElementById('data');
  const icon = document.querySelector('.weather-icon');
  const weather = document.querySelector('.weather-type');
  const minTemp = document.querySelector('.weather-box__temp-min');
  const maxTemp = document.querySelector('.weather-box__temp-max');
  const location = document.querySelector('.location');
  const humidity = document.querySelector('.weather-box__data__humidity');
  const pressure = document.querySelector('.weather-box__data__pressure');
  const windDegree = document.querySelector('.weather-box__data__wind-degree');
  const windSpeed = document.querySelector('.weather-box__data__wind-speed');
  const btn = document.querySelector('input');
  let pos, url;
  let degree = 'C'; // Celsius by default

  btn.addEventListener('click', function() {
    degree === 'C' ? degree = 'F' : degree = 'C';
    minTemp.textContent = convert(degree, minTemp.textContent);
    maxTemp.textContent = convert(degree, maxTemp.textContent);
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      url = `https://fcc-weather-api.glitch.me/api/current?lat=${pos.lat}&lon=${pos.lng}`;
      sendRequest();
    }, showError);
  } else {
    // Browser doesn't support Geolocation
    dataBox.innerHTML = "Geolocation is not supported by this browser.";
  }

  function setBackground() {
    const imgPath = `${checkWeather()}-${checkDayTime()}.jpeg`;
    document.querySelector('.bg-image').style.cssText = `background-image: url(img/${imgPath}); opacity: 1`;
  }

  function checkDayTime() {
    const time = new Date();
    if (time.getHours() > 5 && time.getHours() < 21) {
      return 'day';
    }
    return 'night';
  }

  function checkWeather() {
    return weather.textContent.toLowerCase();
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        dataBox.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        dataBox.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        dataBox.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        dataBox.innerHTML = "An unknown error occurred."
        break;
    }
  }

  function sendRequest() {
    axios.get(url)
    .then(updateDOM)
    .catch(handleErrors)
  }

  function updateDOM(res) {
    //console.log(res.data);
    icon.src = res.data.weather[0].icon;
    weather.textContent = res.data.weather[0].main;
    minTemp.innerHTML = `${formatTemp(res.data.main.temp_min)}`;
    maxTemp.innerHTML = `${formatTemp(res.data.main.temp_max)}`;
    location.textContent = res.data.name;
    humidity.textContent = `${res.data.main.humidity}%`;
    pressure.textContent = `${res.data.main.pressure}mb↑`;
    windDegree.textContent = getCardinalDirection(res.data.wind.deg);
    windSpeed.textContent = `${res.data.wind.speed.toFixed(1)} m/s`;
    setBackground();

  }

  function formatTemp(temp) {
    if (temp === 0) {
      return `${temp.toString()}˚`;
    } else if (temp > 0) {
      return `+${temp.toString()}˚`;
    }
    return `-${temp.toString()}˚`;
  }

  function convert(degree, temp) {
    if (degree == "F") {
      return formatTemp(Math.round(parseInt(temp) * 9 / 5 + 32));
    }
    return formatTemp(Math.round((parseInt(temp) - 32) * 5 / 9));
  }

  function getCardinalDirection(angle) {
    if (typeof angle === 'string') angle = parseInt(angle);
    if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈';
    const arrows = { north: '↑ N', north_east: '↗ NE', east: '→ E', south_east: '↘ SE', south: '↓ S', south_west: '↙ SW', west: '← W', north_west: '↖ NW' };
    const directions = Object.keys(arrows);
    const degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (let i = 0; i < directions.length; i++) {
      if (angle >= (i * degree) && angle < (i + 1) * degree) return arrows[directions[i]];
    }
    return arrows['north'];
  }

  function handleErrors(err) {
    if (err.response) {
      dataBox.innerHTML = `Problem with response ${err.response.status}`;
    } else if (err.request) {
      dataBox.innerHTML = 'Problem with request';
    } else {
      dataBox.innerHTML = `Error ${err.message}`;
    }
  }

})();

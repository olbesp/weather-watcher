const init = (function() {

  const dataBox = document.getElementById('data');
  const icon = document.querySelector('.weather-icon');
  const minTemp = document.querySelector('.temp__min');
  const maxTemp = document.querySelector('.temp__max');
  const location = document.querySelector('.location');
  const humidity = document.querySelector('.humidity');
  const pressure = document.querySelector('.pressure');
  const windDegree = document.querySelector('.wind__degree');
  const windSpeed = document.querySelector('.wind__speed');
  let pos;
  let url;
  let degree = 'C'; // Celsius by default

  document.querySelector('.btn').addEventListener('click', function() {
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
      console.log(url);
      console.log(position);
    }, showError);
  } else {
    // Browser doesn't support Geolocation
    dataBox.innerHTML = "Geolocation is not supported by this browser.";
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
    console.log(res.data);
    icon.src = res.data.weather[0].icon;
    minTemp.append(res.data.main.temp_min);
    maxTemp.append(res.data.main.temp_max);
    location.textContent = res.data.name;
    humidity.textContent += res.data.main.humidity;
    pressure.textContent += res.data.main.pressure;
    windDegree.textContent = getCardinalDirection(res.data.wind.deg);
    windSpeed.textContent = `${res.data.wind.speed.toFixed(1)} m/s`;
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
    const arrows = { north: '↑ N', north_east: '↗ NE', east: '→ E', south_east: '↘ SE', south: '↓ S', south_west: '↙ SW', west: '← W', north_west: '↖ NW' };
    const directions = Object.keys(arrows);
    const degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (let i = 0; i < directions.length; i++) {
      if (angle >= (i * degree) && angle < (i + 1) * degree) return arrows[directions[i]];
    }
    return arrows['north'];
  }
  // function appendComment(comment) {
  //   var newP = document.createElement('p');
  //   newP.innerText = comment.email;
  //   section.appendChild(newP);
  // }

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

// AIzaSyCNnMnCBQZ9HexzA0gigneirn4rWf-FeXU

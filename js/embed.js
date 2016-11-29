const API_KEY = 'c2ba51a46b63bc7a8265595ccb96ebd6'

function renderWx(wxWidget, target) {
  let container = document.createElement('div');
  container.className = 'wx-container';

  let header = document.createElement('h1');
  header.className = 'wx-title';
  header.innerText = wxWidget.title;

  let body = document.createElement('div');
  body.className = 'wx-container-body';

  let unitsString = '°C';
  if (wxWidget.units === 'imperial') {
    unitsString = '°F';
  }

  let curr = document.createElement('div');
  curr.className = 'wx-temp-curr';
  curr.innerText = `Current: ${wxWidget.curr}${unitsString}`;

  let min = document.createElement('div');
  min.className = 'wx-temp-min';
  min.innerText = `Min: ${wxWidget.min}${unitsString}`;

  let max = document.createElement('div');
  max.className = 'wx-temp-max';
  max.innerText = `Max: ${wxWidget.max}${unitsString}`;

  body.appendChild(curr);
  body.appendChild(min);
  body.appendChild(max);

  if (wxWidget.wind) {
    let wind = document.createElement('div');
    wind.className = 'wx-wind';
    wind.innerText = `Wind: ${wxWidget.wind.windDir} | ${wxWidget.wind.windStr}`;
    body.appendChild(wind);
  }

  container.appendChild(header);
  container.appendChild(body);

  target.innerHTML = '';
  target.appendChild(container);
}

function renderWxError(err, target) {
  let container = document.createElement('div');
  container.className = 'wx-container';

  let errorHeading = document.createElement('div');
  errorHeading.innerText = 'Unable to retrieve weather due to error';

  let error = document.createElement('div');
  error.className = 'wx-error';

  error.innerText = err.toString();

  container.appendChild(errorHeading);
  container.appendChild(error);

  target.innerHTML = '';
  target.appendChild(container);
}

function embedWeatherWidget(title, units, showWind, selector) {
  let wx = new Wx({
    apikey: API_KEY,
    units: units,
    geolocation: navigator.geolocation,
  });

  let target = document.getElementById(selector);

  target.innerText = 'Loading...'

  wx.getForLocation()
    .then((weather) => {
      let wxWidget = {
        title: title,
        units: units,
        curr: weather.main.temp,
        min: weather.main.temp_min,
        max: weather.main.temp_max,
      };

      if (showWind) {
        wxWidget.wind = {
          windDir: weather.wind.deg,
          windStr: weather.wind.speed,
        }
      }

      renderWx(wxWidget, target);
    })
    .catch((err) => {
      renderWxError(err, target);
    });
}
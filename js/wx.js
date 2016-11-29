function Wx(opts) {
  let options = opts || {};

  if (!options.apikey) {
    throw new Error('Invalid API Key');
  }

  if (['metric', 'imperial'].indexOf(options.units) < 0) {
    options.units = 'metric';
  }

  if (!options.geolocation) {
    options.geolocation = navigator.geolocation;
  }

  this.options = options;
}

Wx.prototype.getForCoordinates = function getWxForCoordinates(lat, lon) {
  return getJson(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${this.options.units}&appid=${this.options.apikey}`);
}

Wx.prototype.getForLocation = function getWxForLocation() {
  return new Promise((resolve, reject) => {
    let success = (pos) => {
      this.getForCoordinates(pos.coords.latitude, pos.coords.longitude)
        .then((weather) => resolve(weather))
        .catch((err) => reject(err));
    }

    let error = (err) => reject(err);

    let options = {
      enableHighAccuracy: false,
      timeout: 5000,
    };

    this.options.geolocation.getCurrentPosition(success, error, options);
  });
}

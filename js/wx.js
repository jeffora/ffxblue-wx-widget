const API_KEY = 'c2ba51a46b63bc7a8265595ccb96ebd6'

function getWxForCoordinates(lat, lon) {
  return getJson(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
}

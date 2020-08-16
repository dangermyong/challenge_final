const weather = document.querySelector(".js-weather")

const API_KEY = 'dbb5c7b8baed741b83a96dff300591eb'
const COORDS = 'coords'

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
  .then(function(res) {
    return res.json()
  })
  .then(function(json) {
    console.log(json)
    const temperature = json.main.temp.toFixed(1)
    const place = json.name
    weather.innerHTML = `${temperature}℃ @ ${place}`
  })
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
  const latitude = (position.coords.latitude)
  const longitude = (position.coords.longitude)
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  }
  saveCoords(coordsObj)
  getWeather(latitude, longitude)
}

function handleGeoError() {
  console.log('Cant acces geo location')
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS)
  if(loadedCoords === null) {
    askForCoords()
  } else {
    const parsedCoords = JSON.parse(loadedCoords)
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
  }
}

function init() {
  loadCoords()
}

init ()
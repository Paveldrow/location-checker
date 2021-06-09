window.onload = getMyLocation;

let watchId = null;

function watchLocation() {
  watchId = navigator.geolocation.watchPosition(displayLocation, displayError, options);
  console.log(11);
}

function clearWatchLocation() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    console.log(22);

  }
}

var options = {
  enableHighAccuracy: true,
  timeout: 100,
  maximumAge: 5000,
};

const displayError = function (error) {
  const errorTypes = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
  };
  console.log(errorTypes[error.code]);

  options.timeout += 100;
  console.log(options.timeout);
  console.log('MORE');
  navigator.geolocation.getCurrentPosition(displayLocation, displayError, options);
};


function getMyLocation() {
  // navigator.geolocation.getCurrentPosition(displayLocation, displayError, options);
  const watchButton = document.querySelector('.button-watch');
  watchButton.onclick = watchLocation;
  const clearWatchButton = document.querySelector('.button-clear-watch');
  clearWatchButton.onclick = clearWatchLocation;
}

function scrollMapsToPosition(coords) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  const latlong = new google.maps.LatLng(latitude, longitude);
  map.panTo(latlong);
  addMarker(map, latlong);
}

function computeDistance(startCoords, destCoords) {
  var startLatRads = degreesToRadians(startCoords.latitude);
  var startLongRads = degreesToRadians(startCoords.longitude);
  var destLatRads = degreesToRadians(destCoords.latitude);
  var destLongRads = degreesToRadians(destCoords.longitude);

  var Radius = 6371;
  var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
  return distance;
}

function degreesToRadians(degrees) {
  var radians = (degrees * Math.PI) / 180;
  return radians;
}

const ourCoords = {
  latitude: 16.378633,
  longitude: 101.307680,
}

function displayLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;


  const km = computeDistance(position.coords, ourCoords)
  console.log(latitude, longitude);

  if (map == null) {
    initMap(position.coords);
  } else {
    scrollMapsToPosition(position.coords)
  }
}

let map;

function initMap(coords) {

  const googleLatLong = new google.maps.LatLng(coords.latitude, coords.longitude);

  const mapDiv = document.querySelector('.map-container');

  const mapOptions = {
    center: googleLatLong,
    zoom: 15,
  };

  map = new google.maps.Map(mapDiv, mapOptions);

  const title = 'prise';
  const content = 'this place';
  addMarker(map, googleLatLong, markerImage)
};


function addMarker(map, latlong, icon) {

  const markerImage = './marker.png';

  const markerOptions = {
    position: latlong,
    map: map,
    clickable: true,
    icon: markerImage,
  }

  const marker = new google.maps.Marker(markerOptions);
};






// let map;

// function showMap(coords) {
//   const googleLatAndLong = new google.map.LatLng(coords.latitude, coords.longitude);


//   const mapOptions = {
//     zoom: 10,
//     center: googleLatAndLong,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//   };

//   const mapDiv = document.querySelector('.map');

//   map = new google.maps.Map(mapDiv, mapOptions);
// };


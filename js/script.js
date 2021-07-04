window.onload = getMyLocation;

let watchId = null;

function watchLocation() {
  watchId = navigator.geolocation.watchPosition(displayLocation, displayError, options);
}

function clearWatchLocation() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  };
};

const options = {
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
  const startLatRads = degreesToRadians(startCoords.latitude);
  const startLongRads = degreesToRadians(startCoords.longitude);
  const destLatRads = degreesToRadians(destCoords.latitude);
  const destLongRads = degreesToRadians(destCoords.longitude);

  const Radius = 6371;
  const distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
  return distance;
}

function degreesToRadians(degrees) {
  const radians = (degrees * Math.PI) / 180;
  return radians;
}

let prevCoords = null;

function displayLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(latitude, longitude);

  if (map == null) {
    initMap(position.coords);
    prevCoords = position.coords;
  } else {
    scrollMapsToPosition(position.coords);
    const meters = computeDistance(position.coords, prevCoords) * 1000;
    if (meters > 5) {
      scrollMapsToPosition(position.coords);
      prevCoords = position.coords;
    }
  };
};

let map;

function initMap(coords) {
  const googleLatLong = new google.maps.LatLng(coords.latitude, coords.longitude);
  const mapDiv = document.querySelector('.map-container');

  const mapOptions = {
    center: googleLatLong,
    zoom: 15,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  };

  map = new google.maps.Map(mapDiv, mapOptions);
};


function addMarker(map, latlong, icon) {

  const markerImage = './marker.png';

  const markerOptions = {
    position: latlong,
    map: map,
    clickable: true,
    icon: markerImage,
  };

  const marker = new google.maps.Marker(markerOptions);
};
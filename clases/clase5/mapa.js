// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 4
const MAP_CENTER = [-33.4444, -70.6535]

// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

// Agregar marcador (Marker) con información emergente (PopUp) de ejemplo
L.marker(MAP_CENTER).addTo(map)
  .bindPopup('Esto es la Región Metropolitana.')

// Se agrega data al Mapa
// d3.json('./mapa.geojson')
//   .then((geojson) => {
//     L.geoJSON(geojson).addTo(map)
//   })
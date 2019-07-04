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

function MostrarDato(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties) {
    let dato_a_mostrar = `<p>
      <h5>Región: ${feature.properties.Region}</h5><br/>
      <span><b>Mortalidad 2008</b>: ${feature.properties.mortalidad_2008}</span><br/>
      <span><b>Mortalidad 2009</b>: ${feature.properties.mortalidad_2009}</span><br/>
    </p>`
    layer.bindPopup(dato_a_mostrar);
  }
}

// Se agrega data al Mapa
d3.json('./mapa.json')
  .then((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: MostrarDato
    }).addTo(map)
  })
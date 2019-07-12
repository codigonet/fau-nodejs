// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 4
const MAP_CENTER = [-33.4444, -70.6535]
const MAP_CIRCLE = [-35.4444, -70.6535]
const MAP_RADIUS = 5

// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

// Agregar marcador (Marker) con información emergente (PopUp) de ejemplo
L.marker(MAP_CENTER).addTo(map)
  .bindPopup('Esto es la Región Metropolitana.')

// Agregar circulo marcador (CircleMarker) con información emergente (PopUp) de ejemplo
L.circleMarker(MAP_CIRCLE, { radius: MAP_RADIUS }).addTo(map)
  .bindPopup('Esto es un dato de círculo.')

// Se establece una constante como referencia para mostrar "Información Adicional"
const mas_info = document.getElementById("mas_info")

function MostrarDato(feature, layer) {
  // Se valida si el objeto tiene la propiedad "properties"
  if (feature.properties) {
    let dato_a_mostrar = `<p>
      <h5>Región: ${feature.properties.Region}</h5><br/>
      <span><b>Mortalidad 2008</b>: ${feature.properties.mortalidad_2008}</span><br/>
    </p>`
    layer.bindPopup(dato_a_mostrar);
    layer.on({
      click: (event)=>{
        // Se obtienen los datos desde las propiedades del JSON
        let region = event.target.feature.properties.Region
        let mortalidad_2008 = event.target.feature.properties.mortalidad_2008
        let mortalidad_2009 = event.target.feature.properties.mortalidad_2009

        // Se establece el tipo de "badge", de acuerdo a la condición de mortalidad entre un año y otro
        let tipo_badge_2008 = (mortalidad_2008 > mortalidad_2009) ? 'badge-danger' : 'badge-primary'
        let tipo_badge_2009 = (mortalidad_2008 < mortalidad_2009) ? 'badge-danger' : 'badge-primary'

        // Se genera el HTML para representar la acción de Click sobre un marcador
        let html_mortalidad = `
          <div class="alert alert-primary" role="alert">
            <p>
              Mortalidad para la región: ${region} <br/>
              Mortalidad 2008: <span class="badge badge-pill ${tipo_badge_2008}">${mortalidad_2008}</span> <br/>
              Mortalidad 2009: <span class="badge badge-pill ${tipo_badge_2009}">${mortalidad_2009}</span>
            </p>
          </div>
        `
        // Se "escribe" el HTML en la página
        mas_info.innerHTML = html_mortalidad
      }
    })
  }
}



// Se agrega data al Mapa
d3.json('./mapa.json')
  .then((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: MostrarDato,
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng).bindPopup(`Mortalidad 2008: ${geoJsonPoint.mortalidad_2008}`)
      },
      style: function (geoJsonPoint) {
        let color = (geoJsonPoint.mortalidad_2008 > 20) ? 'red' : 'green'
        return { fillColor: color}
      }
    }).addTo(map)
  })
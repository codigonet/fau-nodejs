module.exports = { 
  // Se define un método local, para leer contenido Web
  leerExcel: function (ARCHIVO, HOJA, callback) {
    const readXlsxFile = require('read-excel-file/node')

    // TODO: Leer JSON Regiones
    // const center_regions = 

    readXlsxFile(ARCHIVO, { sheet: HOJA })
    .then((data) => {
      console.log(data)
      let datos_extraidos = data.slice(5,20).map((item)=>{
        let coordenada_x = -69.657523966675882
        let coordenada_y = -18.490253944816949
        // TODO: asignar coordenadas
        // coordenada_x = center_regions.regiones_centroides.properties.X
        // coordenada_y = center_regions.regiones_centroides.properties.Y
        return { 
          "type": "Feature", 
          "properties": { 
            "Region": item[0].replace(/\*/g, ''),
            "mortalidad_2008": item[13],
            "mortalidad_2009": item[15],
          }, 
          "geometry": { 
            "type": "Point", 
            "coordinates": [coordenada_x, coordenada_y] 
          } 
        }
      })

      let geojson = {
        "type": "FeatureCollection",
        "features": datos_extraidos
      }

      callback(null, geojson)
    })
    .catch((error) => {
      console.log("Se produjo un error al leer el archivo: " + ARCHIVO, error)
      callback(error)
    })
  },

  // Se define un método local, para escribir CSV
  escribirJSON: function (data){
    const fs = require('fs');

    fs.writeFile('mapa.json', JSON.stringify(data), 'utf8', function(){
      console.log('Archivo json creado correctamente.')
    })
  }
}
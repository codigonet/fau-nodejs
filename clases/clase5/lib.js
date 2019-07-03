module.exports = { 
  // Se define un método local, para leer contenido Web
  leerExcel: function (ARCHIVO, HOJA, callback) {
    const readXlsxFile = require('read-excel-file/node')

    readXlsxFile(ARCHIVO, { sheet: HOJA })
    .then((data) => {
      // console.log(data)
      let datos_extraidos = data.slice(5,20).map((item)=>{
        return { 
          "type": "Feature", 
          "properties": { 
            "Region": item[0].replace(/\*/g, ''),
            "mortalidad_2008": item[13],
            "mortalidad_2009": item[15],
          }, 
          "geometry": { 
            "type": "Point", 
            "coordinates": [-69.657523966675882, -18.490253944816949] 
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

    fs.writeFile('mapa.geojson', JSON.stringify(data), 'utf8', function(){
      console.log('Archivo json creado correctamente.')
    })
  }
}
// Se establece el archivo a leer
const ARCHIVO_EXCEL = '03 Estadísticas Accidentes Laborales.xlsx'
// Se establece la hoja de datos
const HOJA_DATOS = 'Según region ocurrencia'

// Se instancia la librería principal
const lib = require('./lib')

// Se instancia el primer método de la librería 
// para leer contenido desde URL
lib.leerExcel(ARCHIVO_EXCEL, HOJA_DATOS, function(error, datos){
  // Se evalúa posible error
  if(error){
    // En caso de error se presenta mensaje
    console.log("Error al leer WebPage", error)
  }else{
    // Mostrar Datos
    console.log("Datos:", datos)


    // Se instancia otro método de la librería
    // para generar un GEOJSON con la información procesada
    lib.escribirJSON(datos)
  }
})

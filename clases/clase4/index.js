// Se establece URL fuente de información a procesar
const URL = 'https://www.24horas.cl/copaamerica2019/'

// Se instancia la librería principal
const lib = require('./lib')

// Se instancia el primer método de la librería 
// para leer contenido desde URL
const webpage = lib.leerWebPage(URL, function(error, textos){
  // Se evalúa posible error
  if(error){
    // En caso de error se presenta mensaje
    console.log("Error al leer WebPage", error)
  }else{
    // Mostrar textos
    console.log("Textos:", textos)

    // Se instancia un método de la librería 
    // y su resultado se asigna a una constante
    const menciones = lib.contarMenciones(textos)

    // Se muestra el contenido de la constante
    console.log("Contador: ", menciones)

    // Se instancia otro método de la librería
    // para generar un CSV con el valor 
    // de la constante anterior
    lib.escribirCSV(menciones)
  }
})

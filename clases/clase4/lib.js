module.exports = { 
  // Se define una variable local de tipo Arreglo / Colección de JSON
  jugadores: [
    {name: 'Sánchez', mentions: 0}, 
    {name: 'Vidal', mentions: 0}, 
    {name: 'Medel', mentions: 0}, 
    {name: 'Maripán', mentions: 0}, 
    {name: 'Pulgar', mentions: 0}, 
    {name: 'Fuenzalida', mentions: 0}, 
    {name: 'Arias', mentions: 0}
  ], 
  
  // Se define un método local, para leer contenido Web
  leerWebPage: function (url, callback) {
    let request = require('request')
    let cheerio = require('cheerio')

    request(url, function (err, resp, html) {
      if (!err) {
        // Se define instancia a Cheerio
        const $ = cheerio.load(html)
        
        // Obtener bloque de "noticias" de la página
        let noticias = $('body section')[5]
        // noticias.childNodes.forEach( function(item, index){
        //   console.log("Noticia: ", index, item)
        // })

        // Obtener artículos de las noticias
        let articulos = $(noticias).find('figure')
        let textos = []
        articulos.map( function(index, articulo){
          let texto = $($(articulo.childNodes).find('p')[0]).text()
          // console.log(texto)
          textos.push(texto)
        })

        // Se retorna contenido de artículos
        callback(null, textos)
      } else {
        console.log("Se produjo un error al leer la URL: " + url, err)
        callback(err)
      }
    })

  },
  
  contarMenciones: function (textos) {
    // Se muestra el contenido de la variable local
    // console.log("Jugadores considerados", this.jugadores)

    // Recorrer los valores del arreglo local
    let cantidad = this.jugadores.map( (jugador)=>{
      textos.forEach(elemento => {
        if (elemento.indexOf(jugador.name) > -1) jugador.mentions++
      })

      return jugador
    })

    // Retornar / Devolver el dato procesado
    return cantidad
  },
  
  // Se define un método local, para escribir CSV
  escribirCSV: function (data){
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: 'jugadores.csv',
      header: [
        { id: 'name', title: 'Jugador' },
        { id: 'mentions', title: 'Menciones' },
      ]
    })

    csvWriter
      .writeRecords(data)
      .then(() => console.log('Archivo CSV de jugadores guardado.'))
      .catch((err) => console.log('Error al crear archivo CSV de jugadores.', err))

  },

  // Se define un método local, para escribir CSV
  escribirJSON: function (data){
    const fs = require('fs');

    fs.writeFile('mensiones.json', data, 'utf8', function(){
      console.log('Archivo json de jugadores.')
    })
  }
}
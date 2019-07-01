var request = require('request');
var cheerio = require('cheerio');
var url = "http://datos.gob.cl/";

request(url, function (err, resp, html) {
  if (!err) {
    const $ = cheerio.load(html);
    // Obtener la cantidad de etiquetas
    var etiquetas = $('div.tags').find('a');

    // Obtener la cantidad de organizaciones
    var orgs = $( $('div.stats .inner li')[1] ).find('span').text();

    console.log("Etiquetas: " + etiquetas.length);
    console.log("Organizaciones: " + orgs);
  }else{
    console.log("Se produjo un error:", err);
  }
});
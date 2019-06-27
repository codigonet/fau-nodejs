var request = require('request');
var cheerio = require('cheerio');
var url = "http://datos.gob.cl/";

request(url, function (err, resp, html) {
  if (!err) {
    const $ = cheerio.load(html);
    var etiquetas = $('div.tags').find('a');
    console.log("Etiquetas: " + etiquetas.length);
  }else{
    console.log("Se produjo un error:", err);
  }
});
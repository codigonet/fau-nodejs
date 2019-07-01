const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('salida.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('Archivo CSV leido correctamente!!!');
  });
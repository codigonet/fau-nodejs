const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'salida.csv',
  header: [
    { id: 'name', title: 'Nombre' },
    { id: 'surname', title: 'Apellido' },
    { id: 'age', title: 'Edad' },
    { id: 'gender', title: 'Genero' },
  ]
});

const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];

csvWriter
  .writeRecords(data)
  .then(() => console.log('Archivo CSV listo!!!'));
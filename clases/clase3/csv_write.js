const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter1 = createCsvWriter({
  path: 'salida.csv',
  header: [
    { id: 'name', title: 'Nombre' },
    { id: 'surname', title: 'Apellido' },
    { id: 'age', title: 'Edad' },
    { id: 'gender', title: 'Genero' },
  ]
});

const csvWriter2 = createCsvWriter({
  path: 'salida_segunda.csv',
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

csvWriter1.writeRecords(data)
  .then(() => console.log('Archivo CSV listo!!!'))
  .catch((err)=> console.log("Ocurrió un error: ", err))

csvWriter2.writeRecords(data)
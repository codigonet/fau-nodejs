const csv = require('csv-parser');
const fs = require('fs');

var uf_enero = []
var dias_enero = []

fs.createReadStream('uf2019.csv')
  .pipe(
    csv({
      separator: ';'
    })
  )
  .on('data', (dato) => {
    //console.log(dato)
    let {Dia, Ene, Feb, Mar,Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic} = dato
    //console.log("UF Enero, dia " + Dia + " :" + Ene)
    dias_enero.push(Dia)
    uf_enero.push(Ene)
  })
  .on('end', () => {
    console.log(dias_enero)
    console.log(uf_enero)
  })

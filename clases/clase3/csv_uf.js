const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('uf2019.csv')
  .pipe(
    csv({
      separator: ';'
    })
  )
  .on('data', (row) => {
    // console.log(row)
    let {Dia, Ene, Feb, Mar,Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic} = row
    console.log("UF Enero, dia " + Dia + " :" + Ene)
  })
  
var plyConfig = {
  responsive: true,
  showLink: false,
  locale: "es",
  displaylogo: false
};

var Plotly = window.Plotly || null;

window.addEventListener("load", function () {
  if(Plotly){
    console.log("Iniciando Plotly");
    showGraph();
    showMap();
  }else{
    alert("Debes incorporar la librería PlotlyJS!!!");
  }
});

function showGraph() {
  var trace1 = {
    type: "line",
    x: ["1980", "1990", "2000", "2010", "2020"],
    y: [4458003514, 5327231061, 6143493823, 6956823603, 7794798739],
    text: [
      "Población Mundial: 4458003514",
      "Población Mundial: 5327231061",
      "Población Mundial: 6143493823",
      "Población Mundial: 6956823603",
      "Población Mundial: 7794798739"
    ],
    hoverinfo: "text",
    marker: {
      color: "rgb(83, 184, 249)",
      line: {
        width: 1
      }
    }
  };

  var data = [trace1];

  var layout = {
    title: "Cada 10 Años",
    font: { size: 18 }
  };

  Plotly.newPlot("my-graph", data, layout, plyConfig);
}

function showMap() {
  Plotly.d3.csv("datos.csv", function (err, rows) {
    if (err) {
      console.log("Error en CSV", err);
      return;
    }

    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      });
    }

    var countryName = unpack(rows, "pais"),
      countryPop = unpack(rows, "poblacion"),
      cityLat = unpack(rows, "latitud"),
      cityLon = unpack(rows, "longitud"),
      citySize = [],
      hoverText = [],
      scale = 5000000;
    for (var i = 0; i < countryPop.length; i++) {
      var currentSize = countryPop[i] / scale;
      var currentText = countryName[i] + " - Población: " + (countryPop[i]/1000000) + " mill.";
      citySize.push(currentSize);
      hoverText.push(currentText);
    }

    var data = [
      {
        type: "scattergeo",
        locationmode: "country names",
        mode: "markers",
        lat: cityLat,
        lon: cityLon,
        hoverinfo: "text",
        text: hoverText,
        marker: {
          size: citySize,
          line: {
            color: "black",
            width: 1
          }
        }
      }
    ];

    var layout = {
      title: "Población 2020",
      height: 600,
      showlegend: false,
      geo: {
        scope: "south america",
        showland: true,
        landcolor: "#5eb3b3",
        countrycolor: "#fff",
        countrywidth: 1
      }
    };

    Plotly.newPlot("my-map", data, layout, plyConfig);
  });
}

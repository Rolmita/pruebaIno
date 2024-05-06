Mirar estas dos querys para sacar la info de las tablas 
https://chartio.com/learn/databases/using-information-schema-views-to-check-to-see-if-table-exists-in-sql-server/

// Muestra todas las tablas que hay en la database
SELECT
  	TABLE_NAME
FROM
  	INFORMATION_SCHEMA.TABLES

// LAS FECHAS LAS GUARDAN EN FORMATO

// Muestra 

// MIRAR INFORME DE INOELEC para ver ejemplo de informe de datos

//Para excel
https://www.youtube.com/watch?v=SKc0iquaAqk&ab_channel=CodeX
https://www.youtube.com/watch?v=7TSf-brYsqw&ab_channel=EduardoArias

//Para pdf
con node
https://www.youtube.com/watch?v=_TEikWd9GW0&ab_channel=FaztCode
https://www.youtube.com/watch?v=WOGs7qI-iNo&ab_channel=Iv%C3%A1nMorales

con react
https://www.youtube.com/watch?v=aIvj9Qv43Ek&ab_channel=EmersonSmithHuallpaZanabria
https://www.youtube.com/watch?v=KSujnzpRNq0&ab_channel=angeloDev

// CREAD UN DASHBOARD EN GRAFANA (MIRAR PASOS PARA INTERFAZ)


// MIRAR LO DE LOCALSTORAGE A VER SI PUEDO GUARDAR EL ESTADO DE LOS DASHBOARD CREADOS


// USESESSION PARA ACCEDER AL USER DESDE 'USE CLIENT'
HAY QUE PONER SESSION PROVIDER EN EL LAYOUT PRINCIPAL PARA QUE SE PUEDA ACCEDER DESDE CUALQUIER PAG.

force dinamic (mirar en nxprisma-crud-simple1) en pg articulos para recargar la pag automaticamente


// EJEMPLO DE GRAFICO DE LINEAS (PARA VER CUANTOS DATOS GUARDAR EN EL DASHBOARD)
var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: yLabel,
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          pointBorderWidth: 8,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          fill: false,
          borderWidth: 4,
          data: data
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "none"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontFamily: "Roboto Mono",
              fontColor: "#556F7B",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#556F7B",
              fontStyle: "bold",
              fontFamily: "Roboto Mono"
            },
            gridLines: {
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }
        ]
      }
    }
  });

const chart = {
    type: 'bar',
    data: {
        labels: [{
            // TODO: MIRAR COMO SE PONEN VARIOS LABELS
        }], // eje x
        datasets: [ // eje y
            {
                yAxisID: 'voltios',
                label: 'Voltios',
                data: [],
                fill: false,
                borderColor: 'red',
                backgroundColor: 'white',
            }
        ]
    },
    options: {
        animation: false, //animacion para los datos
        plugins: {
            title: { // titulo del grafico
                display: true,
                text: '',
            },
            legend: { // para mostrar la leyenda de los datos
                display: true,
                position: 'top',
            },
            tooltip: { // para mostrar los datos
                enabled: true,
            }
        },
        aspectRatio: 1, // para radiales
        scales: {
            // Se admiten varios ejes X e Y., Una función incorporada de omisión automática de etiquetas detecta posibles marcas y etiquetas superpuestas y elimina cada enésima etiqueta para mantener las cosas mostradas normalmente.
            // Se admiten títulos de escala.
            // Los nuevos tipos de escala se pueden ampliar sin necesidad de escribir un tipo de gráfico completamente nuevo
            x: {
                axis: 'x',
                type: 'time', // (escala de tipo tiempo) Tipo de escala que se emplea. Se pueden crear y registrar escalas personalizadas con una clave de cadena. Esto permite cambiar el tipo de eje de un gráfico.
                alignToPixels: false, // alinea los valors de pixeles a los del dispositivo donde se muestran
                backgroundColor: 'white',// fondo del area de escala
                // color: 'black', // color de la letra de los ejes 
                border: { // linea de borde entre el grafico y los ejes
                    display: true, // por defecto
                    color: 'black',
                    width: 1, //por defecto
                    dash: [], // array de numeros para longitud y espaciado si queremso linea continua
                    dashOffset: 0.0, //desplazamiento de la discontinuidad
                    z: 0, //indice de la capa de borde (bajo o sobre los datos)
                },
                display: true, // false para que no se muestre y auto para que solo se muestre si hay un dataset asociado
                grid: { //malla
                    circular: false, //solo es para graficos de radar y de area polar, son lineas de malla circulares
                    color: 'black', // color de las lineas,
                    display: true, // para mostrar las lineas de malla
                    drawOnChartArea: true, // Si es verdadero, dibuje líneas en el área del gráfico dentro de las líneas del eje. Esto es útil cuando hay varios ejes y necesita controlar qué líneas de cuadrícula se dibujan.
                    drawTicks: true, // Si es verdadero, dibuje líneas al lado de las marcas en el área del eje al lado del gráfico.
                    lineWidth: 1, // anchura de la linea de la malla
                    offset: true, // si es verdadero, las líneas de la cuadrícula se desplazarán para estar entre las etiquetas. De forma predeterminada, esto se establece en verdadero para un gráfico de barras.
                    tickBorderDash: [], // longitud y espaciado de la linea discontinua de  la marca de etiqueta. el predeterminado es el valor de borderDash de la linea de cuadricula
                    tickBorderDashOffset: 1, // Desplazamiento de la línea discontinua de la marca de verificación. Si no está configurado, el valor predeterminado es el valor borderDashOffset de la línea de cuadrícula
                    tickColor: 'black',  // color de la marca de linea, por defecto sera el del color de linea
                    tickLength: 8, // longitud en pixeles de las lineas de malla dentro del area del eje 
                    tickWidth: 1, //anchura de la etiqueta de marca en pixeles, por defecto la misma que la de la linea de malla
                    z: -1, // posicion de la capa de malla. Values <= 0 are drawn under datasets, > 0 on top.
                },
                min: 0, //minimo valor de la escala (anula el valor minimo de los datos)
                max: 500, // maximo valor de la escala (anula el valor max de los datos)
                reverse: false, // invierte la escala
                stacked: false, // De forma predeterminada, los datos no se apilan. Si la stacked opción de la escala de valores (eje y en el gráfico horizontal) es true, los valores positivos y negativos se apilan por separado. Además, stackse puede definir una opción por conjunto de datos para dividirlo aún más en grupos de pila más ... Para algunos gráficos, es posible que desees apilar valores positivos y negativos. Esto se puede lograr especificando stacked: 'single'
                suggestedMax: 500,// Ajuste utilizado al calcular el valor máximo de datos.
                suggestedMin: 0, // Ajuste utilizado al calcular el valor mínimo de datos
                ticks: { // para modificar las marcas de los ejes de los ejes
                    // Multi-line labels, Filtering labels, Changing the tick color or Changing the tick alignment for the X axis, for example
                    backdropColor: 'green', //fondos de las etiquetas
                    backdropPadding: '', //fondos de las etiquetas
                    callback: function (value, index, ticks) { //funcion (siempre en callback). Parámetros:
                        // value: the tick value in the internal data format of the associated scale. For time scale, it is a timestamp.
                        // index: the tick index in the ticks array.
                        // ticks: the array containing all of the tick objects. ej: [{label: String, major: boolean, value: number}]
                        // por ejemplo, pongo el simbolo del dolar delante del valor
                        return '$' + value;
                    },
                    display: true, //true = muestra etiquetas, false= no las muestra
                    color: 'yellow', // color de las etiquetas
                    font: 'Arial', // fuente de las etiquetas
                    major: false, //Si es cierto, se generan ticks importantes. Un tick importante afectará el salto automático y el major se definirá en los ticks en el contexto de opciones de secuencias de comandos.
                    padding: 0, // desplazamiento respecto al eje
                    showLabelBackdrop: false, //true: radial scale y false si no lo es (genera un fondo tras las etiquetas de marca)
                    textStrokeColor: 'orange', //color de la linea alrededor del texto
                    textStrokeWidth: 1, //anchura de la linea alrededor del texto
                    z: 0, // Útil cuando se dibujan etiquetas en el área del gráfico. Los valores <= 0 se dibujan debajo de los conjuntos de datos, > 0 en la parte superior.
                },
                weight: 0, //El peso utilizado para ordenar el eje. Las ponderaciones más altas están más alejadas del área del gráfico

                /* SOLO PARA EJES DE TIEMPO */
                time: {
                    parser: 'YYYY-MM-DDTHH:mm:ss', // formato que se va a formatear
                    unit: 'minute', // unidades del eje
                    // stepSize: '5', // tamaño del paso de la unidad (dato cada 5 min en este caso)
                    displayFormats: { // formato en el que se muestra
                        hour: 'HH:mm',
                        minute: 'HH:mm',
                    },
                    tooltipFormat: 'minute'
                },
            },

            voltios: {
                axis: 'y',
                type: 'linear', // escala de tipo linear 
                beginAtZero: false, // si empieza el eje en 0 o en el minimo valor
                min: 0, // minimo valor representado
                max: 500, // max valor representado
                ticks: { // para modificar la leyenda de los ejes

                },
                color: 'purple',
            }
        }
    }

}
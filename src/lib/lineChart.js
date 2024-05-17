// data.datasets[index] - options for this dataset only
// options.datasets.line - options for all line datasets
// options.elements.line - options for all line elements
// options.elements.point - options for all point elements
// options - options for the whole chart

const lineChart = {
    type: 'line',
    data: { //data.datasets[index]opciones para el conjunto de datos en específico
        labels: [],
        datasets: [{
                xAxisID: 'first-x-axis',
                yAxisID: 'first-y-axis',
                data: [], // object | object[] | number[] | string[]
            //clip: undefined, //number|object|false
            drawActiveElementsOnTop: true, //boolean
                indexAxis: 'x', // x o y
                label: 'nombre del conjunto',
            //order: 0, //number
            //stack: 'line', //boolean

                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderCapStyle: 'butt', //round, square
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderDash: [], //array [longitud de linea, espaciado] en px
            //borderDashOffset: 0.0,
                borderJoinStyle: 'miter', // 'round'|'bevel'|'miter'
                borderWidth: 3, //number
                fill: false,  //boolean | string 
            //tension: 0,
                showLine: true,  // If false, the line is not drawn for this dataset.
                spanGaps: undefined, // boolean || number If true, lines will be drawn between points with no or null data. If false, points with null data will create a break in the line. Can also be a number specifying the maximum gap length to span. The unit of the value depends on the scale used.

                hoverBackgroundColor: undefined, //color
                hoverBorderCapStyle: lineChart.data.datasets.borderCapStyle, //string quiero poner que sea = a borderCapStyle
                hoverBorderColor: undefined,
            //hoverBorderDash: undefined, // number[]
            //hoverBorderDashOffset: undefined, //number
            hoverBorderJoinStyle: lineChart.data.datasets.borderJoinStyle, //undefined, // 'round' | 'bevel' | 'miter'
            hoverBorderWidth: 4, //number

                pointBackgroundColor: 'rgba(0, 0, 0, 0.1)',
                pointBorderColor: 'rgba(0, 0, 0, 0.1)',
                pointBorderWidth: 1, //number
            pointHitRadius: 1, //number
                pointRadius: 3, //number
            // pointRotation: 0, //number
                pointStyle: 'circle', //'circle' 'cross' 'crossRot' 'dash' 'line' 'rect' 'rectRounded' 'rectRot' 'star' 'triangle' false

                pointHoverBackgroundColor: undefined, //color
                pointHoverBorderColor: undefined,
            pointHoverBorderWidth: 1, //number
                pointHoverRadius: 4, //number

            // cubicInterpolationMode: 'default', // || 'monotone'
            // segment: undefined, //object
            // stepped: false, //boolean || string false: No Step Interpolation (default) true: Step-before Interpolation (eq. 'before') 'before': Step-before Interpolation 'after': Step-after Interpolation 'middle': Step-middle Interpolation
        }]
    },
    options: { //para todo el gráfico
        // elements: {
        //     line: {}, //opciones para todos los elementos de linea
        //     point: { //opciones para todos los elementos de punto
        //         radius: 3,
        //         pointStyle: 'circle', //'circle','cross','crossRot','dash','line','rect','rectRounded','rectRot','star','triangle'
        //         rotation: 0, // Point rotation(in degrees)
        //         backgroundColor: Chart.defaults.backgroundColor, //Point fill color
        //         borderWidth: 1, //Point stroke width
        //         borderColor: Chart.defaults.borderColor, //Point stroke color
        //         hitRadius: 1, //Extra radius added to point radius for hit detection.
        //         hoverRadius: 4, // Point radius when hovered.
        //         hoverBorderWidth: 1, //Stroke width when hovered.
        //     }
        // }
    }

}

// data.datasets[index] - options for this dataset only
// options.datasets.line - options for all line datasets
// options.elements.line - options for all line elements
// options.elements.point - options for all point elements
// options - options for the whole chart

export const lineChart = {
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
            hoverBorderCapStyle: 'butt', //string quiero poner que sea = a borderCapStyle
            hoverBorderColor: undefined,
            //hoverBorderDash: undefined, // number[]
            //hoverBorderDashOffset: undefined, //number
            hoverBorderJoinStyle: 'miter', //undefined, // 'round' | 'bevel' | 'miter'
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

export const lineChartData = {
    //data.datasets[index]opciones para el conjunto de datos en específico
    labels: [],
    datasets: [{
        type: 'line',
        xAxisID: 'first-x-axis',
        yAxisID: 'first-y-axis',
        data: [], // object | object[] | number[] | string[]
        //clip: undefined, //number|object|false
        drawActiveElementsOnTop: true, //boolean
        indexAxis: 'x', // x o y
        label: 'nombre del conjunto',
        order: 0, //number
        //stack: 'line', //boolean
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderCapStyle: 'butt', //round, square
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderDash: [0, 0], //array [longitud de linea, espaciado] en px
        //borderDashOffset: 0.0,
        borderJoinStyle: 'miter', // 'round'|'bevel'|'miter'
        borderWidth: 3, //number
        fill: false,  //boolean | string 
        //tension: 0,
        showLine: true,  // If false, the line is not drawn for this dataset.
        spanGaps: undefined, // boolean || number If true, lines will be drawn between points with no or null data. If false, points with null data will create a break in the line. Can also be a number specifying the maximum gap length to span. The unit of the value depends on the scale used.
        hoverBackgroundColor: undefined, //color
        hoverBorderCapStyle: 'butt', //string quiero poner que sea = a borderCapStyle
        hoverBorderColor: undefined,
        //hoverBorderDash: undefined, // number[]
        //hoverBorderDashOffset: undefined, //number
        hoverBorderJoinStyle: 'miter', //undefined, // 'round' | 'bevel' | 'miter'
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
}

export const pieChartData = {
    labels: [],
    datasets: [{
        type: 'pie',
        data: [], // object | object[] | number[] | string[]
        clip: undefined, //number|object|false
        label: 'nombre del conjunto',
        backgroundColor: [
            '#f0a202', '#f18805', '#d95d39', '#202c59', '#581f18',
            '#cfffb3', '#ade25d', '#fcec52', '#3b7080', '#3a5743',
            '#a4243b', '#d8c99b', '#d8973c', ' #bd632f', '#273e47',
            '#21294A', '#4D688F', '#37a35d', '#edeff2', '#ebb93b',
            '#0e2e2b', '#254656', '#74b39c', '#38a889', '#fe8451', '#f1a93c'],
        borderAlign: 'center', //center||inner
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderDash: [0, 0], //array [longitud de linea, espaciado] en px
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter', // 'round'|'bevel'|'miter'
        borderRadius: 0,
        borderWidth: 2, //number
        circumference: undefined, //number
        hoverBackgroundColor: undefined, //color
        hoverBorderColor: undefined,
        hoverBorderDash: undefined, // number[]
        hoverBorderDashOffset: undefined, //number
        hoverBorderJoinStyle: 'miter', //undefined, // 'round' | 'bevel' | 'miter'
        hoverBorderWidth: 4, //number
        hoverOffset: 0,
        offset: 0,
        rotation: undefined,//number
        spacing: 0,
        weight: 1,
    }]
}

export const barChartData = {
    //data.datasets[index]opciones para el conjunto de datos en específico
    labels: [],
    datasets: [{
        type: 'bar',
        backgroundColor: [
            '#f0a202', '#f18805', '#d95d39', '#202c59', '#581f18',
            '#cfffb3', '#ade25d', '#fcec52', '#3b7080', '#3a5743',
            '#a4243b', '#d8c99b', '#d8973c', ' #bd632f', '#273e47',
            '#21294A', '#4D688F', '#37a35d', '#edeff2', '#ebb93b',
            '#0e2e2b', '#254656', '#74b39c', '#38a889', '#fe8451', '#f1a93c'],
        base: undefined,
        barPercentage: 0.9,
        barThickness: undefined,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderSkipped: 'start',
        borderRadius: 0,
        borderWidth: 0, //number
        categoryPertentage: 0.8,
        clip: undefined, //number|object|false
        data: [], // object | object[] | number[] | string[]
        grouped: true,
        hoverBackgroundColor: undefined, //color
        hoverBorderColor: undefined,
        hoverBorderWidth: 1, //number
        hoverBorderRadius: 0,
        indexAxis: 'x', // x o y
        inflateAmount: 'auto',
        label: 'nombre del conjunto',
        maxBarThickness: undefined,
        minBarLength: undefined,
        order: 0, //number
        pointStyle: 'circle', //'circle' 'cross' 'crossRot' 'dash' 'line' 'rect' 'rectRounded' 'rectRot' 'star' 'triangle' false
        skipNull: true,
        stack: 'bar', //boolean
        xAxisID: 'first-x-axis',
        yAxisID: 'first-y-axis',
    }]
}

export const basicChartOptions = {
    animation: false, //animacion para los datos,
    responsive: true,
    // maintainAspectRatio: true,
    maintainAspectRatio: false,
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
    scales: {}
}

export const timeScaleOptions = {
    //all axes
    type: 'time',
    alignToPixels: false,
    backgroundColor: '#ffffff',
    border: {
        display: true,
        // color: undefined,
        width: 1,
    },
    display: true,
    grid: {
        display: true,
        color: '#808080',
        drawOnChartArea: true,
        lineWidth: 1,
        offset: false, //true para barchart
        drawTicks: true,
        tickBorderDash: [],
        // tickBorderDashOffset: undefined,
        tickColor: '#d3d3d3',
        tickLength: 8,
        tickWidth: 1,
    },
    // min: undefined,
    // suggestedMin: undefined,
    // max: undefined,
    // suggestedMax: undefined,
    reverse: false,
    stacked: false,
    ticks: {
        //all axes
        display: true,
        showLabelBackdrop: false,
        // callback: undefined,
        backdropColor: 'rgba(255, 255, 255, 0.75)',
        backdropPadding: 2,
        color: '#000000',
        padding: 3,
        major: { enabled: false },
        textStrokeColor: "",
        textStrokeWidth: 0,
        z: 0,
        //all cartesian
        align: 'center',	//The tick alignment along the axis. Can be 'start', 'center', 'end', or 'inner'. inner alignment means align start for first tick and end for the last tick of horizontal axis
        crossAlign: 'near',	//The tick alignment perpendicular to the axis. Can be 'near', 'center', or 'far'. See Tick Alignment
        // sampleSize: ticks.length,  //The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
        autoSkip: true,	//If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to maxRotation before skipping any. Turn autoSkip off to show all labels no matter what.
        autoSkipPadding: 3,//Padding between the ticks on the horizontal axis when autoSkip is enabled.
        includeBounds: true,//Should the defined min and max values be presented as ticks even if they are not "nice".
        labelOffset: 0,//Distance in pixels to offset the label from the centre point of the tick (in the x-direction for the x-axis, and the y-direction for the y-axis). Note: this can cause labels at the edges to be cropped by the edge of the canvas
        maxRotation: 50,	//Maximum rotation for tick labels when rotating to condense labels. Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.
        minRotation: 0,//Minimum rotation for tick labels. Note: Only applicable to horizontal scales.
        mirror: false,	//Flips tick labels around axis, displaying the labels inside the chart instead of outside. Note: Only applicable to vertical scales.
        padding: 0,//Padding between the tick label and the axis. When set on a vertical axis, this applies in the horizontal (X) direction. When set on a horizontal axis, this applies in the vertical (Y) direction.
        maxTicksLimit: 11,	//Maximum number of ticks and gridlines to show
        stepSize: 5,
        //time axis
        source: 'auto',
    },
    weight: 0,

    //all cartesian
    // axis: undefined,
    bounds: 'data', //ticks por defecto en demas
    clip: true,
    offset: false, //true para barchart
    // position: undefined,
    //stack,
    //stackWeight
    title: {
        display: true,
        text: '',
        align: 'center',
    },

    //time axis
    offsetAfterAutoskip: false,
    //TODO: DA FALLO AL CAMBIAR POR EJEMPLO LA UNIDAD
    time: {
        // parser: 'yyyy-MM-dd\'T\'HH:mm:ss',
        parser: "yyyy-MM-dd'T'HH:mm:ss:SSS'Z'",
        unit: 'minute',
        // minUnit: undefined,
        isoWeekday: true,
        round: false,
        displayFormats: {
            second: 'HH:mm:ss',
            minute: 'HH:mm',
            hour: 'HH',
            day: 'dd',
            week: '',
            month: 'MM',
            quarter: 'MMM yyyy',
            year: 'yyyy',
        },
        tooltipFormat: 'dd-MM-yyyy HH:mm',
        // stepSize: 5,
    },
    // time: {
    //     parser: 'YYYY-MM-DDTHH:mm:ss',
    //     unit: 'minute',
    //     displayFormats: {
    //         // hour: 'HH:mm',
    //         minute: 'HH:mm',
    //         // stepSize: 5, // Establecer el tamaño del paso a 5 minutos
    //     },
    //     // minUnit: 'minute', // Especifica la unidad mínima de tiempo que se debe usar
    //     // autoSkip: true, // Permite el salto automático de las marcas de tiempo si hay muchas de ellas
    //     tooltipFormat: 'dd-MM-yyyy HH:mm',
    // },
}

export const linearScaleOptions = {
    type: 'linear',
    alignToPixels: false,
    backgroundColor: '#ffffff',
    border: {
        display: true,
        // color: undefined,
        width: 1,
    },
    display: true,
    grid: {
        display: true,
        color: '#808080',
        drawOnChartArea: true,
        lineWidth: 1,
        offset: false, //true para barchart
        drawTicks: true,
        tickBorderDash: [],
        // tickBorderDashOffset: undefined,
        tickColor: '#d3d3d3',
        tickLength: 8,
        tickWidth: 1,
    },
    // min: undefined,
    // suggestedMin: undefined,
    // max: undefined,
    // suggestedMax: undefined,
    reverse: false,
    stacked: false,
    ticks: {
        //all axes
        display: true,
        showLabelBackdrop: false,
        // callback: undefined,
        backdropColor: 'rgba(255, 255, 255, 0.75)',
        backdropPadding: 2,
        color: '#000000',
        padding: 3,
        major: { enabled: false },
        textStrokeColor: "",
        textStrokeWidth: 0,
        z: 0,
        //all cartesian
        align: 'center',	//The tick alignment along the axis. Can be 'start', 'center', 'end', or 'inner'. inner alignment means align start for first tick and end for the last tick of horizontal axis
        crossAlign: 'near',	//The tick alignment perpendicular to the axis. Can be 'near', 'center', or 'far'. See Tick Alignment
        // sampleSize: ticks.length,  //The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
        autoSkip: true,	//If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to maxRotation before skipping any. Turn autoSkip off to show all labels no matter what.
        autoSkipPadding: 3,//Padding between the ticks on the horizontal axis when autoSkip is enabled.
        includeBounds: true,//Should the defined min and max values be presented as ticks even if they are not "nice".
        labelOffset: 0,//Distance in pixels to offset the label from the centre point of the tick (in the x-direction for the x-axis, and the y-direction for the y-axis). Note: this can cause labels at the edges to be cropped by the edge of the canvas
        maxRotation: 50,	//Maximum rotation for tick labels when rotating to condense labels. Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.
        minRotation: 0,//Minimum rotation for tick labels. Note: Only applicable to horizontal scales.
        mirror: false,	//Flips tick labels around axis, displaying the labels inside the chart instead of outside. Note: Only applicable to vertical scales.
        padding: 0,//Padding between the tick label and the axis. When set on a vertical axis, this applies in the horizontal (X) direction. When set on a horizontal axis, this applies in the vertical (Y) direction.
        maxTicksLimit: 11,	//Maximum number of ticks and gridlines to show
        //linear axis
        // count: undefined,
        format: {},
        // precision: undefined, //if defined and stepSize is not specified, the step size will be rounded to this many decimal places.
        // stepSize: undefined,
    },
    weight: 0,
    // axis: undefined,
    bounds: 'ticks', //ticks por defecto en demas
    clip: true,
    offset: false, //true para barchart
    // position: undefined,
    //stack,
    //stackWeight
    title: {
        display: true,
        text: '',
        align: 'center',
    },
    //linear axis
    beginAtZero: true,
    // grace: undefined, //number, string with %
}

export const categoryScaleOptions = {
    type: undefined,
    alignToPixels: false,
    backgroundColor: '#ffffff',
    labels: [],
    border: {
        display: true,
        color: undefined,
        width: 1,
    },
    display: true,
    grid: {
        display: true,
        color: '#808080',
        drawOnChartArea: true,
        lineWidth: 1,
        offset: false, //true para barchart
        drawTicks: true,
        tickBorderDash: [],
        tickBorderDashOffset: undefined,
        tickColor: '#d3d3d3',
        tickLength: 8,
        tickWidth: 1,
    },
    // labels:[],
    min: '',
    suggestedMin: undefined,
    max: '',
    suggestedMax: undefined,
    reverse: false,
    stacked: false,
    ticks: {
        //all axes
        display: true,
        showLabelBackdrop: false,
        callback: undefined,
        backdropColor: 'rgba(255, 255, 255, 0.75)',
        backdropPadding: 2,
        color: '#000000',
        padding: 3,
        major: { enabled: false },
        textStrokeColor: "",
        textStrokeWidth: 0,
        z: 0,
        //all cartesian
        align: 'center',	//The tick alignment along the axis. Can be 'start', 'center', 'end', or 'inner'. inner alignment means align start for first tick and end for the last tick of horizontal axis
        crossAlign: 'near',	//The tick alignment perpendicular to the axis. Can be 'near', 'center', or 'far'. See Tick Alignment
        // sampleSize: ticks.length,  //The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
        autoSkip: true,	//If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to maxRotation before skipping any. Turn autoSkip off to show all labels no matter what.
        autoSkipPadding: 3,//Padding between the ticks on the horizontal axis when autoSkip is enabled.
        includeBounds: true,//Should the defined min and max values be presented as ticks even if they are not "nice".
        labelOffset: 0,//Distance in pixels to offset the label from the centre point of the tick (in the x-direction for the x-axis, and the y-direction for the y-axis). Note: this can cause labels at the edges to be cropped by the edge of the canvas
        maxRotation: 50,	//Maximum rotation for tick labels when rotating to condense labels. Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.
        minRotation: 0,//Minimum rotation for tick labels. Note: Only applicable to horizontal scales.
        mirror: false,	//Flips tick labels around axis, displaying the labels inside the chart instead of outside. Note: Only applicable to vertical scales.
        padding: 0,//Padding between the tick label and the axis. When set on a vertical axis, this applies in the horizontal (X) direction. When set on a horizontal axis, this applies in the vertical (Y) direction.
        maxTicksLimit: 11,	//Maximum number of ticks and gridlines to show
    },
    weight: 0,
    axis: undefined,
    bounds: 'ticks', //ticks por defecto en demas
    clip: true,
    offset: false, //true para barchart
    position: undefined,
    //stack,
    //stackWeight
    title: {
        display: true,
        text: '',
        align: 'center',
    },
}

export const logarithmicScaleoptions = {
    type: undefined,
    alignToPixels: false,
    backgroundColor: '#ffffff',
    border: {
        display: true,
        color: undefined,
        width: 1,
    },
    display: true,
    grid: {
        display: true,
        color: '#808080',
        drawOnChartArea: true,
        lineWidth: 1,
        offset: false, //true para barchart
        drawTicks: true,
        tickBorderDash: [],
        tickBorderDashOffset: undefined,
        tickColor: '#d3d3d3',
        tickLength: 8,
        tickWidth: 1,
    },
    min: undefined,
    suggestedMin: undefined,
    max: undefined,
    suggestedMax: undefined,
    reverse: false,
    stacked: false,
    ticks: {
        //all axes
        display: true,
        showLabelBackdrop: false,
        callback: undefined,
        backdropColor: 'rgba(255, 255, 255, 0.75)',
        backdropPadding: 2,
        color: '#000000',
        padding: 3,
        major: { enabled: false },
        textStrokeColor: "",
        textStrokeWidth: 0,
        z: 0,
        //all cartesian
        align: 'center',	//The tick alignment along the axis. Can be 'start', 'center', 'end', or 'inner'. inner alignment means align start for first tick and end for the last tick of horizontal axis
        crossAlign: 'near',	//The tick alignment perpendicular to the axis. Can be 'near', 'center', or 'far'. See Tick Alignment
        // sampleSize: ticks.length,  //The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
        autoSkip: true,	//If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to maxRotation before skipping any. Turn autoSkip off to show all labels no matter what.
        autoSkipPadding: 3,//Padding between the ticks on the horizontal axis when autoSkip is enabled.
        includeBounds: true,//Should the defined min and max values be presented as ticks even if they are not "nice".
        labelOffset: 0,//Distance in pixels to offset the label from the centre point of the tick (in the x-direction for the x-axis, and the y-direction for the y-axis). Note: this can cause labels at the edges to be cropped by the edge of the canvas
        maxRotation: 50,	//Maximum rotation for tick labels when rotating to condense labels. Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.
        minRotation: 0,//Minimum rotation for tick labels. Note: Only applicable to horizontal scales.
        mirror: false,	//Flips tick labels around axis, displaying the labels inside the chart instead of outside. Note: Only applicable to vertical scales.
        padding: 0,//Padding between the tick label and the axis. When set on a vertical axis, this applies in the horizontal (X) direction. When set on a horizontal axis, this applies in the vertical (Y) direction.
        maxTicksLimit: 11,	//Maximum number of ticks and gridlines to show
        //logarithmic axis
        // format: undefined,
    },
    weight: 0,
    axis: undefined,
    bounds: 'ticks', //ticks por defecto en demas
    clip: true,
    offset: false, //true para barchart
    position: undefined,
    //stack,
    //stackWeight
    title: {
        display: true,
        text: '',
        align: 'center',
    },
}

//TODO: SIMPLIFICAR LAS OPCIONES ANTERIORES CREANDO UN OBJETO COMÚN AL QUE LUEGO AÑADO LAS CARACTERÍSTICAS NECESARIAS DE CADA UNA
//TODO: averiguar forma de pasar el callback(también marcado con todo en el form EN UN COMENTARIO VERDE
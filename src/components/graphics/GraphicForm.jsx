import { useState, useEffect } from 'react'
import { Chart as ChartJS, registerables as registerablesChartJS } from 'chart.js';
import LineDataset from './LineDatasets';
import PieDoughnutDatasets from './PieDatasets';
import BarDataset from './BarDatasets';
import ScalesForm from './ScalesForm';
import { lineChartData, pieChartData, barChartData, basicChartOptions } from '@/lib/lineChart';

//TODO: añadir funcion en el eje de datos para mostrar dependiendo del valor, ej:
// color: function(context) {
//     const index = context.dataIndex;
//     const value = context.dataset.data[index];
//     return value < 0 ? 'red' :  // draw negative values in red
//         index % 2 ? 'blue' :    // else, alternate values in blue and green
//         'green';
// },


// TODO: NO LOGRO HACER QUE SE MUESTRE SI SELECCIONO MAX, MIN Y AVG EN LABELS DISTINTOS

export default function GraphicForm({ data, status, onFinalData, onFinalOptions, onChartType }) {
    const [options, setOptions] = useState({})
    const [chartDataset, setChartDataset] = useState({})
    const [datasets, setDatasets] = useState([])
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState('line');
    const [datasetTypes, setDatasetTypes] = useState(['line'])
    const [chartOptions, setChartOptions] = useState(null)

    const processedXAxisIds = new Set();
    const processedYAxisIds = new Set();


    useEffect(() => {
        console.log(data);
        if (data) {
            const labels = [];
            const datasets = [];

            data.forEach(row => {
                Object.entries(row).forEach(([key, value]) => {
                    //TODO: SI SON VALORES DE MIN, MAX, MEDIA Y SUMA TODOS VAN EN EL MISMO DATASET (HACER ESTA TARDE)
                    // if (key.includes('MAX') || key.includes('MIN') || key.includes('AVG') || key.includes('SUM')) {
                    //     datasets.push(({
                    //         // label: key,
                    //         label: 'voltios',
                    //         data: [value]
                    //     }))
                    // }
                    if (value instanceof Date) {
                        labels.push(value);
                    } else {
                        const existingDatasetIndex = datasets.findIndex(dataset => dataset.label === key);
                        if (existingDatasetIndex !== -1) {
                            datasets[existingDatasetIndex].data.push(value);
                            // labels.push(datasets[existingDatasetIndex].label)
                        } else {
                            datasets.push({
                                // label: key,
                                label: 'voltios',
                                data: [value]
                            });
                            // labels.push(key)
                        }

                    }
                });
            });
            if (labels.length == 0) datasets.forEach(dataset => labels.push(dataset.key))
            const newChartData = {
                labels: labels,
                datasets: datasets
            };

            setChartData(newChartData);
            console.log('DATOS DEL GRAFICO: ', newChartData);
        }
    }, [data]);

    const min5 = (value) => {
        const minutes = String(new Date(value).getMinutes()).padStart(2, '0')
        const hours = String(new Date(value).getHours()).padStart(2, '0')
        if (minutes % 5 === 0)
            return `${hours}:${minutes}`;
    }

    useEffect(() => {
        console.log(datasetTypes);
        if (chartData && status === 'new') {
            let baseObject
            let type
            let newType = chartType;
            const construction = chartData.datasets.map((dataset, index) => {
                console.log(datasetTypes[index])
                const currentType = datasetTypes[index] ? datasetTypes[index] : chartType
                switch (currentType) {
                    case 'line':
                        baseObject = lineChartData.datasets[0]
                        type = 'line'
                        break
                    case 'pie':
                        baseObject = pieChartData.datasets[0]
                        type = 'pie'
                        break
                    case 'doughnut':
                        baseObject = pieChartData.datasets[0]
                        baseObject[type] = 'doughnut'
                        type = 'doughnut'
                        break
                    case 'bar':
                        baseObject = barChartData.datasets[0]
                        type = 'bar'
                        break
                    default:
                        return null
                }
                return { ...baseObject, type: type, label: dataset.label, data: dataset.data }
            });

            setChartOptions(basicChartOptions)
            setChartData({ ...chartData, datasets: construction })
            onChartType(newType)
        }
    }, [datasetTypes, status])

    useEffect(() => {
        console.log('HA CAMBIADO', chartData);
        onFinalData(chartData)
        onFinalOptions(chartOptions)
    }, [chartData, chartOptions])

    const modifyDataset = (index, updatedDataset) => {
        setChartData(() => {
            const newDatasets = [...chartData.datasets];
            newDatasets[index] = updatedDataset;
            return { ...chartData, datasets: newDatasets };
        });
    };
    const updateChartScaleOpt = (opt, axisId) => {
        setChartOptions({ ...chartOptions, scales: { ...chartOptions.scales, [axisId]: opt } })
    }
    const updateChartOpt = (key, value) => {
        let updatedProp
        if (key.includes('-')) {
            let arr = []
            arr = key.split('-') //axis.hola.saludo = 8
            console.log(arr);
            let prop1 = arr[0]
            let prop2 = arr[1]
            let prop3 = arr[2]
            switch (arr.length) {
                case 2:
                    console.log(arr[0], arr[1]);
                    // console.log([arr[0]], axisIdScale.arr[0], [arr[1]], finalValue);
                    updatedProp = {
                        ...chartOptions, [prop1]: { ...chartOptions[prop1], [prop2]: value }
                    }
                    break
                case 3:
                    console.log(arr[0], arr[1], arr[2]);
                    updatedProp = {
                        ...chartOptions, [prop1]: { ...chartOptions[prop1], [prop2]: { ...chartOptions[prop1][prop2], [prop3]: value } }
                    }
                    break
            }
        } else {
            updatedProp = { ...chartOptions, [key]: value }

        }
        setChartOptions(updatedProp)
    }

    useEffect(() => {
        if (chartData != null && chartData.datasets != null) {
            const newDatasets = chartData.datasets.map((dataset) => ({
                ...dataset,
                type: chartType,
            }));
            setDatasetTypes(newDatasets.map(() => chartType)); // Opcional, si es necesario
            setChartData({ ...chartData, datasets: newDatasets });
        }
    }, [chartType])

    return (
        <form className="graphic-form">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ overflowY: 'scroll', scrollBehavior: 'auto', height: '200px', width: '50%' }}>
                    <div>
                        <fieldset>
                            <legend>Title </legend>
                            <label htmlFor="plugins-title-text">
                                Title of the graphic</label>
                            <input type='plugins-title-text' placeholder="Type a title for the chart" onChange={(e) => updateChartOpt('plugins-title-text', e.target.value)} />
                        </fieldset>
                        <fieldset>
                            <legend>Type: </legend>
                            <label htmlFor="type">
                                Type of graphic:</label>
                            <select name='type' onChange={(e) => setChartType(e.target.value)}>
                                <option value='undefined'>--Select a graphic type--</option>
                                <option value='line'>Line</option>
                                <option value='pie'>Pie</option>
                                <option value='doughnut'>Doughnut</option>
                                <option value='bar'>Bar</option>
                            </select>

                        </fieldset>
                        <fieldset>
                            <legend>Legend: </legend>
                            <div>
                                {/* TODO: AÑADIR QUE SI SELECCIONAS TRUE SE MUESTRE EL DIV DE LA POSICION. ENABLE=TRUE */}
                                <input type='checkbox' name='plugins-legend-display' value='true' defaultChecked
                                    onChange={(e) => updateChartOpt('plugins-legend-display', e.target.value)}></input>
                                <label htmlFor="legend-display">Enable legend</label>
                            </div>
                            <div>
                                <label htmlFor="plugins-legend-position">
                                    Position: </label>
                                <select name='plugins-legend-position' onChange={(e) => updateChartOpt('plugins-legend-position', e.target.value)}>
                                    <option value='null'>--Select the legend position--</option>
                                    <option value='none'>None</option>
                                    <option value='top'>Top</option>
                                    <option value='right'>Right</option>
                                    <option value='left'>Left</option>
                                    <option value='down'>Down</option>
                                </select>

                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Point information: </legend>
                            <div>
                                <input type='checkbox' name='plugins-tooltip-enabled' value='true' defaultChecked></input>
                                <label htmlFor="plugins-tooltip-enabled">Enable point information when hover</label>
                            </div>
                            <div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Datasets and options: </legend>
                            {chartData && chartData.datasets.map((dataset, index) => (
                                <fieldset key={index}>
                                    <legend>
                                        <div>{dataset?.label}</div>
                                    </legend>
                                    {(chartType == 'line' || datasetTypes[index] == 'line') &&
                                        < LineDataset dataset={dataset} index={index} onTypeChange={(type, index) => {
                                            const newDatasetTypes = [...datasetTypes]
                                            newDatasetTypes[index] = type
                                            setDatasetTypes(newDatasetTypes)
                                            // setChartType(undefined)
                                        }}
                                            onDatasetChange={(updatedDataset) => modifyDataset(index, updatedDataset)} />}
                                    {(chartType == 'pie' || chartType == 'doughnut' || datasetTypes[index] == 'pie' || datasetTypes[index] == 'doughnut') &&
                                        <PieDoughnutDatasets dataset={dataset} index={index} onTypeChange={(type, index) => {
                                            const newDatasetTypes = [...datasetTypes]
                                            newDatasetTypes[index] = type
                                            setDatasetTypes(newDatasetTypes)
                                            // setChartType(undefined)
                                        }}
                                            onDatasetChange={(updatedDataset) => modifyDataset(index, updatedDataset)} />}
                                    {(chartType == 'bar' || datasetTypes[index] == 'bar') &&
                                        < BarDataset dataset={dataset} index={index} onTypeChange={(type, index) => {
                                            const newDatasetTypes = [...datasetTypes]
                                            newDatasetTypes[index] = type
                                            setDatasetTypes(newDatasetTypes)
                                            // setChartType(undefined)
                                        }}
                                            onDatasetChange={(updatedDataset) => modifyDataset(index, updatedDataset)} />}
                                </fieldset>
                            ))}
                            {/* <button type='button'>Add Dataset</button> */}
                        </fieldset>
                    </div>
                </div>
                <div style={{ overflowY: 'scroll', scrollBehavior: 'auto', height: '200px', width: '50%' }}>
                    <fieldset>
                        <legend>Axis Settings </legend>
                        {chartData && chartData.datasets.map((dataset, index) => {
                            // if (dataset.type) {
                            const { type, xAxisID, yAxisID } = dataset
                            // } else {
                            //     const { xAxisID, yAxisID } = dataset
                            // };
                            let showXAxisForm = false;
                            let showYAxisForm = false;

                            if (dataset.type && (dataset.type === 'line' || dataset.type === 'bar')) {
                                if (xAxisID && !processedXAxisIds.has(xAxisID)) {
                                    processedXAxisIds.add(xAxisID);
                                    showXAxisForm = true;
                                }
                                if (yAxisID && !processedYAxisIds.has(yAxisID)) {
                                    processedYAxisIds.add(yAxisID);
                                    showYAxisForm = true;
                                }
                            }

                            return (
                                <div key={index}>
                                    {showXAxisForm && (
                                        <ScalesForm axisId={xAxisID} axis='x' datasetType={dataset.type} chartLabels={chartData.labels} onOptionsChange={(opt) => updateChartScaleOpt(opt, xAxisID)} />
                                    )}
                                    {showYAxisForm && (
                                        <ScalesForm axisId={yAxisID} axis='y' datasetType={dataset.type} chartLabels={chartData.labels} onOptionsChange={(opt) => updateChartScaleOpt(opt, yAxisID)} />
                                    )}
                                    {/* {!showXAxisForm && !showYAxisForm && (
                                        <p>No hay configuraciones de escala para este tipo de gráfico</p>
                                    )} */}
                                </div>
                            );
                        })}
                    </fieldset>
                </div >
            </div >
        </form >
    )
}
import { useState, useEffect } from 'react'
import { Chart as ChartJS, registerables as registerablesChartJS } from 'chart.js';
import LineDataset from './LineDatasets';
import PieDoughnutDatasets from './PieDatasets';
import BarDataset from './BarDatasets';
import { lineChartData, pieChartData, barChartData } from '@/lib/lineChart';

//TODO: añadir funcion en el eje de datos para mostrar dependiendo del valor, ej:
// color: function(context) {
//     const index = context.dataIndex;
//     const value = context.dataset.data[index];
//     return value < 0 ? 'red' :  // draw negative values in red
//         index % 2 ? 'blue' :    // else, alternate values in blue and green
//         'green';
// },


//TODO: AÑADIR LAS OPCIONES COMUNES(PLUGINS) Y LAS DEL GRAFICO DE LINEA Y DE BARRAS

export default function GraphicForm({ data, status, onFinalData, onChartType }) {
    const [titlePadding, setTitlePadding] = useState(4)
    const [borderWidth, setBorderWidth] = useState(1)
    const [options, setOptions] = useState({})
    const [chartDataset, setChartDataset] = useState({})
    const [datasets, setDatasets] = useState([])
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState('line');
    const [datasetTypes, setDatasetTypes] = useState(['line'])

    useEffect(() => {
        console.log(data);
        if (data) {
            const labels = [];
            const datasets = [];

            data.forEach(row => {
                Object.entries(row).forEach(([key, value]) => {
                    if (value instanceof Date) {
                        labels.push(value);
                    } else {
                        const existingDatasetIndex = datasets.findIndex(dataset => dataset.label === key);
                        if (existingDatasetIndex !== -1) {
                            datasets[existingDatasetIndex].data.push(value);
                        } else {
                            datasets.push({
                                label: key,
                                data: [value]
                            });
                        }
                    }
                });
            });

            const newChartData = {
                labels: labels,
                datasets: datasets
            };

            setChartData(newChartData);
            console.log('DATOS DEL GRAFICO: ', newChartData);
        }
    }, [data]);

    const handleTitlePaddingChange = (value) => {
        setTitlePadding(value)
    }

    const handleBorderWidthChange = (value) => {
        setBorderWidth(value)
    }

    const handleDashDisplay = (value) => {
        const dashElement = document.getElementById('dashOpt')
        if (value == 'yes') {
            dashElement.style.display = 'flex'
            dashElement.style.flexDirection = 'column'
        } else {
            dashElement.style.display = 'none'
        }
    }

    const min5 = (value) => {
        const minutes = String(new Date(value).getMinutes()).padStart(2, '0')
        const hours = String(new Date(value).getHours()).padStart(2, '0')
        if (minutes % 5 === 0)
            return `${hours}:${minutes}`;
    }

    const handleSelectedOpt = (value) => {
        if (value == 'week') {
            const weekElement = document.getElementById('weekday')
            weekElement.style.display = 'flex'
        }
    }

    const toggleDropdown = (divId, imgId) => {
        const element = document.getElementById(divId);
        element.style.display === 'none' ? element.style.display = 'block' : element.style.display = 'none'
        const img = document.getElementById(imgId)
        img.style.transform == 'rotate(180deg)' ? img.style.transform = 'rotate(0deg)' : img.style.transform = 'rotate(180deg)'
    };

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
                        return null;
                }
                return { ...baseObject, type: type, label: dataset.label, data: dataset.data }
            });

            setChartData({ ...chartData, datasets: construction })
            onChartType(newType)
        }
    }, [chartType, datasetTypes, status])

    useEffect(() => {
        console.log('HA CAMBIADO', chartData);
        onFinalData(chartData)
    }, [chartData])

    const modifyDataset = (index, updatedDataset) => {
        setChartData(() => {
            const newDatasets = [...chartData.datasets];
            newDatasets[index] = updatedDataset;
            return { ...chartData, datasets: newDatasets };
        });
    };

    return (
        <form className="graphic-form">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ overflowY: 'scroll', scrollBehavior: 'auto', height: '200px', width: '50%' }}>
                    <div>
                        <fieldset>
                            <legend>Title </legend>
                            <label htmlFor="type">
                                Title of the graphic</label>
                            <input type='text' placeholder="Type a title for the chart" />
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
                                <input type='checkbox' name='legend-display' value='true' defaultChecked></input>
                                <label htmlFor="legend-display">Enable legend</label>
                            </div>
                            <div>
                                <label htmlFor="legend-position">
                                    Position: </label>
                                <select name='legend-position'>
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
                                <input type='checkbox' name='tooltip-enabled' value='true' defaultChecked></input>
                                <label htmlFor="tooltip-enabled">Enable point information when hover</label>
                            </div>
                            <div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Datasets and options: </legend>
                            {chartData && chartData.datasets.map((dataset, index) => (
                                <fieldset key={index}>
                                    <legend>
                                        <div>{dataset.label}</div>
                                    </legend>
                                    {(chartType == 'line' || datasetTypes[index] == 'line') &&
                                        < LineDataset dataset={dataset} index={index} onTypeChange={(type, index) => {
                                            const newDatasetTypes = [...datasetTypes]
                                            newDatasetTypes[index] = type
                                            setDatasetTypes(newDatasetTypes)
                                            setChartType(undefined)
                                        }}
                                            onDatasetChange={(updatedDataset) => modifyDataset(index, updatedDataset)} />}
                                    {(chartType == 'pie' || chartType == 'doughnut' || datasetTypes[index] == 'pie' || datasetTypes[index] == 'doughnut') &&
                                        <PieDoughnutDatasets dataset={dataset} index={index} onTypeChange={(type, index) => {
                                            const newDatasetTypes = [...datasetTypes]
                                            newDatasetTypes[index] = type
                                            setDatasetTypes(newDatasetTypes)
                                            setChartType(undefined)
                                        }}
                                            onDatasetChange={(updatedDataset) => modifyDataset(index, updatedDataset)} />}
                                    {(chartType == 'bar' || datasetTypes[index] == 'bar') &&
                                        < BarDataset dataset={dataset} index={index} onTypeChange={(type, index) => {
                                            const newDatasetTypes = [...datasetTypes]
                                            newDatasetTypes[index] = type
                                            setDatasetTypes(newDatasetTypes)
                                            setChartType(undefined)
                                        }}
                                            onDatasetChange={(updatedDataset) => modifyDataset(index, updatedDataset)} />}
                                </fieldset>
                            ))}
                            <button type='button'>Add Dataset</button>
                        </fieldset>
                    </div>
                </div>
                <div style={{ overflowY: 'scroll', scrollBehavior: 'auto', height: '200px', width: '50%' }}>
                    <fieldset>
                        <legend>X Axis Settings </legend>
                        <fieldset>
                            <legend>Nombre de la escala
                                <label htmlFor="display-scale" style={{ marginLeft: '20px' }}>
                                    Show scale:</label>
                                <select name='display-scale'>
                                    <option value='auto' title='When a dataset is asociated'>Auto</option>
                                    <option value='true' title='Allways'>True</option>
                                    <option value='false' title='Never'>False</option>
                                </select>
                            </legend>
                            <input type='hidden' name='x-axis' value='x'></input>
                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Axis type</h4>
                                </div>
                                <div className='graphic-form-group-opt' style={{ padding: '5px' }}>
                                    <label htmlFor="x-axis-type">
                                        Type: </label>
                                    <select name='x-axis-type'>
                                        <option value='null'>--Select an axis type--</option>
                                        <option value='time' title='For uniform time intervals'>time</option>
                                        <option value='timeseries' title='For non uniform or scattered time intervals'>timeseries</option>
                                        <option value='logarithmic' title='For wide range of values with exponential variation'>logarithmic</option>
                                        <option value='linear' title='For linear progression of numerical values'>linear</option>
                                        <option value='category' title='For categorical or label data (non numerical)'>category</option>
                                        <option value='radialLinear' title='For linear radial graphics'>radial linear</option>
                                        <option value='radialLogarithmic' title='For  logarithmic radial graphics'>radial logarithmic</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Axis title</h4>
                                    <button type='button' onClick={() => toggleDropdown('title-dropdown', 'down-img-1')}>
                                        <img id='down-img-1' className='down-img' src='/down.svg' width='10px' /></button>
                                </div>
                                <div id='title-dropdown' style={{ display: 'none', padding: '5px' }}>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-title-text">
                                            Title: </label>
                                        <input name='axis-title-text' type='text' placeholder='Type a title for the scale'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-title-display" title='¿Must be shown the title of the scale?'>
                                            Display: </label>
                                        <input name='axis-title-display' value='true' type='radio' title='Title must be shown'></input>
                                        <label htmlFor="true">True</label>
                                        <input name='axis-title-display' value='false' type='radio' title="Title mustn't be shown" defaultChecked></input>
                                        <label htmlFor="false">False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-title-align" title='Alignment of the axis title.'>
                                            Align:</label>
                                        <select name='axis-title-align'>
                                            <option value='start' >Start</option>
                                            <option value='center' >Center</option>
                                            <option value='end' >End</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-title-color">
                                            Color: </label>
                                        <input name='axis-title-color' type='color' defaultValue='#000000'></input>
                                    </div>
                                    <div className='graphic-form-group-opt' style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="axis-title-padding">Padding: </label>
                                        <input type='range' name='axis-title-padding' defaultValue={titlePadding} min='0' max='10' list='title-padding-markers'
                                            onChange={(e) => handleTitlePaddingChange(e.target.value)}></input>
                                        <datalist id="title-padding-markers">
                                            <option value="0"></option>
                                            <option value="1"></option>
                                            <option value="2"></option>
                                            <option value="3"></option>
                                            <option value="4"></option>
                                            <option value="5"></option>
                                            <option value="6"></option>
                                            <option value="7"></option>
                                            <option value="8"></option>
                                            <option value="9"></option>
                                            <option value="10"></option>
                                        </datalist>
                                        <input type='text' name='range-result' disabled style={{ width: '35px' }} value={titlePadding} />
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-title-font-family'>Font family: </label>
                                        <input name='axis-title-font-family' type='text' defaultValue="'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-title-font-size'>Font size: </label>
                                        <input name='axis-title-font-size' type='number' defaultValue="12" style={{ width: '35px' }}></input><span> px</span>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-title-font-weight'>Font weight: </label>
                                        <select name='axis-title-font-weight'>
                                            <option value='undefined'>undefined</option>
                                            <option value='normal'>normal</option>
                                            <option value='lighter'>lighter</option>
                                            <option value='bold'>bold</option>
                                            <option value='bolder'>bolder</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-title-font-lineHeight'>Font size: </label>
                                        <input name='axis-title-font-lineHeight' type='number' defaultValue="1.2" step='0.1' min='0.8' max='2' style={{ width: '40px' }}></input>
                                    </div>
                                </div>
                            </div>
                            {/* TODO: SOLO PARA EJES DE TIEMPO */}
                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Time values:</h4>
                                    <button type='button' onClick={() => toggleDropdown('time-dropdown', 'down-img-2')}>
                                        <img id='down-img-2' className='down-img' src='/down.svg' width='10px' /></button>
                                </div>
                                <div id='time-dropdown' style={{ display: 'none', padding: '5px' }}>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-time-parser">
                                            Your data format: </label>
                                        <select name='axis-time-parser'>
                                            <option value='null'>--Select your data format--</option>
                                            <option value='YYYY-MM-DDTHH:mm:ss'>YYYY-MM-DDTHH:mm:ss</option>
                                            <option value='YYYY-MM-DDTHH:mm'>YYYY-MM-DDTHH:mm</option>
                                            <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                                            <option value='HH:mm:ss'>HH:mm:ss</option>
                                            <option value='HH:mm'>HH:mm</option>
                                        </select>
                                    </div>

                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-time-unit">
                                            Unit </label>
                                        <select name='axis-time-unit' onChange={(e) => handleSelectedOpt(e.target.value)}>
                                            <option value='null'>--Select your unit--</option>
                                            <option value='millisecond'>millisecond</option>
                                            <option value='second'>second</option>
                                            <option value='minute'>minute</option>
                                            <option value='hour'>hour</option>
                                            <option value='day'>day</option>
                                            <option value='week'>week</option>
                                            <option value='month'>month</option>
                                            <option value='quarter'>quarter</option>
                                            <option value='year'>year</option>
                                        </select>
                                    </div>

                                    <div id='weekday' className='graphic-form-group-opt' style={{ display: 'none' }}>
                                        <label htmlFor="axis-time-isoWeekday">
                                            Week start: </label>
                                        <select name="axis-time-isoWeekday">
                                            <option value='true'>--Select a weekday--</option>
                                            <option value='0'>Sunday</option>
                                            <option value='1'>Monday</option>
                                            <option value='2'>Tuesday</option>
                                            <option value='3'>Wednesday</option>
                                            <option value='4'>Thursday</option>
                                            <option value='5'>Friday</option>
                                            <option value='6'>Saturday</option>
                                        </select>
                                    </div>

                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-time-minUnit'>Min unit: </label>
                                        <select name='axis-time-minUnit'>
                                            <option value='millisecond'>millisecond</option>
                                            <option value='second'>second</option>
                                            <option value='minute'>minute</option>
                                            <option value='hour'>hour</option>
                                            <option value='day'>day</option>
                                            <option value='week'>week</option>
                                            <option value='month'>month</option>
                                            <option value='quarter'>quarter</option>
                                            <option value='year'>year</option>
                                        </select>
                                    </div>

                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-time-round"
                                            title='If defined, dates will be rounded to the start of this unit'>
                                            Round: </label>
                                        <select name="axis-time-round">
                                            <option value='false'>--Select a unit--</option>
                                            <option value='millisecond'>millisecond</option>
                                            <option value='second'>second</option>
                                            <option value='minute'>minute</option>
                                            <option value='hour'>hour</option>
                                            <option value='day'>day</option>
                                            <option value='week'>week</option>
                                            <option value='month'>month</option>
                                            <option value='quarter'>quarter</option>
                                            <option value='year'>year</option>
                                        </select>
                                    </div>

                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-time-display-formats">
                                            Display format for the ticks </label>
                                        <select name='axis-time-display-formats'>
                                            <option value='null'>--Select your data format--</option>
                                            <option value='YYYY-MM-DDTHH:mm:ss'>YYYY-MM-DDTHH:mm:ss</option>
                                            <option value='YYYY-MM-DDTHH:mm'>YYYY-MM-DDTHH:mm</option>
                                            <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                                            <option value='HH:mm:ss'>HH:mm:ss</option>
                                            <option value='HH:mm'>HH:mm</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor="axis-time-tooltip-format">
                                            Tooltip format: </label>
                                        <select name='axis-time-tooltip-format'>
                                            <option value='null'>--Select your data format--</option>
                                            <option value='dd-MM-yyyy HH:mm'>dd-MM-yyyy HH:mm</option>
                                            <option value='HH:mm dd-MM-yyyy'>HH:mm dd-MM-yyyy</option>
                                            <option value='dd/MM/yyyy HH:mm'>dd/MM/yyyy HH:mm</option>
                                            <option value='dd/MM/yyyy HH:mm'>HH:mm dd/MM/yyyy</option>
                                            <option value='yyyy-MM-ddTHH:mm:ss'>yyyy-MM-ddTHH:mm:ss</option>
                                            <option value='yyyy-MM-ddTHH:mm'>yyyy-MM-ddTHH:mm</option>
                                            <option value='yyyy/MM/dd'>yyyy/MM/dd</option>
                                            <option value='dd/MM/yyyy'>dd/MM/yyyy</option>
                                            <option value='dd/MM/yyyy'>dd/MM</option>
                                            <option value='yyyy-MM-dd'>yyyy-MM-dd</option>
                                            <option value='dd-MM-yyyy'>dd-MM-yyyy</option>
                                            <option value='dd-MM'>dd-MM</option>
                                            <option value='MMM D, YYYY'>MMM D, YYYY</option>
                                            <option value='HH:mm:ss'>HH:mm:ss</option>
                                            <option value='HH:mm'>HH:mm</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Data:</h4>
                                    <button type='button' onClick={() => toggleDropdown('data-dropdown', 'down-img-3')}>
                                        <img id='down-img-3' className='down-img-3' src='/down.svg' width='10px' /></button>
                                </div>
                                <div id='data-dropdown' style={{ display: 'none', padding: '5px' }}>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-min'>Min:</label>
                                        <input name='axis-min' type='datetime-local'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-minS' title="Min item if there isn't datapoint before it.">Suggested min:</label>
                                        <input name='axis-minS' type='datetime-local'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-max'>Max:</label>
                                        <input name='axis-max' type='datetime-local'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-maxS' title="Max item if there isn't datapoint behind it.">Suggested max:</label>
                                        <input name='axis-maxS' type='datetime-local'></input>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Style</h4>
                                    <button type='button' onClick={() => toggleDropdown('style-dropdown', 'down-img-4')}>
                                        <img id='down-img-4' className='down-img' src='/down.svg' width='10px' /></button>
                                </div>
                                <div id='style-dropdown' style={{ display: 'none', padding: '5px' }}>
                                    {/* //TODO: ASPECTRATIO PARA RADIALES DEFAULTVALUE=1*/}
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-position'>
                                            Position: </label>
                                        <select name='axis-position'>
                                            <option value='bottom'>Bottom</option>
                                            <option value='top'>Top</option>
                                            <option value='rigth'>Right</option>
                                            <option value='left'>Left</option>
                                            <option value='center'>Center</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-weight'
                                            title='The weight used to sort the axis. Higher weights are further away from the chart area.'>
                                            Axis sort: </label>
                                        <input type='number' name='axis-weight' defaultValue={0}></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-reverse' title='Reverse the scale.'>
                                            Reverse: </label>
                                        <input name='axis-reverse' type='radio' value='true'></input>
                                        <label htmlFor="true">True</label>
                                        <input name='axis-reverse' type='radio' value='false' defaultChecked></input>
                                        <label htmlFor="false">False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-clip' title='If true, clip the dataset drawing against the size of the scale instead of chart area.'>
                                            Clip dataset against scale size: </label>
                                        <select name='axis-clip'>
                                            <option value='true'>True</option>
                                            <option value='false'>False</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-bounds' title='Controls the scale boundary strategy (bypassed by min/max options).'>
                                            Bounds: </label>
                                        <select name='axis-bounds'>
                                            <option value='ticks' title='Makes sure ticks are fully visible, data outside are truncated.'>Ticks</option>
                                            <option value='data' title='Makes sure data are fully visible, labels outside are removed.'>Data</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-offset' title='Set if extra space must be added to the both edges and if the axis must be scaled to fit into the chart area.'>
                                            Offset: </label>
                                        <select name='axis-offset'>
                                            <option value='false'>False</option>
                                            <option value='true'>True</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-bg-color'>
                                            Background color: </label>
                                        <input name='axis-bg-color' type='color' defaultValue='#ffffff' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Border style</h4>
                                    <button type='button' onClick={() => toggleDropdown('border-style-dropdown', 'down-img-5')}>
                                        <img id='down-img-5' className='down-img' src='/down.svg' width='10px' /></button>
                                </div>
                                <div id='border-style-dropdown' style={{ display: 'none', padding: '5px' }}>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-border-display'>Border display:</label>
                                        <input type='radio' name='axis-border-display' value='true' defaultChecked></input>
                                        <label htmlFor="true">True</label>
                                        <input type='radio' name='axis-border-display' value='false'></input>
                                        <label htmlFor="false">False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-border-color'>Color: </label>
                                        <input type='color' name='axis-border-color' defaultValue='#000000'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-border-width'>Width: </label>
                                        <input type='range' name='axis-border-width' defaultValue={borderWidth} min='0' max='5' list='border-width-markers'
                                            onChange={(e) => handleBorderWidthChange(e.target.value)}></input>
                                        <datalist id="border-width-markers">
                                            <option value="0"></option>
                                            <option value="1"></option>
                                            <option value="2"></option>
                                            <option value="3"></option>
                                            <option value="4"></option>
                                            <option value="5"></option>
                                        </datalist>
                                        <input type='text' name='range-result' disabled style={{ width: '35px' }} value={borderWidth} />
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-border-border-dash'>Dash</label>
                                        <input name='axis-border-dash' type='radio' value='yes' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                                        <label htmlFor='yes'>Yes</label>
                                        <input name='axis-border-dash' type='radio' value='no' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                                        <label htmlFor='no'>No</label>
                                        <div id='dashOpt' style={{ display: 'none' }}>
                                            <div>
                                                <label htmlFor='axis-border-dash-length'>Dash line length: </label>
                                                <input name='axis-border-dash-length' type='number' min='1' max='20' defaultValue={1}></input>
                                            </div>
                                            <div>
                                                <label htmlFor='axis-border-dash-spacing'>Dash line spacing: </label>
                                                <input name='axis-border-dash-spacing' type='number' min='1' max='20' defaultValue={1}></input>
                                            </div>
                                            <div>
                                                <label htmlFor='axis-border-dash-offset'>Dash offset:</label>
                                                <input name='axis-border-dash-offset' type='number' defaultValue='0.0' step='0.1'></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-border-z'>Z layer position:</label>
                                        <input type='number' name='axis-border-z' defaultValue='0' step='1'></input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Grid style</h4>
                                    <button type='button' onClick={() => toggleDropdown('grid-style-dropdown', 'down-img-6')}>
                                        <img id='down-img-6' className='down-img' src='/down.svg' width='10px' /></button>
                                </div>
                                <div id='grid-style-dropdown' style={{ display: 'none', padding: '5px' }}>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-display'>Grid display: </label>
                                        <input type='radio' name='axis-grid-display' value='true' defaultChecked></input>
                                        <label htmlFor='true'>True</label>
                                        <input type='radio' name='axis-grid-display' value='false'></input>
                                        <label htmlFor='false'>False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        {/* TODO: LAS MALLAS CIRCULARES SON SÓLO PARA GRÁFICOS RADIALES */}
                                        <label htmlFor='axis-grid-circular'>Circular grid: </label>
                                        <input type='radio' name='axis-grid-circular' defaultChecked></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-color'>Grid color: </label>
                                        <input type='color' name='axis-grid-color' defaultValue='#808080' />
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-drawOnChartArea'
                                            title='If true, draw lines on the chart area inside the axis lines.
                                            This is useful when there are multiple axes and you need to control which grid lines are drawn.'>
                                            Draw on chart area: </label>
                                        <input type='radio' name='axis-grid-drawOnChartArea' value='true' defaultChecked></input>
                                        <label htmlFor='true'>True</label>
                                        <input type='radio' name='axis-grid-drawOnChartArea' value='false'></input>
                                        <label htmlFor='false'>False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-lineWidth'>Grid line width: </label>
                                        <input type='number' name='axis-grid-lineWidth' defaultValue='0'></input>
                                    </div>
                                    {/* TODO: ESTABLECER A TRUE GRID OFFSET PARA GRAFICO DE BARRAS */}
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-offset'
                                            title='If true, grid lines will be shifted to be between labels. This is set to true for a bar chart by default.'>
                                            Grid offset: </label>
                                        <input type='radio' name='axis-grid-offset' value='true'></input>
                                        <label htmlFor='true'>True</label>
                                        <input type='radio' name='axis-grid-offset' value='false' defaultChecked></input>
                                        <label htmlFor='false'>False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-z'>Grid layer position:</label>
                                        <input type='number' name='axis-grid-z' defaultValue='-1'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-drawTicks'
                                            title='If true, draw lines beside the ticks in the axis area beside the chart.'>
                                            Draw ticks: </label>
                                        <input type='radio' name='axis-grid-drawTicks' value='true' defaultChecked></input>
                                        <label htmlFor='true'>True</label>
                                        <input type='radio' name='axis-grid-drawTicks' value='false' ></input>
                                        <label htmlFor='false'>False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-tickBorderDash'>Dash</label>
                                        <input name='axis-grid-tickBorderDash' type='radio' value='yes' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                                        <label htmlFor='yes'>Yes</label>
                                        <input name='axis-grid-tickBorderDash' type='radio' value='no' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                                        <label htmlFor='no'>No</label>
                                        <div id='dashOpt' style={{ display: 'none' }}>
                                            <div>
                                                <label htmlFor='axis-grid-tickBorderDash-length'>Dash line length: </label>
                                                <input name='axis-grid-tickBorderDash-length' type='number' min='1' max='20' defaultValue={1}></input>
                                            </div>
                                            <div>
                                                <label htmlFor='axis-grid-tickBorderDash-spacing'>Dash line spacing: </label>
                                                <input name='axis-grid-tickBorderDash-spacing' type='number' min='1' max='20' defaultValue={1}></input>
                                            </div>
                                            <div>
                                                <label htmlFor='axis-grid-tickBorderDashOffset'>Dash offset:</label>
                                                <input name='axis-grid-tickBorderDashOffset' type='number' defaultValue='0.0' step='0.1'></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-tickColor'>Grid tick color: </label>
                                        <input type='color' name='axis-grid-tickColor' defaultValue='#d3d3d3' />
                                    </div>

                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-tickLength' title='Length in pixels that the grid lines will draw into the axis area.'>Grid tick length: </label>
                                        <input name='axis-grid-tickLength' type='number' min='1' max='20' defaultValue='8'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-grid-tickWidth' title='Width of the tick mark in pixels. If unset, defaults to the grid line width.'>Grid tick width: </label>
                                        <input name='axis-grid-tickWidth' type='number' min='1' max='20' defaultValue='1'></input>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='graphic-form-group'>
                                    <h4 style={{ marginRight: '10px' }}>Ticks</h4>
                                    <button type='button' onClick={() => toggleDropdown('axis-ticks-dropdown', 'down-img-7')}>
                                        <img id='down-img-7' className='down-img' src='/down.svg' width='10px' /></button>
                                </div>
                                <div id='axis-ticks-dropdown' style={{ display: 'none', padding: '5px' }}>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-display'>Ticks display: </label>
                                        <input type='radio' name='axis-ticks-display' value='true' defaultChecked></input>
                                        <label htmlFor='true'>True</label>
                                        <input type='radio' name='axis-ticks-display' value='false'></input>
                                        <label htmlFor='false'>False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-backdropColor'>Backdrop color:</label>
                                        <input type='color' name='axis-ticks-backdropColor' defaultValue='#ffffff'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-backdropPadding'>Backdrop padding:</label>
                                        <input name='axis-ticks-backdropPadding' type='number' min='0' max='20' defaultValue={2}></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-callback'>Modify ticks:</label>
                                        {/* TODO: NO SÉ SI ES LA FORMA CORRECTA DE PASAR UNA FUNCIÓN */}
                                        <select name='axis-ticks-callback'>
                                            <option value={'min5'}>Ticks each 5 minutes</option>
                                        </select>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-color'>Ticks color:</label>
                                        <input type='color' name='axis-ticks-color' defaultValue='#000000'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-font'>Ticks font:</label>
                                        <input type='text' name='axis-ticks-font' defaultValue={'Arial'}></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-padding'
                                            title='Padding between the tick label and the axis. 
                                        When set on a vertical axis, this applies in the horizontal (X) direction. 
                                        When set on a horizontal axis, this applies in the vertical (Y) direction.'>Ticks padding:</label>
                                        <input name='axis-ticks-padding' type='number' min='0' max='20' defaultValue={0}></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-textStrokeColor'>Text stroke color:</label>
                                        <input type='color' name='axis-ticks-textStrokeColor' defaultValue='#ffffff'></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-textStrokeWidth'>Text stroke width:</label>
                                        <input name='axis-ticks-textStrokeWidth' type='number' min='0' max='20' defaultValue={0}></input>
                                    </div>
                                    {/* TODO: EL VALOR DE SHOWLABELBACKDROP ES TRUE PARA ESCALAS RADIALES Y FALSE SI NO LO SON */}
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-showLabelBackdrop'>Ticks display: </label>
                                        <input type='radio' name='axis-ticks-showLabelBackdrop' value='true' ></input>
                                        <label htmlFor='true'>True</label>
                                        <input type='radio' name='axis-ticks-showLabelBackdrop' value='false' defaultChecked></input>
                                        <label htmlFor='false'>False</label>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-z'
                                            title='z-index of tick layer. Useful when ticks are drawn on chart area.
                                            Values <= 0 are drawn under datasets, > 0 on top.'>Ticks layer position:</label>
                                        <input name='axis-ticks-z' type='number' min='0' max='20' defaultValue={0}></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='axis-ticks-major-enabled'
                                            title='If true, major ticks are generated. 
                                        A major tick will affect autoskipping and major will be defined on ticks in the scriptable options context'>
                                            Major ticks enabled: </label>
                                        <input type='radio' name='axis-ticks-major-enabled' value='true' ></input>
                                        <label htmlFor='true'>True</label>
                                        <input type='radio' name='axis-ticks-major-enabled' value='false' defaultChecked></input>
                                        <label htmlFor='false'>False</label>
                                    </div>
                                    {/* TODO: LAS SIGUIENTES OPCIONES SOLO SON PARA EJES CARTESIANOS */}
                                    <div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-align'
                                                title="The align setting configures how labels align with the tick mark along the axis direction
                                             (i.e. horizontal for a horizontal axis and vertical for a vertical axis).
                                             Is only effective when these preconditions are met: tick rotation is 0 and axis position is 'top', 'left', 'bottom' or 'right"
                                            >
                                                Ticks align: </label>
                                            <select name='axis-ticks-align'>
                                                <option value='start'>Start</option>
                                                <option value='center'>Center</option>
                                                <option value='end'>End</option>
                                                <option value='inner'>Inner</option>
                                            </select>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-crossAlign'
                                                title='The crossAlign setting configures how labels align with the tick mark in the perpendicular direction 
                                            (i.e. vertical for a horizontal axis and horizontal for a vertical axis).'>
                                                Cross align: </label>
                                            <select name='axis-ticks-crossAlign'>
                                                <option value='near'>Near</option>
                                                <option value='center'>Center</option>
                                                <option value='far'>Far</option>
                                            </select>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-sampleSize'
                                                title='The number of ticks to examine when deciding how many labels will fit. 
                                            Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.'>
                                                Sample size: </label>
                                            <input type='number' name='axis-ticks-sampleSize' defaultValue={'ticks?.length'}></input>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-autoSkip'
                                                title='If true, automatically calculates how many labels can be shown and hides labels accordingly. 
                                                Labels will be rotated up to maxRotation before skipping any. 
                                                Turn autoSkip off to show all labels no matter what.'>
                                                Auto skip: </label>
                                            <input type='radio' name='axis-ticks-autoSkip' value='true' defaultChecked></input>
                                            <label htmlFor='true'>True</label>
                                            <input type='radio' name='axis-ticks-autoSkip' value='false' ></input>
                                            <label htmlFor='false'>False</label>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-autoSkipPadding'
                                                title='Padding between the ticks on the horizontal axis when autoSkip is enabled.'>
                                                Auto skip padding:</label>
                                            <input name='axis-ticks-autoSkipPadding' type='number' min='0' max='20' defaultValue={3}></input>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-includeBounds'
                                                title='Should the defined min and max values be presented as ticks even if they are not "nice".'>
                                                Include bounds: </label>
                                            <input type='radio' name='axis-ticks-includeBounds' value='true' defaultChecked></input>
                                            <label htmlFor='true'>True</label>
                                            <input type='radio' name='axis-ticks-includeBounds' value='false' ></input>
                                            <label htmlFor='false'>False</label>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-labelOffset'
                                                title='Distance in pixels to offset the label from the centre point of the tick 
                                                (in the x-direction for the x-axis, and the y-direction for the y-axis).'>
                                                Label offset:</label>
                                            <input name='axis-ticks-labelOffset' type='number' min='0' max='20' defaultValue={0}></input>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-maxRotation'
                                                title="Maximum rotation for tick labels when rotating to condense labels. 
                                                Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.">
                                                Max rotation:</label>
                                            <input name='axis-ticks-maxRotation' type='number' min='0' max='20' defaultValue={50}></input>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-minRotation'
                                                title="Minimum rotation for tick labels. Note: Only applicable to horizontal scales.">
                                                Min rotation:</label>
                                            <input name='axis-ticks-minRotation' type='number' min='0' max='20' defaultValue={0}></input>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-mirror'
                                                title='Flips tick labels around axis, displaying the labels inside the chart instead of outside.
                                                Note: Only applicable to vertical scales.'>
                                                Mirror: </label>
                                            <input type='radio' name='axis-ticks-mirror' value='true'></input>
                                            <label htmlFor='true'>True</label>
                                            <input type='radio' name='axis-ticks-mirror' value='false' defaultChecked></input>
                                            <label htmlFor='false'>False</label>
                                        </div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-maxTicksLimit'
                                                title="Maximum number of ticks and gridlines to show.">
                                                Max ticks limit:</label>
                                            <input name='axis-ticks-maxTicksLimit' type='number' min='0' max='20' defaultValue={11}></input>
                                        </div>
                                    </div>
                                    {/* TODO: LAS SIGUIENTES OPCIONES SON SOLO PARA EJES CARTESIANOS DE TIEMPO */}
                                    <div>
                                        <div className='graphic-form-group-opt'>
                                            <label htmlFor='axis-ticks-source'
                                                title=''>
                                                Ticks source: </label>
                                            <select name='axis-ticks-source'>
                                                <option value='auto' title='Generates "optimal" ticks based on scale size and time options'>
                                                    Auto
                                                </option>
                                                <option value='data' title='Generates ticks from data (including labels from data {x|y} objects)'>
                                                    Data</option>
                                                <option value='labels' title='Generates ticks from user given labels ONLY'>
                                                    Labels
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </fieldset>
                </div >
            </div >
        </form >
    )
}
import { useState, useEffect } from "react"
import { timeScaleOptions, linearScaleOptions, categoryScaleOptions, logarithmicScaleoptions } from "@/lib/lineChart"

//TODO: COMPROBAR EN MODIFYsETTING SI LA KEY PASADA TIENE GUIONES Y DESCOMPONERLA PARA PASARLA ADECUADAMENTE AL OBJ
//TODO: RECUPERACION DE DATOS DE AXISSCALE SEGUN EL TIPO DE ESCALA Y CAMBIO DE VALORES CUANDO ES BARCHART
export default function ScalesForm({ axisId, axis, datasetType }) {
    let axisScale = { axis: axis, display: 'auto', type: undefined }
    let isBar = false
    let offset = false
    if (datasetType == 'bar') {
        isBar = true
        offset = true
    } else {
        isBar = false
        offset = false
    }
    const [axisIdScale, setAxisIdScale] = useState(axisScale)
    const [scaleType, setScaleType] = useState(undefined)

    const toggleDropdown = (divId, imgId) => {
        const element = document.getElementById(divId);
        element.style.display === 'none' ? element.style.display = 'block' : element.style.display = 'none'
        const img = document.getElementById(imgId)
        img.style.transform == 'rotate(180deg)' ? img.style.transform = 'rotate(0deg)' : img.style.transform = 'rotate(180deg)'
    };

    const modifySetting = (key, value, type) => {
        let finalValue = value
        let updatedProp
        if (type == 'number' || type == 'range') finalValue = Number(value)
        if (key.includes('-')) {
            let arr = []
            arr = key.split('-') //axis.hola.saludo = 8
            switch (arr.length) {
                case 2:
                    updatedProp = {
                        ...axisIdScale, [arr[0]]: { ...axisIdScale.arr[0], [arr[1]]: finalValue }
                    }
                    break
                case 3:
                    updatedProp = {
                        ...axisIdScale, [arr[0]]: { ...axisIdScale.arr[0], [arr[1]]: { ...axisIdScale.arr[0].arr[1], [arr[2]]: finalValue } }
                    }
                    break
            }
        } else {
            updatedProp = { ...axisIdScale, [key]: finalValue }
        }

        // if (key == 'backgroundColor') {
        //     const colorToModify = value
        //     value = hexToRgba(colorToModify)
        // }

        setAxisIdScale(updatedProp)
        // onDatasetChange(updatedProp)
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

    useEffect(() => {
        setAxisIdScale(axisScale)
    }, [axisId])

    useEffect(() => {
        console.log('esta es la config de la escala ', axisId, ': ', axisIdScale);
    }, [axisIdScale])

    useEffect(() => {
        switch (scaleType) {
            case 'linear':
                setAxisIdScale({ ...linearScaleOptions, type: 'linear', offset: isBar, grid: { ...linearScaleOptions.grid, offset: isBar } })
                break
            case 'time':
                setAxisIdScale({ ...timeScaleOptions, type: 'time', offset: isBar, grid: { ...timeScaleOptions.grid, offset: isBar } })
                break
            case 'timeseries':
                setAxisIdScale({ ...timeScaleOptions, type: 'timeseries', offset: isBar, grid: { ...timeScaleOptions.grid, offset: isBar } })
                break
            case 'category':
                setAxisIdScale({ ...categoryScaleOptions, type: 'category', offset: isBar, grid: { ...categoryScaleOptions.grid, offset: isBar } })
                break
            case 'logarithmic':
                setAxisIdScale({ ...logarithmicScaleoptions, type: 'logarithmic', offset: isBar, grid: { ...logarithmicScaleoptions.grid, offset: isBar } })
                break
        }
    }, [scaleType])

    return (
        <fieldset>
            <legend>{axisId}
                <label htmlFor="display" style={{ marginLeft: '20px' }}>
                    Display:</label>
                <select name='display' defaultValue={axisIdScale?.display}
                    onChange={(e) => modifySetting('display', e.target.value)}>
                    <option value='auto' title='When a dataset is asociated'>Auto</option>
                    <option value='true' title='Allways'>True</option>
                    <option value='false' title='Never'>False</option>
                </select>
            </legend>
            <div>
                <div className='graphic-form-group'>
                    <h4 style={{ marginRight: '10px' }}>Axis type</h4>
                </div>
                <div className='graphic-form-group-opt' style={{ padding: '5px' }}>
                    <label htmlFor="type">
                        Type: </label>
                    <select name='type' defaultValue={axisIdScale?.type}
                        onChange={(e) => {
                            axisIdScale?.type == undefined
                                ? setScaleType(e.target.value)
                                : modifySetting('type', e.target.value)
                        }}>
                        <option value='null'>--Select an axis type--</option>
                        <option value='time' title='For uniform time intervals'>time</option>
                        <option value='timeseries' title='For non uniform or scattered time intervals'>timeseries</option>
                        <option value='logarithmic' title='For wide range of values with exponential variation'>logarithmic</option>
                        <option value='linear' title='For linear progression of numerical values'>linear</option>
                        <option value='category' title='For categorical or label data (non numerical)'>category</option>
                    </select>
                </div>
            </div>
            {axisIdScale.type &&
                (<div>
                    <div>
                        <div className='graphic-form-group'>
                            <h4 style={{ marginRight: '10px' }}>Axis title</h4>
                            <button type='button' onClick={() => toggleDropdown('title-dropdown', 'down-img-1')}>
                                <img id='down-img-1' className='down-img' src='/down.svg' width='10px' /></button>
                        </div>
                        <div id='title-dropdown' style={{ display: 'none', padding: '5px' }}>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor="title-text">
                                    Title: </label>
                                <input name='title-text' type='text' placeholder='Type a title for the scale'
                                    defaultValue={axisIdScale?.title.text}
                                    onChange={(e) => modifySetting('title-text', e.target.value, e.target.type)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor="title-display" title='¿Must be shown the title of the scale?'>
                                    Display: </label>
                                <input name='title-display' value='true' type='radio' title='Title must be shown'
                                    defaultChecked={axisIdScale?.title.display}
                                    onChange={(e) => modifySetting('title-display', e.target.value, e.target.type)}></input>
                                <label htmlFor="true">True</label>
                                <input name='title-display' value='false' type='radio' title="Title mustn't be shown"
                                    defaultChecked={axisIdScale?.title.display ? false : true}
                                    onChange={(e) => modifySetting('title-display', e.target.value, e.target.type)}></input>
                                <label htmlFor="false">False</label>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor="title-align" title='Alignment of the axis title.'>
                                    Align:</label>
                                <select name='title-align'
                                    defaultValue={axisIdScale?.title.align}
                                    onChange={(e) => modifySetting('title-align', e.target.value)}>
                                    <option value='start' >Start</option>
                                    <option value='center' >Center</option>
                                    <option value='end' >End</option>
                                </select>
                            </div>
                            {/* <div className='graphic-form-group-opt'>
                        <label htmlFor="title-color">
                            Color: </label>
                        <input name='title-color' type='color' defaultValue={axisIdScale?.title.color}
                            onChange={(e) => modifySetting('title-color', e.target.value, e.target.type)}></input>
                    </div> */}
                            {/* <div className='graphic-form-group-opt' style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="title-padding">Padding: </label>
                        <input type='range' name='title-padding' min='0' max='10' list='title-padding-markers'
                            defaultValue={axisIdScale?.title.padding}
                            onChange={(e) => modifySetting('title-padding', e.target.value, e.target.type)}></input>
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
                        <input type='text' name='range-result' disabled defaultValue={axisIdScale?.title.padding} />
                    </div> */}
                        </div>
                    </div>
                    {/* TODO: SOLO PARA EJES DE TIEMPO */}

                    {(axisIdScale.type == 'time' || axisIdScale.type == 'timeseries') &&
                        (<div>
                            <div className='graphic-form-group'>
                                <h4 style={{ marginRight: '10px' }}>Time values:</h4>
                                <button type='button' onClick={() => toggleDropdown('time-dropdown', 'down-img-2')}>
                                    <img id='down-img-2' className='down-img' src='/down.svg' width='10px' /></button>
                            </div>
                            <div id='time-dropdown' style={{ display: 'none', padding: '5px' }}>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor="time-parser">
                                        Your data format: </label>
                                    <select name='time-parser'
                                        defaultValue={axisIdScale?.time.parser}
                                        onChange={(e) => modifySetting('time-parser', e.target.value)}>
                                        <option value='undefined'>--Select your data format--</option>
                                        <option value='YYYY-MM-DDTHH:mm:ss'>YYYY-MM-DDTHH:mm:ss</option>
                                        <option value='YYYY-MM-DDTHH:mm'>YYYY-MM-DDTHH:mm</option>
                                        <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                                        <option value='HH:mm:ss'>HH:mm:ss</option>
                                        <option value='HH:mm'>HH:mm</option>
                                    </select>
                                </div>

                                <div className='graphic-form-group-opt'>
                                    <label htmlFor="time-unit">
                                        Unit </label>
                                    <select name='time-unit' defaultValue={axisIdScale?.time.unit}
                                        onChange={(e) => modifySetting('time-unit', e.target.value)}>
                                        <option value='undefined'>--Select your unit--</option>
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

                                {/* <div id='weekday' className='graphic-form-group-opt' style={{ display: 'none' }}>
                            <label htmlFor="time-isoWeekday">
                                Week start: </label>
                            <select name="time-isoWeekday" defaultValue={axisIdScale?.time.isoWeekday}
                                onChange={(e) => modifySetting('time-isoWeekday', e.target.value)}>
                                <option value='true'>--Select a weekday--</option>
                                <option value='0'>Sunday</option>
                                <option value='1'>Monday</option>
                                <option value='2'>Tuesday</option>
                                <option value='3'>Wednesday</option>
                                <option value='4'>Thursday</option>
                                <option value='5'>Friday</option>
                                <option value='6'>Saturday</option>
                            </select>
                        </div> */}

                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='time-minUnit'>Min unit: </label>
                                    <select name='time-minUnit' defaultValue={axisIdScale?.time.minUnit}
                                        onChange={(e) => modifySetting('time-minUnit', e.target.value)}>
                                        <option value='undefined'>--Select your min unit--</option>
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
                                    <label htmlFor="time-round"
                                        title='If defined, dates will be rounded to the start of this unit'>
                                        Round: </label>
                                    <select name="time-round" defaultValue={axisIdScale?.time.round}
                                        onChange={(e) => modifySetting('time-round', e.target.value)}>
                                        <option value='false'>--Select a unit to round--</option>
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

                                {/* <div className='graphic-form-group-opt'>
                            <label htmlFor="time-displayFormats">
                                Display format for the ticks </label>
                            <select name='time-displayFormats'>
                                <option value='null'>--Select your data format--</option>
                                <option value='YYYY-MM-DDTHH:mm:ss'>YYYY-MM-DDTHH:mm:ss</option>
                                <option value='YYYY-MM-DDTHH:mm'>YYYY-MM-DDTHH:mm</option>
                                <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                                <option value='HH:mm:ss'>HH:mm:ss</option>
                                <option value='HH:mm'>HH:mm</option>
                            </select>
                        </div> */}
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor="time-tooltipFormat">
                                        Tooltip format: </label>
                                    <select name='time-tooltipFormat' defaultValue={axisIdScale?.time.tooltipFormat}
                                        onChange={(e) => modifySetting('time-tooltipFormat', e.target.value)}>
                                        <option value='undefined'>--Select your data format--</option>
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
                        )}

                    <div>
                        <div className='graphic-form-group'>
                            <h4 style={{ marginRight: '10px' }}>Data:</h4>
                            <button type='button' onClick={() => toggleDropdown('data-dropdown', 'down-img-3')}>
                                <img id='down-img-3' className='down-img-3' src='/down.svg' width='10px' /></button>
                        </div>
                        <div id='data-dropdown' style={{ display: 'none', padding: '5px' }}>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='min'>Min:</label>
                                <input name='min' type='datetime-local' defaultValue={axisIdScale?.min}
                                    onChange={(e) => modifySetting('min', e.target.value)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='suggestedMin' title="Min item if there isn't datapoint before it.">Suggested min:</label>
                                <input name='suggestedMin' type='datetime-local' defaultValue={axisIdScale?.suggestedMin}
                                    onChange={(e) => modifySetting('suggestedMin', e.target.value)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='max'>Max:</label>
                                <input name='max' type='datetime-local' defaultValue={axisIdScale?.max}
                                    onChange={(e) => modifySetting('max', e.target.value)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='suggestedMax' title="Max item if there isn't datapoint behind it.">Suggested max:</label>
                                <input name='suggestedMax' type='datetime-local' defaultValue={axisIdScale?.suggestedMax}
                                    onChange={(e) => modifySetting('suggestedMax', e.target.value)}></input>
                            </div>
                            {axisIdScale?.type == 'linear' &&
                                (<div className='graphic-form-group-opt'>
                                    <label htmlFor='beginAtZero' title='Begin at zero the scale.'>
                                        Begin at zero: </label>
                                    <input name='beginAtZero' type='radio' value='true' defaultChecked={axisIdScale?.beginAtZero}
                                        onChange={(e) => modifySetting('beginAtZero', e.target.value)}></input>
                                    <label htmlFor="true">True</label>
                                    <input name='beginAtZero' type='radio' value='false'
                                        defaultChecked={axisIdScale?.beginAtZero ? false : true}
                                        onChange={(e) => modifySetting('beginAtZero', e.target.value)}></input>
                                    <label htmlFor="false">False</label>
                                </div>)
                            }
                        </div>
                    </div>
                    <div>
                        <div className='graphic-form-group'>
                            <h4 style={{ marginRight: '10px' }}>Style</h4>
                            <button type='button' onClick={() => toggleDropdown('style-dropdown', 'down-img-4')}>
                                <img id='down-img-4' className='down-img' src='/down.svg' width='10px' /></button>
                        </div>
                        <div id='style-dropdown' style={{ display: 'none', padding: '5px' }}>

                            <div className='graphic-form-group-opt'>
                                <label htmlFor='position'>
                                    Position: </label>
                                <select name='position' defaultValue={axisIdScale?.position}
                                    onChange={(e) => modifySetting('position', e.target.value)}>
                                    <option value='undefined'>-- Select the position for the scale-</option>
                                    <option value='bottom'>Bottom</option>
                                    <option value='top'>Top</option>
                                    <option value='rigth'>Right</option>
                                    <option value='left'>Left</option>
                                    <option value='center'>Center</option>
                                </select>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='weight'
                                    title='The weight used to sort the axis. Higher weights are further away from the chart area.'>
                                    Axis sort: </label>
                                <input type='number' name='weight' defaultValue={axisIdScale?.weight}
                                    onChange={(e) => modifySetting('weight', e.target.value, e.target.number)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='reverse' title='Reverse the scale.'>
                                    Reverse: </label>
                                <input name='reverse' type='radio' value='true' defaultChecked={axisIdScale?.reverse}
                                    onChange={(e) => modifySetting('reverse', e.target.value)}></input>
                                <label htmlFor="true">True</label>
                                <input name='reverse' type='radio' value='false'
                                    onChange={(e) => modifySetting('reverse', e.target.value)}
                                    defaultChecked={axisIdScale?.reverse ? false : true}></input>
                                <label htmlFor="false">False</label>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='clip' title='If true, clip the dataset drawing against the size of the scale instead of chart area.'>
                                    Clip dataset against scale size: </label>
                                <select name='clip' defaultValue={axisIdScale?.clip}
                                    onChange={(e) => modifySetting('clip', e.target.value)}>
                                    <option value='true'>True</option>
                                    <option value='false'>False</option>
                                </select>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='bounds' title='Controls the scale boundary strategy (bypassed by min/max options).'>
                                    Bounds: </label>
                                <select name='bounds' defaultValue={axisIdScale?.bounds}
                                    onChange={(e) => modifySetting('bounds', e.target.value)}>
                                    <option value='ticks' title='Makes sure ticks are fully visible, data outside are truncated.'>Ticks</option>
                                    <option value='data' title='Makes sure data are fully visible, labels outside are removed.'>Data</option>
                                </select>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='offset' title='Set if extra space must be added to the both edges and if the axis must be scaled to fit into the chart area.'>
                                    Offset: </label>
                                <select name='offset' defaultValue={axisIdScale?.offset}
                                    onChange={(e) => modifySetting('offset', e.target.value)}>
                                    <option value='false'>False</option>
                                    <option value='true'>True</option>
                                </select>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='backgroundColor'>
                                    Background color: </label>
                                <input name='backgroundColor' type='color' defaultValue={axisIdScale?.backgroundColor}
                                    onChange={(e) => modifySetting('backgroundColor', e.target.value)} />
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
                                <label htmlFor='border-display'>Border display:</label>
                                <input type='radio' name='border-display' value='true' defaultChecked={axisIdScale?.border.display}
                                    onChange={(e) => modifySetting('border-display', e.target.value)}></input>
                                <label htmlFor="true">True</label>
                                <input type='radio' name='border-display' value='false'
                                    defaultChecked={axisIdScale?.border.display ? false : true}
                                    onChange={(e) => modifySetting('border-display', e.target.value)}></input>
                                <label htmlFor="false">False</label>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='border-color'>Color: </label>
                                <input type='color' name='border-color' defaultValue={axisIdScale?.border.color}
                                    onChange={(e) => modifySetting('border-color', e.target.value)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='border-width'>Width: </label>
                                <input type='range' name='border-width' min='0' max='5' list='border-width-markers'
                                    defaultValue={axisIdScale?.border.width}
                                    onChange={(e) => modifySetting('border-width', e.target.value, e.target.type)}></input>
                                <datalist id="border-width-markers">
                                    <option value="0"></option>
                                    <option value="1"></option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                    <option value="4"></option>
                                    <option value="5"></option>
                                </datalist>
                                <input type='text' name='range-result' disabled value={axisIdScale?.border.width} />
                            </div>
                            {/* <div className='graphic-form-group-opt'>
                        <label htmlFor='border-border-dash'>Dash</label>
                        <input name='border-dash' type='radio' value='yes' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                        <label htmlFor='yes'>Yes</label>
                        <input name='border-dash' type='radio' value='no' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                        <label htmlFor='no'>No</label>
                        <div id='dashOpt' style={{ display: 'none' }}>
                            <div>
                                <label htmlFor='border-dash-length'>Dash line length: </label>
                                <input name='border-dash-length' type='number' min='1' max='20' defaultValue={1}></input>
                            </div>
                            <div>
                                <label htmlFor='border-dash-spacing'>Dash line spacing: </label>
                                <input name='border-dash-spacing' type='number' min='1' max='20' defaultValue={1}></input>
                            </div>
                            <div>
                                <label htmlFor='border-dash-offset'>Dash offset:</label>
                                <input name='border-dash-offset' type='number' defaultValue='0.0' step='0.1'></input>
                            </div>
                        </div>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='border-z'>Z layer position:</label>
                        <input type='number' name='border-z' defaultValue='0' step='1'></input>
                    </div> */}
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
                                <label htmlFor='grid-display'>Grid display: </label>
                                <input type='radio' name='grid-display' value='true'
                                    defaultChecked={axisIdScale?.grid.display}
                                    onChange={(e) => modifySetting('grid-display', e.target.value)}></input>
                                <label htmlFor='true'>True</label>
                                <input type='radio' name='grid-display' value='false'
                                    defaultChecked={axisIdScale?.grid.display ? false : true}
                                    onChange={(e) => modifySetting('grid-display', e.target.value)}></input>
                                <label htmlFor='false'>False</label>
                            </div>

                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-color'>Grid color: </label>
                                <input type='color' name='grid-color' defaultValue={axisIdScale?.grid.color}
                                    onChange={(e) => modifySetting('grid-color', e.target.value)} />
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-drawOnChartArea'
                                    title='If true, draw lines on the chart area inside the axis lines.
                                            This is useful when there are multiple axes and you need to control which grid lines are drawn.'>
                                    Draw on chart area: </label>
                                <input type='radio' name='grid-drawOnChartArea' value='true'
                                    defaultChecked={axisIdScale?.grid.drawOnChartArea}
                                    onChange={(e) => modifySetting('grid-drawOnChartArea', e.target.value)}></input>
                                <label htmlFor='true'>True</label>
                                <input type='radio' name='grid-drawOnChartArea' value='false'
                                    defaultChecked={axisIdScale?.grid.drawOnChartArea ? false : true}
                                    onChange={(e) => modifySetting('grid-drawOnChartArea', e.target.value)}></input>
                                <label htmlFor='false'>False</label>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-lineWidth'>Grid line width: </label>
                                <input type='number' name='grid-lineWidth'
                                    defaultValue={axisIdScale?.grid.lineWidth}
                                    onChange={(e) => modifySetting('grid-lineWidth', e.target.value)}></input>
                            </div>
                            {/* TODO: ESTABLECER A TRUE GRID OFFSET PARA GRAFICO DE BARRAS */}
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-offset'
                                    title='If true, grid lines will be shifted to be between labels. This is set to true for a bar chart by default.'>
                                    Grid offset: </label>
                                <input type='radio' name='grid-offset' value='true'
                                    defaultChecked={isBar}
                                    onChange={(e) => modifySetting('grid-offset', e.target.value)}></input>
                                <label htmlFor='true'>True</label>
                                <input type='radio' name='grid-offset' value='false'
                                    defaultChecked={isBar}
                                    onChange={(e) => modifySetting('grid-offset', e.target.value)}></input>
                                <label htmlFor='false'>False</label>
                            </div>
                            {/* <div className='graphic-form-group-opt'>
                        <label htmlFor='grid-z'>Grid layer position:</label>
                        <input type='number' name='grid-z' defaultValue='-1'
                        defaultValue={axisIdScale?.grid.z}
                        onChange={(e) => modifySetting('grid-z', e.target.value)}></input>
                    </div> */}
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-drawTicks'
                                    title='If true, draw lines beside the ticks in the axis area beside the chart.'>
                                    Draw ticks: </label>
                                <input type='radio' name='grid-drawTicks' value='true'
                                    defaultChecked={axisIdScale?.grid.drawTicks}
                                    onChange={(e) => modifySetting('grid-drawTicks', e.target.value)}></input>
                                <label htmlFor='true'>True</label>
                                <input type='radio' name='grid-drawTicks' value='false'
                                    defaultChecked={axisIdScale?.grid.drawTicks ? false : true}
                                    onChange={(e) => modifySetting('grid-drawTicks', e.target.value)}></input>
                                <label htmlFor='false'>False</label>
                            </div>
                            {/* TODO: AÑADIR CONTROL DE DATOS PARA ESTO */}
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-tickBorderDash'>Dash</label>
                                <input name='grid-tickBorderDash' type='radio' value='yes' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                                <label htmlFor='yes'>Yes</label>
                                <input name='grid-tickBorderDash' type='radio' value='no' onChange={(e) => handleDashDisplay(e.target.value)}></input>
                                <label htmlFor='no'>No</label>
                                <div id='dashOpt' style={{ display: 'none' }}>
                                    <div>
                                        <label htmlFor='grid-tickBorderDash-length'>Dash line length: </label>
                                        <input name='grid-tickBorderDash-length' type='number' min='1' max='20' defaultValue={1}></input>
                                    </div>
                                    <div>
                                        <label htmlFor='grid-tickBorderDash-spacing'>Dash line spacing: </label>
                                        <input name='grid-tickBorderDash-spacing' type='number' min='1' max='20' defaultValue={1}></input>
                                    </div>
                                    <div>
                                        <label htmlFor='grid-tickBorderDashOffset'>Dash offset:</label>
                                        <input name='grid-tickBorderDashOffset' type='number' defaultValue='0.0' step='0.1'></input>
                                    </div>
                                </div>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-tickColor'>Grid tick color: </label>
                                <input type='color' name='grid-tickColor'
                                    defaultValue={axisIdScale?.grid.tickColor}
                                    onChange={(e) => modifySetting('grid-tickColor', e.target.value)} />
                            </div>

                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-tickLength' title='Length in pixels that the grid lines will draw into the axis area.'>Grid tick length: </label>
                                <input name='grid-tickLength' type='number' min='1' max='20'
                                    defaultValue={axisIdScale?.grid.tickLength}
                                    onChange={(e) => modifySetting('grid-tickLength', e.target.value)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='grid-tickWidth' title='Width of the tick mark in pixels. If unset, defaults to the grid line width.'>Grid tick width: </label>
                                <input name='grid-tickWidth' type='number' min='1' max='20'
                                    defaultValue={axisIdScale?.grid.tickWidth}
                                    onChange={(e) => modifySetting('grid-tickWidth', e.target.value)}></input>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='graphic-form-group'>
                            <h4 style={{ marginRight: '10px' }}>Ticks</h4>
                            <button type='button' onClick={() => toggleDropdown('ticks-dropdown', 'down-img-7')}>
                                <img id='down-img-7' className='down-img' src='/down.svg' width='10px' /></button>
                        </div>
                        <div id='ticks-dropdown' style={{ display: 'none', padding: '5px' }}>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='ticks-display'>Ticks display: </label>
                                <input type='radio' name='ticks-display' value='true'
                                    defaultChecked={axisIdScale?.ticks.display}
                                    onChange={(e) => modifySetting('ticks-display', e.target.value)}></input>
                                <label htmlFor='true'>True</label>
                                <input type='radio' name='ticks-display' value='false'
                                    defaultChecked={axisIdScale?.ticks.display ? false : true}
                                    onChange={(e) => modifySetting('ticks-display', e.target.value)}></input>
                                <label htmlFor='false'>False</label>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='ticks-backdropColor'>Backdrop color:</label>
                                <input type='color' name='ticks-backdropColor' defaultValue={axisIdScale?.ticks.backdropColor}
                                    onChange={(e) => modifySetting('ticks-backdropColor', e.target.value)}></input>
                            </div>
                            {/* <div className='graphic-form-group-opt'>
                        <label htmlFor='ticks-backdropPadding'>Backdrop padding:</label>
                        <input name='ticks-backdropPadding' type='number' min='0' max='20' 
                        defaultValue={axisIdScale?.ticks.backdropColor}
                            onChange={(e) => modifySetting('ticks-backdropColor', e.target.value)}></input>
                    </div> */}
                            {/* TODO: callback para esto=funciones a poder ser */}
                            {/* TODO: NO SÉ SI ES LA FORMA CORRECTA DE PASAR UNA FUNCIÓN */}
                            {/* <div className='graphic-form-group-opt'>
                                <label htmlFor='ticks-callback'>Modify ticks:</label>
                            <select name='ticks-callback'>
                                <option value={min5}>Ticks each 5 minutes</option>
                            </select>
                        </div> */}
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='ticks-color'>Ticks color:</label>
                                <input type='color' name='ticks-color' defaultValue={axisIdScale?.ticks.color}
                                    onChange={(e) => modifySetting('ticks-color', e.target.value)}></input>
                            </div>
                            {/* <div className='graphic-form-group-opt'>
                        <label htmlFor='ticks-font'>Ticks font:</label>
                        <input type='text' name='ticks-font' defaultValue={axisIdScale?.ticks.font}
                            onChange={(e) => modifySetting('ticks-color', e.target.value)}></input>
                    </div> */}
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='ticks-padding'
                                    title='Padding between the tick label and the axis. 
                                        When set on a vertical axis, this applies in the horizontal (X) direction. 
                                        When set on a horizontal axis, this applies in the vertical (Y) direction.'>Ticks padding:</label>
                                <input name='ticks-padding' type='number' min='0' max='20' defaultValue={axisIdScale?.ticks.padding}
                                    onChange={(e) => modifySetting('ticks-padding', e.target.value, e.target.type)}></input>
                            </div>
                            {/* <div className='graphic-form-group-opt'>
                        <label htmlFor='ticks-textStrokeColor'>Text stroke color:</label>
                        <input type='color' name='ticks-textStrokeColor' defaultValue='#ffffff'></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='ticks-textStrokeWidth'>Text stroke width:</label>
                        <input name='ticks-textStrokeWidth' type='number' min='0' max='20' defaultValue={0}></input>
                    </div> */}
                            {/* <div className='graphic-form-group-opt'>
                        <label htmlFor='ticks-z'
                            title='z-index of tick layer. Useful when ticks are drawn on chart area.
                                            Values <= 0 are drawn under datasets, > 0 on top.'>Ticks layer position:</label>
                        <input name='ticks-z' type='number' min='0' max='20' defaultValue={0}></input>
                    </div> */}
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='ticks-major-enabled'
                                    title='If true, major ticks are generated. 
                                        A major tick will affect autoskipping and major will be defined on ticks in the scriptable options context'>
                                    Major ticks enabled: </label>
                                <input type='radio' name='ticks-major-enabled' value='true'
                                    defaultChecked={axisIdScale?.ticks.major.enabled ? false : true}
                                    onChange={(e) => modifySetting('ticks-major-enabled', e.target.value, e.target.type)}></input>
                                <label htmlFor='true'>True</label>
                                <input type='radio' name='ticks-major-enabled' value='false'
                                    defaultChecked={axisIdScale?.ticks.major.enabled ? false : true}
                                    onChange={(e) => modifySetting('ticks-major-enabled', e.target.value, e.target.type)}></input>
                                <label htmlFor='false'>False</label>
                            </div>

                            <div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-align'
                                        title="The align setting configures how labels align with the tick mark along the axis direction
                                             (i.e. horizontal for a horizontal axis and vertical for a vertical axis).
                                             Is only effective when these preconditions are met: tick rotation is 0 and axis position is 'top', 'left', 'bottom' or 'right'"
                                    >Ticks align: </label>
                                    <select name='ticks-align' defaultValue={axisIdScale?.ticks.align}
                                        onChange={(e) => modifySetting('ticks-align', e.target.value)}>
                                        <option value='start'>Start</option>
                                        <option value='center'>Center</option>
                                        <option value='end'>End</option>
                                        <option value='inner'>Inner</option>
                                    </select>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-crossAlign'
                                        title='The crossAlign setting configures how labels align with the tick mark in the perpendicular direction 
                                            (i.e. vertical for a horizontal axis and horizontal for a vertical axis).'>
                                        Cross align: </label>
                                    <select name='ticks-crossAlign' defaultValue={axisIdScale?.ticks.crossAlign}
                                        onChange={(e) => modifySetting('ticks-crossAlign', e.target.value)}>
                                        <option value='near'>Near</option>
                                        <option value='center'>Center</option>
                                        <option value='far'>Far</option>
                                    </select>
                                </div>
                                {/* <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-sampleSize'
                                        title='The number of ticks to examine when deciding how many labels will fit. 
                                            Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.'>
                                        Sample size: </label>
                                    <input type='number' name='ticks-sampleSize' defaultValue={'ticks?.length'}></input>
                                </div> */}
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-autoSkip'
                                        title='If true, automatically calculates how many labels can be shown and hides labels accordingly. 
                                                Labels will be rotated up to maxRotation before skipping any. 
                                                Turn autoSkip off to show all labels no matter what.'>
                                        Auto skip: </label>
                                    <input type='radio' name='ticks-autoSkip' value='true'
                                        defaultChecked={axisIdScale?.ticks.autoSkip}
                                        onChange={(e) => modifySetting('ticks-autoSkip', e.target.value, e.target.type)}></input>
                                    <label htmlFor='true'>True</label>
                                    <input type='radio' name='ticks-autoSkip' value='false'
                                        defaultChecked={axisIdScale?.ticks.autoSkip ? false : true}
                                        onChange={(e) => modifySetting('ticks-autoSkip', e.target.value, e.target.type)}></input>
                                    <label htmlFor='false'>False</label>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-autoSkipPadding'
                                        title='Padding between the ticks on the horizontal axis when autoSkip is enabled.'>
                                        Auto skip padding:</label>
                                    <input name='ticks-autoSkipPadding' type='number' min='0' max='20'
                                        defaultValue={axisIdScale?.ticks.autoSkipPadding}
                                        onChange={(e) => modifySetting('ticks-autoSkipPadding', e.target.value, e.target.type)}></input>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-includeBounds'
                                        title='Should the defined min and max values be presented as ticks even if they are not "nice".'>
                                        Include bounds: </label>
                                    <input type='radio' name='ticks-includeBounds' value='true'
                                        defaultChecked={axisIdScale?.ticks.includeBounds}
                                        onChange={(e) => modifySetting('ticks-includeBounds', e.target.value, e.target.type)}></input>
                                    <label htmlFor='true'>True</label>
                                    <input type='radio' name='ticks-includeBounds' value='false'
                                        defaultChecked={axisIdScale?.ticks.includeBounds ? false : true}
                                        onChange={(e) => modifySetting('ticks-includeBounds', e.target.value, e.target.type)}></input>
                                    <label htmlFor='false'>False</label>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-labelOffset'
                                        title='Distance in pixels to offset the label from the centre point of the tick 
                                                (in the x-direction for the x-axis, and the y-direction for the y-axis).'>
                                        Label offset:</label>
                                    <input name='ticks-labelOffset' type='number' min='0' max='20'
                                        defaultValue={axisIdScale?.ticks.labelOffset}
                                        onChange={(e) => modifySetting('ticks-labelOffset', e.target.value, e.target.type)}></input>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-maxRotation'
                                        title="Maximum rotation for tick labels when rotating to condense labels. 
                                                Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.">
                                        Max rotation:</label>
                                    <input name='ticks-maxRotation' type='number' min='0' defaultValue={axisIdScale?.ticks.maxRotation}
                                        onChange={(e) => modifySetting('ticks-maxRotation', e.target.value, e.target.type)}></input>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-minRotation'
                                        title="Minimum rotation for tick labels. Note: Only applicable to horizontal scales.">
                                        Min rotation:</label>
                                    <input name='ticks-minRotation' type='number' min='0' max='20'
                                        defaultValue={axisIdScale?.ticks.minRotation}
                                        onChange={(e) => modifySetting('ticks-minRotation', e.target.value, e.target.type)}></input>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-mirror'
                                        title='Flips tick labels around axis, displaying the labels inside the chart instead of outside.
                                                Note: Only applicable to vertical scales.'>
                                        Mirror: </label>
                                    <input type='radio' name='ticks-mirror' value='true'
                                        defaultChecked={axisIdScale?.ticks.mirror}
                                        onChange={(e) => modifySetting('ticks-mirror', e.target.value, e.target.type)}></input>
                                    <label htmlFor='true'>True</label>
                                    <input type='radio' name='ticks-mirror' value='false'
                                        defaultChecked={axisIdScale?.ticks.mirror ? false : true}
                                        onChange={(e) => modifySetting('ticks-mirror', e.target.value, e.target.type)}></input>
                                    <label htmlFor='false'>False</label>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='ticks-maxTicksLimit'
                                        title="Maximum number of ticks and gridlines to show.">
                                        Max ticks limit:</label>
                                    <input name='ticks-maxTicksLimit' type='number' min='0' max='20'
                                        defaultValue={axisIdScale?.ticks.maxTicksLimit}
                                        onChange={(e) => modifySetting('ticks-maxTicksLimit', e.target.value, e.target.type)}></input>
                                </div>
                            </div>

                            {(axisIdScale.type == 'time' || axisIdScale.type == 'timeseries') &&
                                (< div >
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='ticks-source'
                                            title=''>
                                            Ticks source: </label>
                                        <select name='ticks-source' defaultValue={axisIdScale?.ticks.source}
                                            onChange={(e) => modifySetting('ticks-source', e.target.value)}>
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
                                </div>)
                            }
                            {axisIdScale.type == 'linear' &&
                                (< div >
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='ticks-count'
                                            title=''>
                                            Count: </label>
                                        <input type='number' name='ticks-count' defaultValue={axisIdScale?.ticks.count}
                                            onChange={(e) => modifySetting('ticks-count', e.target.value, e.target.type)}></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='ticks-precision'
                                            title=''>
                                            Precision: </label>
                                        <input type='number' name='ticks-precision' defaultValue={axisIdScale?.ticks.precision}
                                            onChange={(e) => modifySetting('ticks-precision', e.target.value, e.target.type)}></input>
                                    </div>
                                    <div className='graphic-form-group-opt'>
                                        <label htmlFor='ticks-stepSize'
                                            title=''>
                                            Step size: </label>
                                        <input type='number' name='ticks-stepSize' defaultValue={axisIdScale?.ticks.stepSize}
                                            onChange={(e) => modifySetting('ticks-stepSize', e.target.value, e.target.type)}></input>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                )
            }
        </fieldset >
    )
}
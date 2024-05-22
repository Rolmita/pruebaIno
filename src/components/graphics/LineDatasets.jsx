import { useState, useEffect } from 'react'
export default function LineDataset({ dataset, onDatasetChange, onTypeChange, index }) {
    //TODO: PASAR EL ID QUE ES DESDE LA PAG PADRE
    const xAxisIDs = ['first-x-axis', 'second-x-axis', 'third-x-axis', 'fourth-x-axis', 'fifth-x-axis']
    const yAxisIDs = ['first-y-axis', 'second-y-axis', 'third-y-axis', 'fourth-y-axis', 'fifth-y-axis']

    const [showLine, setShowLine] = useState(true)
    const [enableBorderDash, setEnableBorderDash] = useState(false)
    const [borderDash, setBorderDash] = useState([0, 0])
    const [borderDashLineLength, setBorderDashLineLength] = useState(borderDash[0])
    const [borderDashLineSpacing, setBorderDashLineSpacing] = useState(borderDash[1])

    const [thisDataset, setThisDataset] = useState(dataset)

    console.log(dataset);
    console.log('este es el index de lineDataset', index);

    const toggleDropdown = (divId, imgId) => {
        const element = document.getElementById(divId);
        element.style.display === 'none' ? element.style.display = 'block' : element.style.display = 'none'
        const img = document.getElementById(imgId)
        img.style.transform == 'rotate(180deg)' ? img.style.transform = 'rotate(0deg)' : img.style.transform = 'rotate(180deg)'

    };

    const handleCheckboxChange = (name, value) => {
        const lineSettings = document.getElementById('lineSettings')
        console.log(value);
        if (value == true && name == 'showLine') {
            setShowLine(true)
            modifySetting('showLine', value)
            lineSettings.style.display = 'flex'
            lineSettings.style.flexDirection = 'column'
        } else if (name == 'showLine') {
            setShowLine(false)
            modifySetting('showLine', false)
            lineSettings.style.display = 'none'
        }
        if (value == true && name == 'borderDash') {
            setEnableBorderDash(true)
            borderDashSettings.style.display = 'flex'
            borderDashSettings.style.flexDirection = 'column'
        } else if (name == 'borderDash') {
            setEnableBorderDash(false)
            setBorderDash([])
            modifySetting('borderDash', [])
            borderDashSettings.style.display = 'none'
        }
    }

    useEffect(() => {
        modifySetting('borderDash', [borderDashLineLength, borderDashLineSpacing])
    }, [borderDashLineLength, borderDashLineSpacing])

    const modifySetting = (key, value, type) => {
        if (key == 'type' && value == 'undefined') value.trim().replace(/'/g, '');
        if (key == 'type') onTypeChange(value)
        let updatedDataset
        if (key == 'backgroundColor') {
            const colorToModify = value
            value = hexToRgba(colorToModify)
        }
        if (key == 'pointStyle' && value == 'false') value = false
        if (type == 'number') {
            const numValue = Number(value)
            updatedDataset = { ...thisDataset, [key]: numValue }
        } else {
            updatedDataset = { ...thisDataset, [key]: value }
        }
        setThisDataset(updatedDataset)
        onDatasetChange(updatedDataset)
    }

    const onTypeChangeInner = (chartType, index) => {
        modifySetting('type', chartType)
        onTypeChange(chartType, index)
    };

    const handleRadioChange = (e) => {
        modifySetting('indexAxis', e.target.value)
    }

    const hexToRgba = (hex) => {
        hex = hex.replace(/^#/, '')

        if (hex.length !== 6) throw new Error('Invalid hexadecimal color')

        const r = parseInt(hex.slice(0, 2), 16)
        const g = parseInt(hex.slice(2, 4), 16)
        const b = parseInt(hex.slice(4, 6), 16)

        return `rgba(${r}, ${g}, ${b}, 0.1)`
    }

    // const rgbaToHex = (rgba) => {
    //     const [r, g, b, a] = rgba.match(/\d+(\.\d+)?/g).map(Number);

    //     const rHex = r.toString(16).padStart(2, '0');
    //     const gHex = g.toString(16).padStart(2, '0');
    //     const bHex = b.toString(16).padStart(2, '0');

    //     // let aHex = '';
    //     // if (a !== undefined && !isNaN(a)) {
    //     //     const aInt = Math.round(a * 255);
    //     //     aHex = aInt.toString(16).padStart(2, '0');
    //     // }

    //     return `#${rHex}${gHex}${bHex}`.toUpperCase();
    // };

    return (
        <div>
            <div className='graphic-form-group'>
                <label htmlFor="type">
                    Type of dataset:</label>
                <select name='type' onChange={(e) => onTypeChangeInner(e.target.value, index)}>
                    <option value='undefined'>--Select a dataset type--</option>
                    <option value='line'>Line</option>
                    <option value='pie'>Pie</option>
                    <option value='doughnut'>Doughnut</option>
                    <option value='bar'>Bar</option>
                </select>
            </div>
            <div>
                <div className='graphic-form-group'>
                    <h4 style={{ marginRight: '10px' }}>Basics settings</h4>
                    <button type='button' onClick={() => toggleDropdown('basicSettings-dropdown', 'down-img-dataset-1-basic')}>
                        <img id='down-img-dataset-1-basic' className='down-img' src='/down.svg' width='10px' /></button>
                </div>
                <div id="basicSettings-dropdown" style={{ display: 'none', padding: '5px' }}>

                    <div className='graphic-form-group-opt'>
                        <label htmlFor='label'>Dataset label: </label>
                        <input type='text' name='label' defaultValue={thisDataset?.label} onChange={(e) => modifySetting('label', e.target.value)} />
                    </div>

                    <div className='graphic-form-group-opt'>
                        <label htmlFor='indexAxis' title="The base axis of the dataset. 'x' for horizontal lines and 'y' for vertical lines.">Index Axis: </label>
                        <input type='radio' name='indexAxis' value='x' defaultChecked onChange={handleRadioChange} />
                        <label htmlFor='x'>x</label>
                        <input type='radio' name='indexAxis' value='y' onChange={handleRadioChange} />
                        <label htmlFor='x'>y</label>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='xAxisID'>xAxisID: </label>
                        <select name='xAxisID' onChange={(e) => modifySetting('xAxisID', e.target.value)}>
                            {xAxisIDs.map((axis, index) => (<option key={`xAxis${index}`} value={axis}>{axis}</option>))}
                        </select>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='yAxisID'>yAxisID: </label>
                        <select name='yAxisID' onChange={(e) => modifySetting('yAxisID', e.target.value)}>
                            {yAxisIDs.map((axis, index) => (<option key={`yAxis${index}`} value={axis}>{axis}</option>))}
                        </select>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='order'>Order: </label>
                        <input type='number' name='order' defaultValue={thisDataset?.order} step='1'
                            onChange={(e) => modifySetting('order', e.target.value, e.target.type)}></input>
                    </div>
                </div>
            </div>
            <div>
                <div className='graphic-form-group'>
                    <h4 style={{ marginRight: '10px' }}>Line Settings</h4>
                    <button type='button' onClick={() => toggleDropdown('lineSettings-dropdown', 'down-img-dataset-1-line')}>
                        <img id='down-img-dataset-1-line' className='down-img' src='/down.svg' width='10px' /></button>
                </div>
                <div id="lineSettings-dropdown" style={{ display: 'none', padding: '5px' }}>
                    <div className='graphic-form-group-opt'>
                        <input type='checkbox' id='showLine' name='showLine' defaultChecked={showLine}
                            onChange={(e) => handleCheckboxChange('showLine', e.target.checked)}></input>
                        <label htmlFor='showLine'>Show line</label>
                    </div>
                    <div id='lineSettings' style={{}}>
                        <div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='backgroundColor'>Background color: </label>
                                <input type='color' id='backgroundColor' name='backgroundColor' defaultValue={thisDataset?.backgroundColor}
                                    onChange={(e) => modifySetting('backgroundColor', e.target.value)}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='hoverBackgroundColor'>Background color when hover: </label>
                                <input type='color' id='hoverBackgroundColor' name='hoverBackgroundColor' defaultValue={thisDataset?.hoverBackgroundColor}
                                    onChange={(e) => modifySetting('hoverBackgroundColor', e.target.value)}></input>
                            </div>
                        </div>

                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderCapStyle'>Border cap style: </label>
                            <select name='borderCapStyle' defaultValue={thisDataset?.borderCapStyle}
                                onChange={(e) => modifySetting('borderCapStyle', e.target.value)}>
                                <option value='butt'>butt</option>
                                <option value='round'>round</option>
                                <option value='square'>square</option>
                            </select>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderColor'>Border color: </label>
                            <input type='color' id='borderColor' name='borderColor' defaultValue={thisDataset?.borderColor}
                                onChange={(e) => modifySetting('borderColor', e.target.value)}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='hoverBorderColor'>Border color when hover: </label>
                            <input type='color' id='hoverBorderColor' name='hoverBorderColor' defaultValue={thisDataset?.hoverBorderColor}
                                onChange={(e) => modifySetting('hoverBorderColor', e.target.value)}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <input type='checkbox' id='borderDash' name='borderDash' defaultChecked={enableBorderDash}
                                onChange={(e) => handleCheckboxChange('borderDash', e.target.checked)}></input>
                            <label htmlFor='borderDash'>Enable border dash</label>
                            <div id='borderDashSettings' style={{ display: 'none' }}>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='borderDash-line'>Border dash line lenght: </label>
                                    <input type='number' name='borderDash-line' defaultValue={0}
                                        onChange={(e) => { setBorderDashLineLength(e.target.value) }}></input>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='borderDash-spacing'>Border dash line spacing: </label>
                                    <input type='number' name='borderDash-spacing' defaultValue={0}
                                        onChange={(e) => { setBorderDashLineSpacing(e.target.value) }}></input>
                                </div>
                                <div className='graphic-form-group-opt'>
                                    <label htmlFor='borderWidth'>Border width: </label>
                                    <input type='number' name='borderWidth' defaultValue={thisDataset?.borderWidth}
                                        onChange={(e) => modifySetting('borderWidth', e.target.value, e.target.type)}></input>
                                </div>
                            </div>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderJoinStyle'>Border cap style: </label>
                            <select name='borderJoinStyle' defaultValue={thisDataset?.borderJoinStyle}
                                onChange={(e) => modifySetting('borderJoinStyle', e.target.value)}>
                                <option value='butt'>miter</option>
                                <option value='round'>round</option>
                                <option value='bevel'>bevel</option>
                            </select>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='fill'>Fill: </label>
                            <select name='fill' defaultValue={thisDataset?.fill}
                                onChange={(e) => modifySetting('fill', e.target.value)}>
                                <option value='false'>disabled</option>
                                <option value='-1'>previous dataset</option>
                                <option value='shape'>shape (inside line)</option>
                                <option value='stack'>stacked value below</option>
                                <option value='start'>boundary start</option>
                                <option value='end'>boundary end</option>
                                <option value='origin'>boundary origin</option>
                            </select>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='spanGaps'>Draw line between points with no or null data: </label>
                            <input type='radio' name='spanGaps' value='false'
                                onSelect={(e) => modifySetting('spanGaps', e.target.value)}></input>
                            <label htmlFor='true'>yes</label>
                            <input type='radio' name='spanGaps' value='true'
                                onSelect={(e) => modifySetting('spanGaps', e.target.value)}></input>
                            <label htmlFor='true'>no</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='graphic-form-group'>
                    <h4 style={{ marginRight: '10px' }}>Point Settings</h4>
                    <button type='button' onClick={() => toggleDropdown('pointSettings-dropdown', 'down-img-dataset-1-point')}>
                        <img id='down-img-dataset-1-point' className='down-img' src='/down.svg' width='10px' /></button>
                </div>
                <div id="pointSettings-dropdown" style={{ display: 'none', padding: '5px' }}>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointStyle'>Point style: </label>
                        <select name='pointStyle' onChange={(e) => modifySetting('pointStyle', e.target.value)}>
                            <option value='false'>false</option>
                            <option value='circle'>circle</option>
                            <option value='cross'>cross</option>
                            <option value='crossRot'>crossRot</option>
                            <option value='dash'>dash</option>
                            <option value='line'>line</option>
                            <option value='rect'>rect</option>
                            <option value='rectRounded'>rectRounded</option>
                            <option value='rectRot'>rectRot</option>
                            <option value='star'>star</option>
                            <option value='triangle'>triangle</option>
                        </select>
                    </div>
                    <div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='pointBackgroundColor'>Point background color: </label>
                            <input type='color' id='pointBackgroundColor' name='pointBackgroundColor' defaultValue={thisDataset?.pointBackgroundColor}
                                onChange={(e) => modifySetting('pointBackgroundColor', e.target.value)}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='pointHoverBackgroundColor'>Point background color when hover: </label>
                            <input type='color' id='pointHoverBackgroundColor' name='pointHoverBackgroundColor' defaultValue={thisDataset?.pointHoverBackgroundColor}
                                onChange={(e) => modifySetting('pointHoverBackgroundColor', e.target.value)}></input>
                        </div>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointBorderColor'>Border color: </label>
                        <input type='color' id='pointBorderColor' name='pointBorderColor' defaultValue={thisDataset?.pointBorderColor}
                            onChange={(e) => modifySetting('pointBorderColor', e.target.value)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointHoverBorderColor'>Border color when hover: </label>
                        <input type='color' id='pointHoverBorderColor' name='pointHoverBorderColor' defaultValue={thisDataset?.pointHoverBorderColor}
                            onChange={(e) => modifySetting('pointHoverBorderColor', e.target.value)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointBorderWidth'>Border width: </label>
                        <input type='number' name='pointBorderWidth' defaultValue={thisDataset?.pointBorderWidth}
                            onChange={(e) => modifySetting('pointBorderWidth', e.target.value, e.target.type)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointRadius'>Point radius: </label>
                        <input type='number' name='pointRadius' defaultValue={thisDataset?.pointRadius}
                            onChange={(e) => modifySetting('pointRadius', e.target.value, e.target.type)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointHoverRadius'>Point hover radius: </label>
                        <input type='number' name='pointHoverRadius' defaultValue={thisDataset?.pointHoverRadius}
                            onChange={(e) => modifySetting('pointHoverRadius', e.target.value, e.target.type)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointHitRadius'>Point hit radius: </label>
                        <input type='number' name='pointHitRadius' defaultValue={thisDataset?.pointHitRadius}
                            onChange={(e) => modifySetting('pointHitRadius', e.target.value, e.target.type)}></input>
                    </div>
                </div>

            </div>
        </div>
    )
}
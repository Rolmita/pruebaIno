import { useState, useEffect } from 'react'

export default function BarDataset({ dataset, onDatasetChange, onTypeChange, index }) {
    const xAxisIDs = ['first-x-axis', 'second-x-axis', 'third-x-axis', 'fourth-x-axis', 'fifth-x-axis']
    const yAxisIDs = ['first-y-axis', 'second-y-axis', 'third-y-axis', 'fourth-y-axis', 'fifth-y-axis']

    const [thisDataset, setThisDataset] = useState(dataset)

    console.log(dataset);

    const toggleDropdown = (divId, imgId) => {
        const element = document.getElementById(divId);
        element.style.display === 'none' ? element.style.display = 'block' : element.style.display = 'none'
        const img = document.getElementById(imgId)
        img.style.transform == 'rotate(180deg)' ? img.style.transform = 'rotate(0deg)' : img.style.transform = 'rotate(180deg)'
    };

    const handleColorCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const colorsArray = value.split(',').map(color => color.trim().replace(/'/g, ''));
        if (checked) {
            setSelectedColors(prevSelectedColors => [...prevSelectedColors, ...colorsArray]);
        } else {
            setSelectedColors(prevSelectedColors =>
                prevSelectedColors.filter(color => !colorsArray.includes(color))
            );
        }
    };

    const onTypeChangeInner = (chartType, index) => {
        modifySetting('type', chartType)
        onTypeChange(chartType, index)
    };

    const modifySetting = (key, value, type) => {
        if (key == 'type' && value == 'undefined') value.trim().replace(/'/g, '');
        if (key == 'type') onTypeChange(value)
        let updatedDataset
        if (key == 'backgroundColor') {
            const colorToModify = value
            value = hexToRgba(colorToModify)
        }
        if (key == 'pointStyle' && (value == 'false' || value == 'true')) value.trim().replace(/'/g, '')
        if (type == 'number') {
            const numValue = Number(value)
            updatedDataset = { ...thisDataset, [key]: numValue }
        } else {
            updatedDataset = { ...thisDataset, [key]: value }
        }
        setThisDataset(updatedDataset)
        onDatasetChange(updatedDataset)
    }

    const handleRadioChange = (e) => {
        e.target.name == 'indexAxis' && modifySetting('indexAxis', e.target.value)
        e.target.name == 'grouped' && modifySetting('grouped', e.target.value)
    }

    const hexToRgba = (hex) => {
        hex = hex.replace(/^#/, '');
        if (hex.length !== 6) {
            throw new Error('Invalid hexadecimal color');
        }
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, 0.1)`;
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
                <select name='type' onChange={(e) => onTypeChangeInner(e.target.value, index)} defaultValue={thisDataset?.type}>
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
                    <button type='button' onClick={() => toggleDropdown(`basicSettings-dropdown-bar-${index}`, `down-img-bar-${index}-basic`)}>
                        <img id={`down-img-bar-${index}-basic`} className='down-img' src='/down.svg' width='10px' /></button>
                </div>
                <div id={`basicSettings-dropdown-bar-${index}`} style={{ display: 'none', padding: '5px' }}>
                    {/* TODO: POR DEFECTO EL NOMBRE DE LA COLUMNA */}
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='label'>Dataset label: </label>
                        <input type='text' name='label' defaultValue={thisDataset?.label} onChange={(e) => modifySetting('label', e.target.value)} />
                    </div>
                    {/* TODO: AÑADIR CONFIGURACION DEL INDEXAXIS EN EL ONCHANGE */}
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
                        <input type='number' name='order' defaultValue={thisDataset?.order}
                            onChange={(e) => modifySetting('order', e.target.value, e.target.type)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='base'>Base value: </label>
                        <input type='number' name='base' defaultValue={thisDataset?.base}
                            onChange={(e) => modifySetting('base', e.target.value, e.target.type)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='grouped' title="">Grouped: </label>
                        <input type='radio' name='grouped' value='true' defaultChecked onChange={handleRadioChange} />
                        <label htmlFor='true'>true</label>
                        <input type='radio' name='grouped' value='false' onChange={handleRadioChange} />
                        <label htmlFor='false'>false</label>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='barPercentage'>Bar percentage : </label>
                        <input type='number' name='barPercentage' defaultValue={thisDataset?.barPercentage} step='0.1'
                            onChange={(e) => modifySetting('barPercentage', e.target.value, e.target.type)}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='categoryPercentage'>Category percentage : </label>
                        <input type='number' name='categoryPercentage' defaultValue={thisDataset?.categoryPercentage} step='0.1'
                            onChange={(e) => modifySetting('categoryPercentage', e.target.value, e.target.type)}></input>
                    </div>
                </div>
                <div>
                    <div className='graphic-form-group'>
                        <h4 style={{ marginRight: '10px' }}>Style Settings</h4>
                        <button type='button' onClick={() => toggleDropdown(`styleSettings-dropdown-bar-${index}`, `down-img-bar-${index}-style`)}>
                            <img id={`down-img-bar-${index}-style`} className='down-img' src='/down.svg' width='10px' /></button>
                    </div>
                    <div id={`styleSettings-dropdown-bar-${index}`} style={{ display: 'none', padding: '5px' }}>
                        <div className='graphic-form-group-opt' style={{ display: 'flex', flexDirection: 'row' }}>
                            <label htmlFor='backgroundColor'>Background color: </label>
                            <div style={{ backgroundColor: 'white', padding: '3px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
                                    <input type='checkbox' name='backgroundColor' style={{ marginRight: '5px' }}
                                        value="'#f0a202', '#f18805', '#d95d39', '#202c59', '#581f18'"
                                        onChange={handleColorCheckboxChange}></input>
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#f0a202' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#f18805' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#d95d39' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#202c59' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#581f18' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
                                    <input type='checkbox' name='backgroundColor' style={{ marginRight: '5px' }}
                                        value="'#cfffb3', '#ade25d', '#fcec52', '#3b7080', '#3a5743'"
                                        onChange={handleColorCheckboxChange}></input>
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#cfffb3' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#ade25d' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#fcec52' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#3b7080' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#3a5743' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
                                    <input type='checkbox' name='backgroundColor' style={{ marginRight: '5px' }}
                                        value="'#a4243b', '#d8c99b', '#d8973c', '#bd632f', '#273e47'"
                                        onChange={handleColorCheckboxChange}></input>
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#a4243b' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#d8c99b' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#d8973c' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#bd632f' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#273e47' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
                                    <input type='checkbox' name='backgroundColor' style={{ marginRight: '5px' }}
                                        value="'#21294A', '#4D688F', '#37a35d', '#edeff2', '#ebb93b'"
                                        onChange={handleColorCheckboxChange}></input>
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#21294A' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#4D688F' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#37a35d' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#edeff2' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#ebb93b' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
                                    <input type='checkbox' name='backgroundColor' style={{ marginRight: '5px' }}
                                        value="'#0e2e2b', '#254656', '#74b39c', '#38a889', '#fe8451', '#f1a93c'"
                                        onChange={handleColorCheckboxChange}></input>
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#0e2e2b' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#254656' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#74b39c' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#38a889' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#fe8451' }} />
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#f1a93c' }} />
                                </div>
                                <div>
                                    <input type='checkbox' name='backgroundColor' defaultChecked style={{ marginRight: '5px' }}
                                        value="'#f0a202', '#f18805', '#d95d39', '#202c59', '#581f18','#cfffb3', '#ade25d', '#fcec52', '#3b7080', '#3a5743','#a4243b', '#d8c99b', '#d8973c', ' #bd632f', '#273e47','#21294A', '#4D688F', '#37a35d', '#edeff2', '#ebb93b','#0e2e2b', '#254656', '#74b39c', '#38a889', '#fe8451', '#f1a93c'"
                                        onChange={handleColorCheckboxChange} />
                                    <label htmlFor="all">All palettes</label>
                                </div>
                            </div>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderColor'>Border color: </label>
                            <input type='color' id='borderColor' name='borderColor' defaultValue={thisDataset?.borderColor}
                                onChange={(e) => modifySetting('borderColor', e.target.value)}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderWidth'>Border width: </label>
                            <input type='number' name='borderWidth' defaultValue={thisDataset?.borderWidth}
                                onChange={(e) => modifySetting('borderWidth', e.target.value, e.target.type)}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderRadius'>Border radius: </label>
                            <input type='number' name='borderRadius' defaultValue={thisDataset?.borderRadius}
                                onChange={(e) => modifySetting('borderRadius', e.target.value, e.target.type)}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderSkipped'>Border skipped: </label>
                            <select name='borderSkipped' onChange={(e) => modifySetting('borderSkipped', e.target.value)}>
                                <option value='start'>start</option>
                                <option value='end'>end</option>
                                <option value='middle'>middle</option>
                                <option value='bottom'>bottom</option>
                                <option value='left'>left</option>
                                <option value='top'>top</option>
                                <option value='right'>right</option>
                                <option value='false '>false </option>
                                <option value='true'>true</option>
                            </select>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'

export default function BarDataset({ dataset, onDatasetChange, index }) {
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

    const handleCheckboxChange = (name, value) => {
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

    const modifySetting = (key, value, type) => {
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
            <div>
                <div className='graphic-form-group'>
                    <h4 style={{ marginRight: '10px' }}>Basics settings</h4>
                    <button type='button' onClick={() => toggleDropdown('basicSettings-dropdown', 'down-img-dataset-1-basic')}>
                        <img id='down-img-dataset-1-basic' className='down-img' src='/down.svg' width='10px' /></button>
                </div>
                <div id="basicSettings-dropdown" style={{ display: 'none', padding: '5px' }}>
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
                </div>
            </div>
            <div>
                <div className='graphic-form-group'>
                    <h4 style={{ marginRight: '10px' }}>Style Settings</h4>
                    <button type='button' onClick={() => toggleDropdown('styleSettings-dropdown', 'down-img-dataset-1-style')}>
                        <img id='down-img-dataset-1-style' className='down-img' src='/down.svg' width='10px' /></button>
                </div>
                <div id="styleSettings-dropdown" style={{ display: 'none', padding: '5px' }}>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='backgroundColor'>Background color: </label>
                        <input type='color' id='backgroundColor' name='backgroundColor' defaultValue={thisDataset?.backgroundColor}
                            onChange={(e) => modifySetting('backgroundColor', e.target.value)}></input>
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
    )
}
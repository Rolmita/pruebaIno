import { useState, useEffect } from 'react'
export default function LineDataset({ dataset, onDatasetChange, index }) {
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
            lineSettings.style.display = 'flex'
            lineSettings.style.flexDirection = 'column'
        } else if (name == 'showLine') {
            setShowLine(false)
            lineSettings.style.display = 'none'
        }
        if (value == true && name == 'borderDash') {
            setEnableBorderDash(true)
            borderDashSettings.style.display = 'flex'
            borderDashSettings.style.flexDirection = 'column'
        } else if (name == 'borderDash') {
            setEnableBorderDash(false)
            borderDashSettings.style.display = 'none'
        }
    }

    useEffect(() => {
        setBorderDash([borderDashLineLength, borderDashLineSpacing])
    }, [borderDashLineLength, borderDashLineSpacing])

    const modifySetting = (key, value) => {
        dataset[key] = value
    }

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
                        <input type='text' name='label' defaultValue={dataset?.label} onChange={(e) => modifySetting('label', e.target.value)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='indexAxis' title="The base axis of the dataset. 'x' for horizontal lines and 'y' for vertical lines.">Index Axis: </label>
                        <input type='radio' name='indexAxis' value='x' defaultChecked />
                        <label htmlFor='x'>x</label>
                        <input type='radio' name='indexAxis' value='y' />
                        <label htmlFor='x'>y</label>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='xAxisID'>xAxisID: </label>
                        <select name='xAxisID'>
                            {xAxisIDs.map((axis, index) => (<option key={`xAxis${index}`} value={axis}>{axis}</option>))}
                        </select>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='yAxisID'>yAxisID: </label>
                        <select name='yAxisID'>
                            {yAxisIDs.map((axis, index) => (<option key={`yAxis${index}`} value={axis}>{axis}</option>))}
                        </select>
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
                                <input type='color' id='backgroundColor' name='backgroundColor' defaultValue={dataset?.backgroundColor}></input>
                            </div>
                            <div className='graphic-form-group-opt'>
                                <label htmlFor='hoverBackgroundColor'>Background color when hover: </label>
                                <input type='color' id='hoverBackgroundColor' name='hoverBackgroundColor' defaultValue={dataset?.hoverBackgroundColor}></input>
                            </div>
                        </div>

                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderCapStyle'>Border cap style: </label>
                            <select name='borderCapStyle' defaultValue={dataset?.borderCapStyle}>
                                <option value='butt'>butt</option>
                                <option value='round'>round</option>
                                <option value='square'>square</option>
                            </select>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderColor'>Border color: </label>
                            <input type='color' id='borderColor' name='borderColor' defaultValue={dataset?.borderColor}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='hoverBorderColor'>Border color when hover: </label>
                            <input type='color' id='hoverBorderColor' name='hoverBorderColor' defaultValue={dataset?.hoverBorderColor}></input>
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
                                    <input type='number' name='borderWidth' defaultValue={dataset?.borderWidth}></input>
                                </div>
                            </div>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='borderJoinStyle'>Border cap style: </label>
                            <select name='borderJoinStyle' defaultValue={dataset?.borderJoinStyle}>
                                <option value='butt'>miter</option>
                                <option value='round'>round</option>
                                <option value='bevel'>bevel</option>
                            </select>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='fill'>Fill: </label>
                            <select name='fill' defaultValue={dataset?.fill}>
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
                            <input type='radio' name='spanGaps' value='false'></input>
                            <label htmlFor='true'>yes</label>
                            <input type='radio' name='spanGaps' value='true'></input>
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
                        <select name='pointStyle'>
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
                            <input type='color' id='pointBackgroundColor' name='pointBackgroundColor' defaultValue={dataset?.pointBackgroundColor}></input>
                        </div>
                        <div className='graphic-form-group-opt'>
                            <label htmlFor='pointHoverBackgroundColor'>Point background color when hover: </label>
                            <input type='color' id='pointHoverBackgroundColor' name='pointHoverBackgroundColor' defaultValue={dataset?.pointHoverBackgroundColor}></input>
                        </div>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointBorderColor'>Border color: </label>
                        <input type='color' id='pointBorderColor' name='pointBorderColor' defaultValue={dataset?.pointBorderColor}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointHoverBorderColor'>Border color when hover: </label>
                        <input type='color' id='pointHoverBorderColor' name='pointHoverBorderColor' defaultValue={dataset?.pointHoverBorderColor}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointBorderWidth'>Border width: </label>
                        <input type='number' name='pointBorderWidth' defaultValue={dataset?.pointBorderWidth}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointRadius'>Point radius: </label>
                        <input type='number' name='pointRadius' defaultValue={dataset?.pointRadius}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointHoverRadius'>Point hover radius: </label>
                        <input type='number' name='pointHoverRadius' defaultValue={dataset?.pointHoverRadius}></input>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='pointHitRadius'>Point hit radius: </label>
                        <input type='number' name='pointHitRadius' defaultValue={dataset?.pointHitRadius}></input>
                    </div>
                </div>

            </div>
        </div>
    )
}
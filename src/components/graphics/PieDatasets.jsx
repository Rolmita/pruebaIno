import { useState, useEffect } from "react"

export default function PieDoughnutDatasets({ dataset, onDatasetChange }) {
    const [thisDataset, setThisDataset] = useState(dataset)

    const [selectedColors, setSelectedColors] = useState([]);

    console.log(dataset.data);

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

    const handleRadioChange = (e) => {
        modifySetting('borderAlign', e.target.value, e.target.type)
    }

    const modifySetting = (key, value, type) => {
        let updatedDataset
        console.log(type);
        if (type == 'number') {
            const numValue = Number(value)
            updatedDataset = { ...thisDataset, [key]: numValue }
        } else {
            updatedDataset = { ...thisDataset, [key]: value }
        }
        setThisDataset(updatedDataset)
        onDatasetChange(updatedDataset)
    }

    useEffect(() => {
        modifySetting('backgroundColor', selectedColors)
    }, [selectedColors])

    const toggleDropdown = (divId, imgId) => {
        const element = document.getElementById(divId);
        element.style.display === 'none' ? element.style.display = 'block' : element.style.display = 'none'
        const img = document.getElementById(imgId)
        img.style.transform == 'rotate(180deg)' ? img.style.transform = 'rotate(0deg)' : img.style.transform = 'rotate(180deg)'

    };

    const linnearGradient = {
        background: 'linear-gradient(90deg, #f0a202ff, #f18805ff, #d95d39ff, #202c59ff, #581f18ff)',
        color: 'white'
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
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='label'>Dataset label: </label>
                        <input type='text' name='label' defaultValue={thisDataset?.label}
                            onChange={(e) => modifySetting('label', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='circumference'>Circumference: </label>
                        <input type='number' name='circumference' defaultValue={thisDataset?.circumference}
                            onChange={(e) => modifySetting('circumference', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='offset'>Offset: </label>
                        <input type='number' name='offset' defaultValue={thisDataset?.offset}
                            onChange={(e) => modifySetting('offset', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='hoverOffset'>Hover offset: </label>
                        <input type='number' name='hoverOffset' defaultValue={thisDataset?.hoverOffset}
                            onChange={(e) => modifySetting('hoverOffset', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='rotation'>Rotation: </label>
                        <input type='number' name='rotation' defaultValue={thisDataset?.rotation}
                            onChange={(e) => modifySetting('rotation', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='spacing'>Spacing: </label>
                        <input type='number' name='spacing' defaultValue={thisDataset?.spacing}
                            onChange={(e) => modifySetting('spacing', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='weight'>Weight: </label>
                        <input type='number' name='weight' defaultValue={thisDataset?.weight}
                            onChange={(e) => modifySetting('weight', e.target.value, e.target.type)} />
                    </div>
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
                            </div></div>
                    </div>
                </div>
            </div>
            <div>
                <div className='graphic-form-group'>
                    <h4 style={{ marginRight: '10px' }}>Border settings</h4>
                    <button type='button' onClick={() => toggleDropdown('borderSettings-dropdown', 'down-img-dataset-1-border')}>
                        <img id='down-img-dataset-1-border' className='down-img' src='/down.svg' width='10px' /></button>
                </div>
                <div id="borderSettings-dropdown" style={{ display: 'none', padding: '5px' }}>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='borderAlign'>Border align: </label>
                        <input type='radio' name='borderAlign' value='center' defaultChecked
                            onChange={handleRadioChange} />
                        <label htmlFor="center">center</label>
                        <input type='radio' name='borderAlign' value='inner'
                            onChange={handleRadioChange} />
                        <label htmlFor="inner">inner</label>
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='borderRadius'>Border radius: </label>
                        <input type='number' name='borderRadius' defaultValue={thisDataset?.borderRadius}
                            onChange={(e) => modifySetting('borderRadius', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='borderWidth'>Border width: </label>
                        <input type='number' name='borderWidth' defaultValue={thisDataset?.borderWidth}
                            onChange={(e) => modifySetting('borderWidth', e.target.value, e.target.type)} />
                    </div>
                    <div className='graphic-form-group-opt'>
                        <label htmlFor='borderJoinStyle'>Border join style: </label>
                        <select name='borderJoinStyle' defaultValue={thisDataset?.borderJoinStyle}
                            onChange={(e) => modifySetting('borderJoinStyle', e.target.value, e.target.type)} >
                            <option value='miter'>miter</option>
                            <option value='round'>round</option>
                            <option value='bevel'>bevel</option>
                        </select>
                    </div>
                </div>
            </div>

        </div >
    )
}
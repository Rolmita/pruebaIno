
export default function GraphicForm() {

    return (
        <form className="graphic-form">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ overflowY: 'scroll', scrollBehavior: 'auto', height: '200px', width: '50%' }}>
                    <div>
                        <fieldset>
                            <legend>Title </legend>
                            <label htmlFor="type">
                                Title of the graphic</label>
                            <input type='text' placeholder="Type a graphic name" />

                        </fieldset>
                        <fieldset>
                            <legend>Type: </legend>
                            <label htmlFor="type">
                                Type of graphic:</label>
                            <select name='type'>
                                <option value='null'>--Select a graphic type--</option>
                                <option value='line'>Line</option>
                                <option value='pie'>Pie</option>
                                <option value='bar'>Bar</option>
                            </select>

                        </fieldset>
                        <fieldset>
                            <legend>Legend: </legend>
                            <div>

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
                            <legend> X Axis Datasets: </legend>
                            <input type='hidden' name='x-axis' value='x'></input>
                            <label htmlFor="type">
                                Datasets:</label>
                            {/* TODO: AQUI SE COMPRUEBAN LAS COLUMNAS SELECCIONADAS EN LA QUERY Y SE MUESTRAN PARA ESTABLECERLAS*/}
                            {/* TODO: AÑADIR LOS SELCT COMO HICE CON LAS COLUMNAS EN EL QUERYFORM.JSX */}
                            {/* TODO: ESTOS DATOS SERAN LOS LABELS */}
                            <div>
                                <select name='dataset-x-1'>
                                    <option value='null'>--Select a dataset--</option>
                                    <option value='tiempo'>tiempo</option>
                                    <option value='voltios'>voltios</option>
                                </select>
                                <input type='text' name='dataset-x-2-name' placeholder='Scale Custom Name'></input>
                            </div>
                            <div style={{ display: 'none' }}>
                                <select name='dataset-x-2'>
                                    <option value='tiempo'>tiempo</option>
                                    <option value='voltios'>voltios</option>
                                </select>
                                <input type='text' name='dataset-x-2-name' placeholder='Scale Custom Name'></input>
                            </div>
                            <div style={{ display: 'none' }}>
                                <select name='dataset-x-3'>
                                    <option value='tiempo'>tiempo</option>
                                    <option value='voltios'>voltios</option>
                                </select>
                                <input type='text' name='dataset-x-3-name' placeholder='Scale Custom Name'></input>
                            </div>

                            <button type='button'>Add Dataset</button>
                        </fieldset>
                        <fieldset>
                            <legend> Y Axis Datasets: </legend>
                            <input type='hidden' name='y-axis' value='y'></input>
                            <label htmlFor="type">
                                Datasets:</label>
                            {/* TODO: AQUI SE COMPRUEBAN LAS COLUMNAS SELECCIONADAS EN LA QUERY Y SE MUESTRAN PARA ESTABLECERLAS*/}
                            {/* TODO: AÑADIR LOS SELCT COMO HICE CON LAS COLUMNAS EN EL QUERYFORM.JSX */}
                            {/* TODO: ESTOS DATOS SERÁN LOS DATASET */}
                            <div>
                                <select name='dataset-y-1'>
                                    <option value='null'>--Select a dataset--</option>
                                    <option value='tiempo'>tiempo</option>
                                    <option value='voltios'>voltios</option>
                                </select>
                                <input type='text' name='dataset-y-2-name' placeholder='Scale Custom Name'></input>
                            </div>
                            <div style={{ display: 'none' }}>
                                <select name='dataset-y-2'>
                                    <option value='tiempo'>tiempo</option>
                                    <option value='voltios'>voltios</option>
                                </select>
                                <input type='text' name='dataset-y-2-name' placeholder='Scale Custom Name'></input>
                            </div>
                            <div style={{ display: 'none' }}>
                                <select name='dataset-y-3'>
                                    <option value='tiempo'>tiempo</option>
                                    <option value='voltios'>voltios</option>
                                </select>
                                <input type='text' name='dataset-y-3-name' placeholder='Scale Custom Name'></input>
                            </div>

                            <button type='button'>Add Dataset</button>
                        </fieldset>
                    </div>
                </div>

                <div style={{ overflowY: 'scroll', scrollBehavior: 'auto', height: '200px', width: '50%' }}>
                    <fieldset>
                        <legend>X Axis Settings </legend>
                        <input type='hidden' name='x-axis' value='x'></input>
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
                            <div>
                                <h4>Axis type</h4>
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
                            <div>
                                <h4>Time values:</h4>
                                <div>
                                    <label htmlFor="time-parser">
                                        Your data format: </label>
                                    <select name='time-parser'>
                                        <option value='null'>--Select your data format--</option>
                                        <option value='YYYY-MM-DDTHH:mm:ss'>YYYY-MM-DDTHH:mm:ss</option>
                                        <option value='YYYY-MM-DDTHH:mm'>YYYY-MM-DDTHH:mm</option>
                                        <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                                        <option value='HH:mm:ss'>HH:mm:ss</option>
                                        <option value='HH:mm'>HH:mm</option>
                                    </select></div>
                                <div>
                                    <label htmlFor="time-unit">
                                        Unit </label>
                                    <select name='time-unit'>
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
                                    </select></div>
                            </div>
                            <div>
                                <label htmlFor="time-display-format">
                                    Display format for the ticks </label>
                                <select name='time-display-format'>
                                    <option value='null'>--Select your data format--</option>
                                    <option value='YYYY-MM-DDTHH:mm:ss'>YYYY-MM-DDTHH:mm:ss</option>
                                    <option value='YYYY-MM-DDTHH:mm'>YYYY-MM-DDTHH:mm</option>
                                    <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                                    <option value='HH:mm:ss'>HH:mm:ss</option>
                                    <option value='HH:mm'>HH:mm</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="time-tooltip-format">
                                    Tooltip format: </label>
                                <select name='time-tooltip-format'>
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
                            <div>
                                <h4>Style</h4>
                                <label htmlFor="'axis-bg-color'">
                                    Background color: </label>
                                <input name='axis-bg-color' type='color' defaultValue='#ffffff' />
                            </div>
                        </fieldset>
                    </fieldset>
                </div>
            </div>
        </form>
    )
}
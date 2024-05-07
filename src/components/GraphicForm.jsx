
export default function GraphicForm() {

    return (
        <form>
            <fieldset>
                <legend>Type: </legend>
                <label htmlFor="type">
                    Graphic type:
                    <select name='type'>
                        <option value='null'>--Select a graphic type--</option>
                        <option value='line'>Line</option>
                        <option value='pie'>Pie</option>
                        <option value='bar'>Bar</option>
                    </select>
                </label>
            </fieldset>
            <fieldset>
                <legend>Legend: </legend>
                <label htmlFor="legend-position">
                    Position:
                    <select name='legend-position'>
                        <option value='null'>--Select the legend position--</option>
                        <option value='none'>None</option>
                        <option value='top'>Top</option>
                        <option value='right'>Right</option>
                        <option value='left'>Left</option>
                        <option value='down'>Down</option>
                    </select>
                </label>
            </fieldset>
            <fieldset>
                <legend> X Axis: </legend>
                <label htmlFor="type">
                    Datasets:
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
                </label>
                <button type='button'>Add Dataset</button>
            </fieldset>
            <fieldset>
                <legend> Y Axis Datasets: </legend>
                <label htmlFor="type">
                    Datasets:
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
                </label>
                <button type='button'>Add Dataset</button>
            </fieldset>
            <fieldset>
                <legend> Axis Settings: </legend>
                <label htmlFor="">

                </label>
            </fieldset>
        </form>
    )
}
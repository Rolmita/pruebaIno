import { useState, useEffect } from 'react';
import Grafico from './Grafico';
import { Line } from 'react-chartjs-2';

export default function Visualization({ data, status, finalData, finalOpt, type }) {
    // const [chartData, setChartData] = useState(null);
    useEffect(() => {
        const preview = document.getElementById('preview-content')
        preview.style.display = 'flex'
        console.log('DATOS FINALES PARA EL GRÁFICO:', finalData, finalOpt);
    }, [finalData, finalOpt, data])

    const showTable = () => {
        const table = document.getElementById('preview-table');
        table.style.display = 'flex';
        const grafico = document.getElementById('preview-graph');
        grafico.style.display = 'none';
    };

    const showGraphic = () => {
        const table = document.getElementById('preview-table');
        table.style.display = 'none';
        const grafico = document.getElementById('preview-graph');
        grafico.style.display = 'flex';
    };

    return (
        <section className="visualization" style={{ minWidth: '100%', minHeight: '100%', flex: 1 }}>
            <div className="preview"
                style={{ minHeight: '60%', backgroundColor: 'lightgray', padding: '5px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <button className='button' onClick={showTable}>Show Table</button>
                    <button className='button' onClick={showGraphic}>Show Graphic</button>
                    {/* <label>Select time</label>
                    <select>
                        <option>Tiempo1</option>
                        <option>Tiempo2</option>
                        <option>Tiempo3</option>
                    </select> */}
                </div>
                <div className="preview-content" id='preview-content' style={{ display: 'none', minHeight: '100%', backgroundColor: '#ffffff', borderRadius: '5px' }}>
                    <div className="preview-table" id="preview-table" style={{ height: '100%', margin: 'auto' }}>
                        <table style={{ border: '1px solid black', margin: '10px auto' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid red' }}>
                                    {data && data.length > 0
                                        ?
                                        Object.keys(data[0]).map(colName => (
                                            <th key={colName} style={{ border: '1px solid black', margin: '10px auto', padding: '0.5em' }}>{colName}</th>
                                        ))
                                        : <th>Error: Datos no disponibles</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0
                                    ? data.map((row, rowIndex) => (
                                        <tr key={rowIndex} style={{ borderBottom: '1px solid black', margin: '10px auto' }}>
                                            {Object.entries(row).map(([key, value], colIndex) => (
                                                <td key={key} style={{ border: '1px solid black', margin: '10px auto', textAlign: 'center', padding: '0.5em' }}>
                                                    {key === 'tiempo' && typeof value === 'object' && value instanceof Date
                                                        ? `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()} ${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`
                                                        : value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                    : <tr><td>No hay datos disponibles que coincidan con la búsqueda</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className="preview-graph" id="preview-graph" style={{ display: 'none', minHeight: '50vh', minWidth: '100%' }}>
                        {finalData && <Grafico data={finalData} options={finalOpt} type={type}></Grafico>}
                    </div>
                </div>
            </div>
        </section>
    );
}
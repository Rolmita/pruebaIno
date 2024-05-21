import { useState, useEffect } from 'react';
import Grafico from './Grafico';
import { Line } from 'react-chartjs-2';

export default function Visualization({ data, status, finalData, finalOpt, type }) {
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        console.log('DATOS FINALES PARA EL GRÁFICO:', finalData);
    }, [finalData])

    //TODO: ESTO VIENE DE LOS FORMULARIOS DE LAS PESTAÑAS DE ABAJO (hay que pasarselo a esta page)

    const chartOpt = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
            tooltip: { // para mostrar los datos
                enabled: true,
            }
        },
        scales: {
            // x: {
            //     axis: 'x',
            //     type: 'time',
            //     alignToPixels: false,
            //     backgroundColor: 'white',
            //     border: {
            //         display: true,
            //         color: 'black',
            //         width: 1,
            //         dash: [],
            //         dashOffset: 0.0,
            //         z: 0,
            //     },
            //     display: 'auto',
            //     grid: {
            //         circular: false,
            //         color: 'black',
            //         display: true,
            //         drawOnChartArea: true,
            //         drawTicks: true,
            //         lineWidth: 1,
            //         offset: false,
            //         tickColor: 'black',
            //         tickLength: 8,
            //         tickWidth: 1,
            //         z: -1,
            //     },
            //     reverse: false,
            //     stacked: false,
            //     // suggestedMax: 500,
            //     // suggestedMin: 0,
            //     ticks: {
            //         backdropColor: 'green',
            //         backdropPadding: 1,
            //         display: true,
            //         color: 'yellow',
            //         // font: 'Arial',
            //         major: false,
            //         padding: 1,
            //         showLabelBackdrop: true,
            //         textStrokeColor: 'orange',
            //         textStrokeWidth: 1,
            //         z: 0,
            //         callback: function (value) {
            //             const minutes = String(new Date(value).getMinutes()).padStart(2, '0')
            //             const hours = String(new Date(value).getHours()).padStart(2, '0')
            //             if (minutes % 5 === 0)
            //                 return `${hours}:${minutes}`;
            //         }
            //     },
            //     time: {
            //         parser: 'YYYY-MM-DDTHH:mm:ss',
            //         unit: 'minute',
            //         displayFormats: {
            //             // hour: 'HH:mm',
            //             minute: 'HH:mm',
            //             // stepSize: 5, // Establecer el tamaño del paso a 5 minutos
            //         },
            //         // minUnit: 'minute', // Especifica la unidad mínima de tiempo que se debe usar
            //         // autoSkip: true, // Permite el salto automático de las marcas de tiempo si hay muchas de ellas
            //         tooltipFormat: 'dd-MM-yyyy HH:mm',
            //     },

            // },
            // y: {
            //     type: 'linear',
            //     beginAtZero: false,
            // }
        },
    };

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
        <section className="visualization" style={{ minWidth: '100%' }}>
            <div className="preview" style={{ minHeight: '100%', backgroundColor: 'lightgrey' }}>
                <div>
                    <button onClick={showTable}>Show Table</button>
                    <button onClick={showGraphic}>Show Graphic</button>
                    <label>Select time</label>
                    <select>
                        <option>Tiempo1</option>
                        <option>Tiempo2</option>
                        <option>Tiempo3</option>
                    </select>
                </div>
                <div className="preview-content" style={{ minHeight: '100%', backgroundColor: 'white' }}>
                    <div className="preview-table" id="preview-table" style={{ border: '1px solid black', height: '100%' }}>
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
                    <div className="preview-graph" id="preview-graph" style={{ display: 'none' }}>
                        {finalData && <Grafico data={finalData} options={chartOpt} type={type}></Grafico>}
                    </div>
                </div>
            </div>
        </section>
    );
}
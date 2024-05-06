import { useState, useEffect } from 'react';
import Grafico from './Grafico';

export default function Visualization({ data }) {
    const [chartData, setChartData] = useState(null);

    // TODO: QUE MUESTRE CORRECTAMENTE EL GRAFICO DE LINEA (TIEMPO EN EL EJE X Y DATO EN EL Y)
    useEffect(() => {
        if (data) {
            const labels = [];
            const datasets = [];

            data.forEach(row => {
                Object.entries(row).forEach(([key, value]) => {
                    if (value instanceof Date) {
                        labels.push(value);
                    } else {
                        const existingDatasetIndex = datasets.findIndex(dataset => dataset.label === key);
                        if (existingDatasetIndex !== -1) {
                            datasets[existingDatasetIndex].data.push(value);
                        } else {
                            datasets.push({
                                label: key,
                                data: [value]
                            });
                        }
                    }
                });
            });

            const newChartData = {
                labels: labels, //TODO: EN LOS LABELS IRIAN LOS TIEMPOS (HORAS) Y CORRESPONDERIA AL EJE X
                datasets: datasets //TODO: EN LOS DATASETS VAN LOS DATOS Y CORRESPONDE AL EJE Y
            };

            setChartData(newChartData);
            console.log('DATOS DEL GRAFICO: ', newChartData);
        }
    }, [data]);

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
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
                    unit: 'minute',
                    displayFormats: {
                        hour: 'HH:mm',
                        minute: 'HH:mm'
                    }
                }
            },
            y: {
                type: 'linear',
                beginAtZero: false,
            }
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
                                    {data && Object.keys(data[0]).map(colName => (
                                        <th key={colName} style={{ border: '1px solid black', margin: '10px auto', padding: '0.5em' }}>{colName}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((row, rowIndex) => (
                                    <tr key={rowIndex} style={{ borderBottom: '1px solid black', margin: '10px auto' }}>
                                        {Object.entries(row).map(([key, value], colIndex) => (
                                            <td key={key} style={{ border: '1px solid black', margin: '10px auto', textAlign: 'center', padding: '0.5em' }}>
                                                {key === 'tiempo' && typeof value === 'object' && value instanceof Date
                                                    ? `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()} ${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`
                                                    : value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="preview-graph" id="preview-graph">
                        {chartData && <Grafico data={chartData} options={chartOpt}></Grafico>}
                        <canvas></canvas>
                    </div>
                </div>
            </div>
        </section>
    );
}
'use client'
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables as registerablesChartJS } from 'chart.js';
import 'chartjs-adapter-date-fns'
import { useState, useEffect } from 'react'

function Grafico({ data, options, type }) {
    const [typeOfChart, setTypeOfChart] = useState(type)
    ChartJS.register(...registerablesChartJS);

    console.log('DATA DEL GRAFICO PASADO AL COMPONENTE', data, options);

    useEffect(() => {
        if (!type) {
            const typeOrder0 = data.datasets.map(dataset => dataset.type)[0];
            setTypeOfChart(typeOrder0);
        } else {
            setTypeOfChart(type);
        }
    }, [type, data]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {data && options
                ? <div style={{ width: '100%', height: '100%' }}>
                    {typeOfChart == 'line' && <Line datasetIdKey='id' data={data} options={options} style={{ width: '100%', height: '100%' }}></Line>}
                    {typeOfChart == 'pie' && <Pie datasetIdKey='id' data={data} options={options} style={{ width: '100%', height: '100%' }}></Pie>}
                    {typeOfChart == 'doughnut' && <Doughnut datasetIdKey='id' data={data} options={options} style={{ width: '100%', height: '100%' }}></Doughnut>}
                    {typeOfChart == 'bar' && <Bar datasetIdKey='id' data={data} options={options} style={{ width: '100%', height: '100%' }}></Bar>}
                </div>
                : <p>'No hay ningún gráfico para mostrar'</p>
            }
        </div>
    )
}

export default Grafico


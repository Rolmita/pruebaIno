'use client'
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables as registerablesChartJS } from 'chart.js';
import 'chartjs-adapter-date-fns'

function Grafico({ data, options, type }) {

    ChartJS.register(...registerablesChartJS);
    console.log('DATA DEL GRAFICO PASADO AL LINE', data);

    return (
        <div style={{ width: '90vw' }}>
            {data && options && type == 'line' && <Line datasetIdKey='id' data={data} options={options}></Line>}
            {data && options && type == 'pie' && <Pie datasetIdKey='id' data={data} options={options}></Pie>}
            {data && options && type == 'doughnut' && <Doughnut datasetIdKey='id' data={data} options={options}></Doughnut>}
            {data && options && type == 'bar' && <Bar datasetIdKey='id' data={data} options={options}></Bar>}
        </div>
    )
}

export default Grafico


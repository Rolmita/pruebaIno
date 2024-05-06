'use client'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables as registerablesChartJS } from 'chart.js';
import 'chartjs-adapter-date-fns'

function Grafico({ data, options }) {

    ChartJS.register(...registerablesChartJS);

    return (
        <div style={{ width: '50vw' }}>
            {data && options && <Line datasetIdKey='id' data={data} options={options}></Line>}
        </div>
    )
}

export default Grafico


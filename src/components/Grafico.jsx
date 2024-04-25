'use client'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables as registerablesChartJS } from 'chart.js';
import 'chartjs-adapter-date-fns';

function Grafico({datos, opciones}) {

    ChartJS.register(...registerablesChartJS);

    return (
        <div style={{width:'50vw'}}>
            <Line datasetIdKey='id' data={datos} options={opciones}></Line>
        </div>
    )
}

export default Grafico


import { connection1, connection2 } from "@/lib/db";
import Grafico from "../../components/Grafico";

export default async function Home() {

    let filas;
    let columnas;
    const labels = [];
    const data = [];
    let fecha;

    try {
        // Ejemplo de consulta a la primera base de datos
        const [rows1, fields1] = await connection1.query(
            `SELECT voltios, DATE_FORMAT(tiempo, '%Y-%m-%dT%H:%i:%s') AS tiempo_iso FROM prueba WHERE tiempo BETWEEN '2024-04-11 00:00:00' AND '2024-04-11 00:55:00' ORDER BY tiempo;`);
        console.log('Resultados de la primera base de datos:', rows1, fields1);

        const [rows2, fields2] = await connection2.query('SELECT * FROM prueba');
        console.log('Resultados de la segunda base de datos:', rows2, fields2);
        console.log([rows1, fields1]);

        columnas = fields1;
        filas = rows1;

        // VAMOS A INTENTAR MONTAR UN GRÁFICO DE DATOS
        filas.forEach(fila => {
            labels.push(new Date(fila[1])); // fila[1] corresponde a tiempo_iso
            data.push(fila[0]); // fila[0] corresponde a voltios
        });

        console.log(labels);
        console.log(data);


    } catch (err) {
        console.error(err);
    }

    const datos = {
        labels: labels,
        datasets: [
            {
                label: 'voltios',
                data: data
            }
        ]
    };

    const opciones = {
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
                    parser: 'YYYY-MM-DDTHH:mm:ss.SSSZ', // Especifica el formato de fecha y hora
                    unit: 'minute', // Puedes ajustar la unidad de tiempo según sea necesario
                    // 
                    displayFormats: {
                        hour: 'HH:mm', // Formato de visualización de la hora
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

    console.log(datos);

    return (
        <div>
            <h1>Consulta de datos de una tabla</h1>
            <Grafico datos={datos} opciones={opciones}></Grafico>
            <div>
                <table style={{ width: '50vw', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            {columnas.map((c, index) => (
                                <th key={index}>{c.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filas.map((f, index) => (
                            <tr>
                                <td key={f[0]}>{f[0]}</td>
                                <td key={f[1]}>{f[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



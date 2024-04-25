'use client'
// import { useState, useEffect } from 'react';
// import { openDBConnection, closeDBConnection } from '@/lib/actions';

// export default function SelectDatabase({ databases }) {
//     const [db, setDb] = useState(null);
//     let connection = null
//     //TODO: EL ERROR QUE DA ES QUE NO SE PUEDE DEVOLVER UN OBJETO DE PROMESA CUANDO ABRO CONEXION Y GUARDARLO EN UNA VARIABLE DE CLIENTE
//     useEffect(() => {
//         if (db !== null) {
//             const disconnectToDB = async () => {
//                 await closeDBConnection(connection)
//             };
//             const connectToDB = async () => {
//                 try {
//                     const dbConfig = databases.find(config => config.database == db)
//                     connection = await openDBConnection(dbConfig[0]);
//                     console.log('esta es la conexion', connection);
//                 } catch (error) {
//                     console.error('Error connecting to database:', error);
//                 }
//             };
//             if (connection != null) disconnectToDB()
//             connectToDB();
//         }
//     }, [db]);

//     const handleChange = (event) => {
//         const selectedDB = event.target.value;
//         console.log('la db selecccionada es', selectedDB);
//         setDb(selectedDB);
//     };

//     return (
//         <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
//             <label>Database name: </label>
//             <select name='database' onChange={handleChange}>
//                 <option value={null}>-- Choose a database --</option>
//                 {databases.map((db) => (
//                     <option key={db.database} value={db.database}>
//                         {db.database}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import { openDBConnection, closeDBConnection } from '@/lib/actions';

export default function SelectDatabase({ databases }) {
    const [db, setDb] = useState(null);

    useEffect(() => {
        let connection = null;

        const connectToDB = async () => {
            try {
                const dbConfig = databases.find(config => config.database === db);
                if (dbConfig) {
                    connection = await openDBConnection(dbConfig);
                    console.log('Conexión establecida:', connection);
                }
            } catch (error) {
                console.error('Error al conectar con la base de datos:', error);
            }
        };

        const disconnectFromDB = async () => {
            if (connection) {
                await closeDBConnection(connection);
                console.log('Conexión cerrada.');
            }
        };

        if (db) {
            connectToDB();
        }

        // Devolvemos una función que se ejecutará al desmontar el componente
        return () => {
            disconnectFromDB(db);
        };
    }, [db, databases]);

    const handleChange = (event) => {
        const selectedDB = event.target.value;
        console.log('Base de datos seleccionada:', selectedDB);
        setDb(selectedDB);
    };

    return (
        <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <label>Nombre de la base de datos: </label>
            <select name='database' onChange={handleChange}>
                <option value={null}>-- Elija una base de datos --</option>
                {databases.map((db) => (
                    <option key={db.database} value={db.database}>
                        {db.database}
                    </option>
                ))}
            </select>
        </div>
    );
}
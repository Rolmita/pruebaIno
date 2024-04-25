'use client'
import { useState, useEffect } from 'react';
import { openDBConnection } from '@/lib/actions';

export default function SelectDatabase({ databases }) {
    const [db, setDb] = useState(null);

    useEffect(() => {
        if (db !== null) {
            const connectToDB = async () => {
                try {
                    const dbConfig = await databases.filter(db => db.database == db)
                    await openDBConnection(dbConfig);
                    console.log('esta es la conexion', connection);
                } catch (error) {
                    console.error('Error connecting to database:', error);
                }
            };
            connectToDB();
        }
    }, [db]);

    const handleChange = (event) => {
        const selectedDB = event.target.value;
        console.log('la db selecccionada es', selectedDB);
        setDb(selectedDB);
    };

    return (
        <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <label>Database name: </label>
            <select name='database' onChange={handleChange}>
                <option value={null}>-- Choose a database --</option>
                {databases.map((db) => (
                    <option key={db.database} value={db.database}>
                        {db.database}
                    </option>
                ))}
            </select>
        </div>
    );
}

// 'use client'
// import { useState } from 'react'
// import { openDBConnection } from '@/lib/actions'

// export default function SelectDatabase({ databases }) {

//     const [db, setDb] = useState('null')
//     let connection

//     const handleChange = (event) => {
//         console.log(event.target.value);
//         setDb(event.target.value)
//         console.log(db);
//         connection = async () => { await openDBConnection(db)}
//     }

//     return (<div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
//         <label>Database name: </label>

//         <select name='database' onChange={handleChange}>
//             <option value='null'>-- Choose a database --</option>
//             {databases.map(db => (
//                 <option key={db.database} value={db}>{db.database}</option>
//             ))}
//         </select>
//     </div>
//     )

// }
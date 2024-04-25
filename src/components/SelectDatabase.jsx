
import { openDbConnection } from '@/lib/actions'
import { useState } from 'react'
import { openDBConnection } from '@/lib/actions'

export default function SelectDatabase({user}) {

    const [db, setDb] = useState('null')

    const handleChange = (event) =>{
        db = event.target.value
        openDBConnection (db);
    }



    return (<div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <label>Database name: </label>
        {/*TODO: Este select conecta a la database seleccionada */}
        <select name='database' onChange={handleChange}>
            <option  value='null'>-- Choose a database --</option>
            <option  value='db1'>DB1</option>
            <option  value='db2'>DB2</option>
            <option  value='db3'>DB3</option>
        </select></div>
    )

}
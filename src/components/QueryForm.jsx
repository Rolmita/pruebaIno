'use client'
import { useState, useEffect } from 'react';
import { setQueryResult } from '@/lib/queryResult';
import { searchTables, searchColumns, createQuery, executeQuery } from '@/lib/db-actions';

function QueryForm({ databases , onQueryResult}) {
    const [db, setDb] = useState(null);
    const [tables, setTables] = useState(null)
    const [table, setTable] = useState(null)
    const [columns, setColumns] = useState(null)
    const [columnsCount, setColumnsCount] = useState(2)
    const [numColumns, setNumColumns] = useState([])
    const [query, setQuery] = useState(null)
    const [queryResults, setQueryResults] = useState(null)
    const [formData, setFormData] = useState(null);
    const [buttonName, setButtonName] = useState('View query')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            setFormData(formData)
            const query = await createQuery(formData);
            setQuery(query)
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
        }
    };

    const handleButtonChange = () => {
        (buttonName == 'View query') ? setButtonName('Run query') : setButtonName('View query')
    }

    const handleDbChange = (event) => {
        const selectedDB = event.target.value;
        console.log('Base de datos seleccionada:', selectedDB);
        setDb(selectedDB);
    };

    const handleTableChange = (event) => {
        const selectedTable = event.target.value;
        console.log('Tabla seleccionada:', selectedTable);
        setTable(selectedTable);
    };

    const handleAddSelect = () => {
        setColumnsCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        async function fetchResult() {
            try {
                if (formData !== null) {
                    const formDataEntries = formData.entries();
                    const formDataArray = Array.from(formDataEntries);
                    const lastPair = formDataArray.pop();
                    const lastValue = lastPair[1];
                    if (query != null && lastValue !== '') {
                        console.log(query, formData);
                        const result = await executeQuery(databases, formData)
                        setQueryResults(result)
                        onQueryResult(result);
                        console.log(result);
                    }
                }

            } catch (error) {
                console.error('Error al obtener el resultado de la consulta:', error);
            }
        }
        fetchResult();
    }, [query, formData]); //

    useEffect(() => {
        async function fetchData() {
            try {
                if (columnsCount != null) {
                    setNumColumns([...Array(columnsCount)]);
                }
                if (db != null) {
                    setTables(await searchTables(db));
                    console.log('tablas', tables);
                }
                if (table != null) {
                    setColumns(await searchColumns(db, table));
                    console.log('columnas', columns);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [columnsCount, db, table]);

    useEffect(() => {
        if (query !== null) {
            document.getElementById('query-area').value = query;
        }
    }, [query]);

    return (
        <div className="tab-content">
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <label>Nombre de la base de datos: </label>
                    <select name='database' onChange={handleDbChange}>
                        <option value={null}>-- Elija una base de datos --</option>
                        {databases
                            ? (Object.keys(databases).map(dbName => (
                                <option key={dbName} value={dbName}>
                                    {dbName}
                                </option>
                            )))
                            : ''}
                    </select>
                </div>

                <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}><label>Table name: </label>
                    <select name='table' onChange={handleTableChange}>
                        <option value='null'>-- Choose a table --</option>
                        {tables != null && Object.keys(tables).map(index => (
                            <option key={tables[index].TABLE_NAME} value={tables[index].TABLE_NAME}>
                                {tables[index].TABLE_NAME}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <label>Columns: </label>
                    {numColumns.map((_, index) => (
                        <select name='column' key={index}>
                            <option value='null'>-- Choose a column --</option>
                            {columns != null && Object.keys(columns).map(index => (
                                <option key={columns[index].COLUMN_NAME} value={columns[index].COLUMN_NAME}>
                                    {columns[index].COLUMN_NAME}
                                </option>
                            ))}
                        </select>
                    ))}

                    <input name='all-columns' type='checkbox' value='*'></input>
                    <label>All columns</label>
                </div>

                <div>
                    <button type="button" onClick={handleAddSelect}>Add column</button>
                </div>
                <textarea name='query-area' id='query-area' defaultValue={query}></textarea>
                <button type='submit' onClick={handleButtonChange}>{buttonName}</button>
            </form>
        </div>
    )
}

export default QueryForm
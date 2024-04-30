'use client'
import { useState, useEffect } from 'react';
import { searchTables, searchColumns, createQuery } from '@/lib/db-actions';

function QueryForm({ databases, children }) {
    const [db, setDb] = useState(null);
    const [tables, setTables] = useState(null)
    const [table, setTable] = useState(null)
    const [columns, setColumns] = useState(null)
    const [columnsCount, setColumnsCount] = useState(2)
    const [numColumns, setNumColumns] = useState([])

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
        async function fetchData() {
            try {
                setNumColumns([...Array(columnsCount)])
                console.log(columnsCount);
            } catch (error) {
                console.error('Error al establecer la conexión con la base de datos:', error);
            }
        }
        fetchData();
    }, [columnsCount]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (db != null) {
                    setTables(await searchTables(db));
                    console.log('tablas', tables);
                }
            } catch (error) {
                console.error('Error al establecer la conexión con la base de datos:', error);
            }
        }
        fetchData();
    }, [db]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (table != null) {
                    setColumns(await searchColumns(db, table));
                    console.log('columnas', columns);
                }
            } catch (error) {
                console.error('Error al establecer la conexión con la base de datos:', error);
            }
        }
        fetchData();
    }, [table]);

    return (
        <div className="tab-content">
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="form-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <label>Nombre de la base de datos: </label>
                    <select name='database' onChange={handleDbChange}>
                        <option value={null}>-- Elija una base de datos --</option>
                        {Object.keys(databases).map(dbName => (
                            <option key={dbName} value={dbName}>
                                {dbName}
                            </option>
                        ))}
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
                {children}
            </form>
        </div>
    )
}

export default QueryForm
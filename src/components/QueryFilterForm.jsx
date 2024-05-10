import React, { useEffect, useState } from 'react';
import { searchColumnType } from '@/lib/db-actions';


//TODO: AL USAR BETWEEN EL VALOR QUE SE GUARDA LLEVA UN AND AL FINAL: ARREGLAR ESTO: 
// {
//     "column": "tiempo",
//     "operator": "BETWEEN",
//     "value": "2024-04-11T13:44 AND 2024-04-11T00:44 AND "
// }
const QueryFilterForm = ({ columns, onFilter, db, table }) => {
    const [filters, setFilters] = useState([]);
    const [logicalOperators, setLogicalOperators] = useState([])
    const [queryFilter, setQueryFilter] = useState('')
    const [columnTypes, setColumnTypes] = useState([])

    const removeFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
        if (filters.length == 0) {
            setFilters([])
            setQueryFilter('')
        }
        setColumnTypes(columnTypes.filter((_, i) => i !== index))
        if (columnTypes.length == 0) setColumnTypes([])
        setLogicalOperators(logicalOperators.filter((_, i) => i !== (index - 1)));
    };

    const addFilter = () => {
        setFilters([...filters, { column: '', operator: '', value: '' }]);
        setColumnTypes([...columnTypes, { column: '', type: '' }]);
        setLogicalOperators([...logicalOperators, 'AND']);
    };

    const handleColumnType = async (db, table, column) => {
        const type = await searchColumnType(db, table, column)
        return type
    }

    const handleFilterChange = async (index, key, value) => {
        setFilters(
            filters.map((filter, i) => (i === index ? { ...filter, [key]: value } : filter))
        );
        if (key == 'column') {
            const type = await handleColumnType(db, table, value)
            setColumnTypes(columnTypes.map((columnType, i) => (i === index ? { ...columnType, [key]: value, type: type, } : columnType)))
        }
    };

    const handleAddBetween = (index, key, value) => {
        const filterValue = filters[index].value + value
        setFilters(
            filters.map((filter, i) => (i === index ? { ...filter, [key]: filterValue } : filter))
        );
    }

    const handleLogicalOperatorChange = (index, value) => {
        setLogicalOperators(
            logicalOperators.map((operator, i) => (i === index ? value : operator))
        );
    };

    function verificarParentesis(filter) {
        let contadorParentesis = 0;
        for (let i = 0; i < filter.length; i++) {
            if (filter[i] === '(') {
                contadorParentesis++;
            } else if (filter[i] === ')') {
                contadorParentesis--;
            }
            if (contadorParentesis < 0) false;
        }
        return contadorParentesis === 0;
    }

    useEffect(() => {
        let filter = ''
        let quote = "";
        if (filters.length > 0) {
            for (let i = 0; i < filters.length; i++) {
                //TODO: añadir otros tipos de dato que tambien llevan comillas
                columnTypes[i].type.length > 0 && columnTypes[i].type[0].DATA_TYPE == 'datetime' ? quote = "'" : quote = ""
                i == 0 ? filter = `WHERE ${filters[i].column} ${filters[i].operator} ${quote}${filters[i].value}${quote}`
                    : filter += ` ${logicalOperators[i - 1]} ${filters[i].column} ${filters[i].operator} ${quote}${filters[i].value}${quote}`
            }
            verificarParentesis(filter) ? filter : filter += ' )'
            console.log(filters);
            console.log(logicalOperators);
        }
        setQueryFilter(filter)
    }, [filters, logicalOperators],)

    useEffect(() => {
        console.log(queryFilter);
        onFilter(queryFilter);
    }, [queryFilter])

    useEffect(() => {
        console.log(columnTypes);
    }, [columnTypes])

    return (
        <div>
            <button type='button' onClick={() => addFilter()}>Añadir filtro</button>
            {filters.map((filter, index) => (
                <div key={index}>
                    {index > 0 && (
                        <select name={`logical-operator-${index}`} value={logicalOperators[index - 1]}
                            onChange={(e) => handleLogicalOperatorChange(index - 1, e.target.value)}>
                            <option value="AND">AND</option>
                            <option value="AND (">AND &#40;</option>
                            <option value=") AND">&#41; AND</option>
                            <option value="OR">OR</option>
                            <option value="OR (">OR &#40;</option>
                            <option value=") OR">&#41; OR</option>
                            <option value="NOT">NOT</option>
                        </select>
                    )}
                    <select name={`column-${index}`} value={filter.column}
                        onChange={(e) => handleFilterChange(index, 'column', e.target.value)}>
                        <option value="">-- Choose a column --</option>
                        {columns && Object.keys(columns).map((index) => (
                            <option key={columns[index].COLUMN_NAME} value={columns[index].COLUMN_NAME}>
                                {columns[index].COLUMN_NAME}
                            </option>
                        ))}
                    </select>
                    <select name={`operator-${index}`} value={filter.operator}
                        onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}>
                        <option value="">-- Choose an operator --</option>
                        <option value="=">&#61;</option>
                        <option value="!=">&#33;&#61;</option>
                        <option value=">">&#62;</option>
                        <option value="<">&#60;</option>
                        <option value=">=">&#62;&#61;</option>
                        <option value="<=">&#60;&#61;</option>
                        <option value="BETWEEN">BETWEEN</option>
                        <option value="NOT BETWEEN">NOT BETWEEN</option>
                        <option value="IS NULL">NOT BETWEEN</option>
                        <option value="IS NOT NULL">IS NOT BETWEEN</option>
                    </select>

                    {columnTypes.length > 0 && columnTypes[index].type.length > 0 && columnTypes[index].type[0].DATA_TYPE == 'datetime'
                        ? (
                            <div>
                                <input type='datetime-local' name={`value-${index}`} value={filter.value}
                                    onChange={(e) => handleFilterChange(index, 'value', e.target.value)} />
                                {filters[index].operator == 'BETWEEN' &&
                                    <input type='datetime-local' name={`value-${index}`} value={filter.value}
                                        onChange={(e) => handleAddBetween(index, 'value', ` AND ${e.target.value}`)} />
                                }
                            </div>
                        )
                        : <input type="text" name={`value-${index}`} value={filter.value}
                            onChange={(e) => handleFilterChange(index, 'value', e.target.value)} />
                    }


                    <button type="button" onClick={() => removeFilter(index)}>Eliminar filtro</button>
                </div>
            ))}
        </div>
    )
}

export default QueryFilterForm;
import React, { useEffect, useState } from 'react';
import { searchColumnType } from '@/lib/db-actions';

// TODO: MEJORAR CSS
// TODO: FILTRAR POR HORA Y FILTRAR POR DÍA??
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
        setFilters([...filters, {
            column: '',
            operator: '',
            value: '',
            value2: '',
            interval: {
                type: '',
                modifiedColumn: '',
                operator: '',
                time1: '',
                time2: '',
                date: '',
            }
        }]);
        setColumnTypes([...columnTypes, { column: '', type: '' }]);
        setLogicalOperators([...logicalOperators, 'AND']);
    };

    const handleColumnType = async (db, table, column) => {
        const type = await searchColumnType(db, table, column)
        return type
    }

    const handleFilterChange = async (index, key, value) => {
        if (key == 'operator') {
            setFilters(filters.map((filter, i) => (i === index ? {
                ...filter, [key]: value, ['interval']: {
                    ['type']: '',
                    ['modifiedColumn']: '',
                    ['operator']: '',
                    ['time1']: '',
                    ['time2']: '',
                    ['date']: '',
                }
            } : filter)))
            if (value == 'IS NULL' || value == 'IS NOT NULL') {
                setFilters(
                    filters.map((filter, i) => (i === index ? { ...filter, [key]: value, ['value']: '', ['value2']: '' } : filter))
                )
            }
        } else if (key == 'interval.type') {
            setIntervalValue(value, index)
        } else {
            setFilters(
                filters.map((filter, i) => (i === index ? { ...filter, [key]: value } : filter))
            );
        }
        if (key == 'column') {
            const type = await handleColumnType(db, table, value)
            setColumnTypes(columnTypes.map((columnType, i) => (i === index ? { ...columnType, [key]: value, type: type, } : columnType)))
        }
    };

    const handleLogicalOperatorChange = (index, value) => {
        setLogicalOperators(
            logicalOperators.map((operator, i) => (i === index ? value : operator))
        );
    };

    const timeIntervalFilter = (index, value, modifiedColumn, operator, time1, time2, date) => {
        setFilters(
            filters.map((filter, i) => (i === index ? {
                ...filter, ['operator']: '', ['value']: '', ['value2']: '', ['interval']: {
                    ['type']: value,
                    ['modifiedColumn']: modifiedColumn,
                    ['operator']: operator,
                    ['time1']: time1,
                    ['time2']: time2,
                    ['date']: date,
                }
            } : filter))
        );
    }

    const setIntervalValue = (value, index) => {
        const column = filters[index].column
        let operator = '', time1 = '', time2 = '', modifiedColumn = '', date = ''
        switch (value) {
            case 'last4h':
                modifiedColumn = column
                operator = '>='
                time1 = 'DATE_SUB(NOW(), INTERVAL 4 HOUR)'
                break
            case 'last6h':
                modifiedColumn = column
                operator = '>='
                time1 = 'DATE_SUB(NOW(), INTERVAL 6 HOUR)'
                break
            case 'last8h':
                modifiedColumn = column
                operator = '>='
                time1 = 'DATE_SUB(NOW(), INTERVAL 8 HOUR)'
                break
            case 'last12h':
                modifiedColumn = column
                operator = '>='
                time1 = 'DATE_SUB(NOW(), INTERVAL 12 HOUR)'
                break
            case 'last24h':
                modifiedColumn = column
                operator = '>='
                time1 = 'DATE_SUB(NOW(), INTERVAL 24 HOUR)'
                break
            case '6to18':
                operator = 'BETWEEN'
                modifiedColumn = `DATE_FORMAT(${column},'%H:%i')`
                time1 = "'06:00'"
                time2 = "'18:00'"
                date = `AND DATE(${column}) = CURDATE()`
                break
            case '8to20':
                operator = 'BETWEEN'
                modifiedColumn = `DATE_FORMAT(${column},'%H:%i')`
                time1 = "'08:00'"
                time2 = "'20:00'"
                date = `AND DATE(${column}) = CURDATE()`
                break
            case '0to24':
                operator = 'BETWEEN'
                modifiedColumn = `DATE_FORMAT(${column},'%H:%i')`
                time1 = "'00:00'"
                time2 = "'23:59'"
                date = `AND DATE(${column}) = CURDATE()`
        }
        timeIntervalFilter(index, value, modifiedColumn, operator, time1, time2, date)
    }

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
        const regex = /.*DATE.*/
        if (filters.length > 0) {
            for (let i = 0; i < filters.length; i++) {
                //TODO: añadir otros tipos de dato que tambien llevan comillas
                columnTypes[i].type.length > 0 && columnTypes[i].type[0].DATA_TYPE == 'datetime' && !regex.test(filters[i].interval.modifiedColumn) && !regex.test(filters[i].interval.time1) ? quote = "'" : quote = ""

                const basicFilter = `${filters[i].interval.modifiedColumn.length > 0 ? filters[i].interval.modifiedColumn : filters[i].column} 
                ${filters[i].interval.operator.length > 0 ? filters[i].interval.operator : filters[i].operator} 
                ${quote}${filters[i].interval.time1.length > 0 ? filters[i].interval.time1 : filters[i].value}${quote}`

                const intervalFilter = `${basicFilter} AND ${quote}${filters[i].interval.time2.length > 0 ? filters[i].interval.time2 : filters[i].value2}${quote} 
                ${filters[i].interval.date.length > 0 ? filters[i].interval.date : ''}`

                if (filters[i].operator == 'BETWEEN' || filters[i].interval.operator == 'BETWEEN'
                    || filters[i].operator == 'NOT BETWEEN' || filters[i].interval.operator == 'NOT BETWEEN') {
                    i == 0
                        ? filter = `WHERE ${intervalFilter}`
                        : filter += ` ${logicalOperators[i - 1]} ${intervalFilter}`

                } else if (filters[i].operator == 'IS NULL' || filters[i].operator == 'IS NOT NULL') {
                    i == 0 ? filter = `WHERE ${filters[i].column} ${filters[i].operator}`
                        : filter += ` ${logicalOperators[i - 1]} ${filters[i].column} ${filters[i].operator}`
                } else {
                    i == 0
                        ? filter = `WHERE ${basicFilter}`
                        : filter += ` ${logicalOperators[i - 1]} ${basicFilter}`
                }
            }
            verificarParentesis(filter) ? filter : filter += ' )'
            const oneLine = filter.replace(/\s+/g, ' ');
            filter = oneLine
        }
        setQueryFilter(filter)
        console.log(filters);
        console.log(filter);

    }, [filters, logicalOperators],)

    useEffect(() => {
        onFilter(queryFilter);
    }, [queryFilter])

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
                    {filters[index].column && (
                        <div>
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
                                <option value="IS NULL">IS NULL</option>
                                <option value="IS NOT NULL">IS NOT NULL</option>
                            </select>
                            {/* // && (columnTypes.length > 0
                                //     && columnTypes[index].type.length > 0 */}
                            {(filters[index].operator.length > 0
                                && columnTypes[index].type[0].DATA_TYPE === 'datetime'
                                && filters[index].operator != 'IS NULL' && filters[index].operator != 'IS NOT NULL')

                                ? <div>
                                    <input type='datetime-local' name={`value-${index}`} value={filter.value}
                                        onChange={(e) => handleFilterChange(index, 'value', e.target.value)} />
                                    {(filters[index].operator === 'BETWEEN' || filters[index].operator === 'NOT BETWEEN') &&
                                        <input type='datetime-local' name={`value2-${index}`} value={filter.value2}
                                            onChange={(e) => handleFilterChange(index, 'value2', e.target.value)} />
                                    }
                                </div>
                                : <div>
                                    {filters[index].operator == 'IS NULL' || filters[index].operator == 'IS NOT NULL'
                                        ? <input type="hidden" name={`value-${index}`} value=''
                                            onChange={(e) => handleFilterChange(index, 'value', e.target.value)} />
                                        : <div>
                                            <input type="text" name={`value-${index}`} value={filter.value}
                                                onChange={(e) => handleFilterChange(index, 'value', e.target.value)} />
                                            {(filters[index].operator === 'BETWEEN' || filters[index].operator === 'NOT BETWEEN') &&
                                                <input type="text" name={`value-${index}`} value={filter.value2}
                                                    onChange={(e) => handleFilterChange(index, 'value2', e.target.value)} />
                                            }</div>
                                    }
                                </div>
                            }
                        </div>
                    )}

                    {
                        columnTypes.length > 0 && columnTypes[index].type.length > 0
                            && columnTypes[index].type[0].DATA_TYPE === 'datetime'
                            ? <select name={`interval-type-${index}`} value={filter.interval.type}
                                onChange={(e) => handleFilterChange(index, 'interval.type', e.target.value)}>
                                <option value="">-- Choose an interval of time --</option>
                                <option value="last4h">Last 4 hours</option>
                                <option value="last6h">Last 6 hours</option>
                                <option value="last8h">Last 8 hours</option>
                                <option value="last12h">Last 12 hours</option>
                                <option value="last24h">Last 24 hours</option>
                                <option value='6to18'>From 6:00 to 18:00</option>
                                <option value='8to20'>From 8:00 to 20:00</option>
                                <option value='0to24'>From 00:00 to 24:00</option>
                            </select>
                            : ''
                    }

                    <button type="button" onClick={() => removeFilter(index)}>Eliminar filtro</button>
                </div>
            ))}
        </div>
    )
}

export default QueryFilterForm;
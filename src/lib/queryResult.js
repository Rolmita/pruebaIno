// queryResult.js
let queryResult = '';

export const setQueryResult = (result) => {
    queryResult = result;
};

export const getQueryResult = () => {
    return queryResult;
};
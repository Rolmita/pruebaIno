// db.js
import mysql from 'mysql2/promise'



// Configuración de la primera base de datos
const dbConfig1 = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pruebainoelec',
  supportBigNumbers: true,
  bigNumberStrings: false,
  decimalNumbers: true,
  dateStrings: true,
  rowsAsArray: true,
};

const dbConfig2 = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pruebainoelec',
  supportBigNumbers: true,
  bigNumberStrings: false,
  decimalNumbers: true,
  dateStrings: true,
  rowsAsArray: false,
};

// supportBigNumbers: true, // representacion numeros grandes de forma segura en lugar se strings
//   bigNumberStrings: false, // los numeros grandes no se devuelven como cadena de caracteres, sino como strings
//   decimalNumbers: true, // los valores numericos se tratan como decimales en lugar de numeros con coma flotante de doble precision
//   dateStrings: true, // las fechas se manejan como cadenas en lugar de objetos date de javascript
//   rowsAsArray: true, //los resultados de consultas se devuelven como matrices y no como objetos
//   clientFlags: mysql.constants.Client.MULTI_STATEMENTS | mysql.constants.Client.MULTI_RESULTS, //multiples declaraciones en una sola llamada y recepcion de multiples resultados de consulta 

// Crear las conexiones a las bases de datos
const connection1 = await mysql.createConnection(dbConfig1);
const connection2 = await mysql.createConnection(dbConfig2);

console.log('ESTA ES LA CONF DE LA CONEXION 1', connection1.config);
console.log('ESTA ES LA CONF DE LA CONEXION 2', connection2.config);

export { connection1, connection2 }
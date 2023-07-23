// Dependencias
const mysql = require('mysql');
const { promisify } = require('node:util');

// Importamos
const keys = require('./keys');

// Creamos la conexion
const connection = mysql.createConnection(keys);
connection.connect((err) => {
    if (err) {
        console.error('No se pudo conectar con la base de datos');
        throw err;
    }
});

// Convertimos query en una promesa
connection.query = promisify(connection.query);

module.exports = connection;

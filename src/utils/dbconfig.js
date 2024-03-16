const sql = require("mssql");

const config = {
    server: '192.168.1.91',
    port: 64088,
    database: 'ADMINISTRACION_CLIENTES',
    user: 'sa',
    password: 'ALEKZANDER2002',
    trustServerCertificate: true
};

const pool = new sql.ConnectionPool(config);

pool.connect().then(() => {
    console.log('Connected to MSSQL database');
}).catch(err => {
    console.error('Error connecting to MSSQL database:', err);
});

module.exports = {pool};

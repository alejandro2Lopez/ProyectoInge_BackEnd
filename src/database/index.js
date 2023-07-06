const sql = require('mssql');
const debug = require("debug")("app:module-Database");
const { Config } = require('../config/index');

// Consultar a una base de datos.
const resultsql = (sqlQuery) => {
    console.log(sqlQuery);
    const config = {
        user: 'UsuarioTest',  //Hay que crear el usurio con acceso a la base de datos sql(barbershop)
        password: '18765432', //ponerle la contrasenna
        server: 'localhost',
        database: 'barbershop',

        port: 2711,
        options: {
            trustServerCertificate: true
        }
    };

    return new Promise((resolve, reject) => {
        sql.connect(config).then(pool => {
            return pool.request().query(`EXECUTE ${sqlQuery}`);
        }).then(result => {
            resolve(result.recordset);
        
        }).catch(err => {
            reject(err);
            
        });
    });
};

module.exports.BDService = {
    resultsql,
};



module.exports = {
    resultsql
};
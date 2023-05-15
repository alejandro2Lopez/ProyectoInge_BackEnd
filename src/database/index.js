const mysql = require('mysql2');
const debug = require("debug")("app:module-Database");

const { Config } = require('../config/index');



//Consultar a una base de datos.
const resultsql = (sql) => {
    let con = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "barbershop",
        port: 3306,
    });
    return new Promise((resolve, reject) => {

        con.query(`CALL ${sql}`, function (err, result, fields) {
            if (err) {
                reject(err);
                con.end();

            } else {
                resolve(result[0]);
                con.end();

            };

        })

    });
};

module.exports.BDService = {
    resultsql,
};

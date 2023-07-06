const createError = require('http-errors');
//Metodo que envia las respuestas al frontEnd
module.exports.Response = {
    success: (res, status = 200, message = "OK", body = {}) => {
        res.status(status).send({ message, data: body });
    },

    error: (res, error = '') => {
      
        res.send(error);
    }

}
const express = require('express');
const router = express.Router();
const { CitasController } = require('./controller');

module.exports.CitasAPI = (app) => {
  router
    .get('/citasdeusuario/:id', CitasController.getDatebyUser)


    
    .get('/citasbarbero/:id', CitasController.getManageDatebyBarber)



    .get('/:id', CitasController.getCitas)//Se utiliza para concatenar
    //Se utiliza para concatenargetDatebyUser)
    .post('/', CitasController.confirmDate)
    .delete('/citasdeusuario/:id', CitasController.deletedate)


  app.use('/api/citas', router)
}
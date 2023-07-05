const express = require('express');
const router = express.Router();
const { CitasController } = require('./controller');

module.exports.CitasAPI = (app) => {
  router
    .get('/citasdeusuario/:id', CitasController.getDatebyUser)
    .get('/citasbarbero/:id', CitasController.getManageDatebyBarber)
    .get('/userAttendaceDetail/:id', CitasController.getUserAttendaceDetail)
    .get('/horaCita', CitasController.getHoraCita)
    .get('/users', CitasController.getUsers)
    .get('/:id', CitasController.getCitas)
    

    .post('/', CitasController.confirmDate)
    .post('/reservar', CitasController.book)

    .put('/ausenciadelcliente/:id', CitasController.withoutAssistance)
    .put('/presenciadelcliente/:id', CitasController.withAssistance)

    .delete('/citasdeusuario/:id', CitasController.deletedate)


  app.use('/api/citas', router)
}
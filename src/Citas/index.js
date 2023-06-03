const express = require('express');
const router = express.Router();
const { CitasController } = require('./controller');

module.exports.CitasAPI = (app) => {
  router
    .get('/', CitasController.getCitas)//Se utiliza para concatenar
    .get('/:id', CitasController.getCitas)//Se utiliza para concatenar
    .post('/', CitasController.confirmDate)


  app.use('/api/citas', router)
}
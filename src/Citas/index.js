const express = require('express');
const router = express.Router();
const { CitasController } = require('./controller');

module.exports.CitasAPI = (app) => {
    router
    .get('/', CitasController.getCitas)//Se utiliza para concatenar
    //.post('/signup',UsersController.registerUser)
    //.post('/login',UsersController.loginUser)
    
    app.use('/api/citas', router)
  }
const express = require('express');
const router = express.Router();
const { UsersController } = require('./controller');


module.exports.UsersAPI = (app) => {
  router
  .get('/', UsersController.getUsers)//Se utiliza para concatenar
  .get('/recuperarContrasenna/:id', UsersController.recoveryPass)
  
  .post('/signup',UsersController.registerUser)
  .post('/login',UsersController.loginUser)
  .post('/changePassword',UsersController.changePassword)
  
  app.use('/api/users', router)
}
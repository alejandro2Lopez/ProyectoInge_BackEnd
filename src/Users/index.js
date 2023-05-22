const express = require('express');
const router = express.Router();
const { UsersController } = require('./controller');


module.exports.UsersAPI = (app) => {
  router
  .get('/', UsersController.getUsers)//Se utiliza para concatenar
  .post('/signup',UsersController.registerUser)
  .post('/login',UsersController.loginUser)
  
  app.use('/api/users', router)
}
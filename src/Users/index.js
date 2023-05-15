const express = require('express');
const router = express.Router();
const { UsersController } = require('./controller');


module.exports.UsersAPI = (app) => {
  router.get('/', UsersController.getUsers)//Se utiliza para concatenar
 
 
  app.use('/api/users', router)
}
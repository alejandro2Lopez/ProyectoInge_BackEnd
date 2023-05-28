const express = require('express')
const debug = require('debug')('app:main')
const { Config } = require('./src/config')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { UsersAPI } = require('./src/Users')
const {CitasAPI} = require('./src/Citas')

app.use(bodyParser.urlencoded({ extend: true }))
app.use(cors())
app.use(bodyParser.json())

app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`)
});
UsersAPI(app)
CitasAPI(app)
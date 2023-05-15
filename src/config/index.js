require('dotenv').config()

module.exports.Config = {
  port: process.env.PORT,
  db_user: process.env.USER_DB,
  db_password: process.env.PASSWORD_DB,
  db_name: process.env.NAME_DB
}

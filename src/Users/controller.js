const { Response } = require("../common/response");
const { resultsql } = require("../database");
const bcrypt = require("bcrypt");


module.exports.UsersController = {
    getUsers: (req, res) => {
        try {
            resultsql("getUsers").then((result) => {
             //   console.log(result);
                Response.success(res, 200, "Lista de usuarios", result);
            }
            ).catch((message) => {
                console.log(message);
            });
        } catch (err) {
            console.log(err);
        }
    },
    registerUser: (req, res) => {
        const { body } = req
        const verify = [];
        var con = 0;
        resultsql("getUsers").then((result) => {
            for (let index = 0; index < result.length; index++) {
            //    console.log(result[index].email)
                if (result[index].numeroTelefonico === body.numberphone) {
                    verify[con] = "numero telefonico repetido";
                    con++;
                }
                if (result[index].email === body.email) {
                    verify[con] = "email igual";
                    con++;
                }
            }



            if (verify.length > 0) {
                Response.error(res, verify);
            }
            else {
                resultsql(`insert_User '${body.username}', '${body.password}', '${body.numberphone}', '${body.email}' `);
                resultsql(`getUserId`).then((result) => {
               //    console.log(result);
                    Response.success(res, 200, "registrado", result);
                }
                ).catch((message) => {
                    console.log(message);
                });

            }
        })
            .catch((message) => {
                console.log(message);
            });


    },
    loginUser: (req, res) => {
        const { body } = req;
        resultsql(`getUser '${body.email}' `).then((result) => {
          //  console.log(result)
            if (result[0] != undefined && (result[0].contrasennia == body.password.toString())) {
                data = {
                    idperson: result[0].idPersona,
                    username: result[0].nombreUsuario,
                    email: result[0].email,
                    role: result[0].descripcion,
                    numberPhone: result[0].numeroTelefonico
              
                }
                Response.success(res, 200, "Loggeado", data);
            } else {
                Response.success(res, 200, "Usuario no loggeado", "Usuario o contraseña incorrecta");
            }
        }).catch((message) => {
            console.log(message);
        });
    }

}



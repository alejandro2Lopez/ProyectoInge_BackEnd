const { Response } = require("../common/response");
const { BDService } = require("../database")
const bcrypt = require("bcrypt");

module.exports.CitasController = {
    getCitas: (req, res) => {
        try {
            BDService.resultsql("getCitas()").then((result) => {
                console.log(result);
                Response.success(res, 200, "Citas Registradas", result);
            }
            ).catch((message) => {
                console.log(message);
            });
        } catch (error) {
            console.log(error);
        }
    }
}
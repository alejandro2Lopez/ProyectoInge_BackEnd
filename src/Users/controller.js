const { Response } = require("../common/response");
const { BDService } = require("../database")

module.exports.UsersController = {
    getUsers:  (req, res) => {
        try {
            BDService.resultsql("getUsers()").then((result) => {
                console.log(result);
                Response.success(res, 200, "Lista de productos", result);
            }
            ).catch((message) => {
                console.log(message);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

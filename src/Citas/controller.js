const { Response } = require("../common/response");
const { resultsql } = require("../database")
const bcrypt = require("bcrypt");

module.exports.CitasController = {
    getCitas: (req, res) => {
        const { params } = req
        data = params.id.split(',');
        console.log(data)
        try {
            resultsql(`getHoursDatesByDateByBarber '${data[2]}',${data[0]}`).then((result) => {
                console.log(result.length);
                const fecha = new Date();
                console.log(` Dia ${fecha.getDate()}`);
                resultsql("getHoursDate").then((hour) => {

                    if (result.length <= 0) {
                        Response.success(res, 200, "Citas Registradas", hour);
                    } else {
                        result.sort((x, y) => x.idHoraCita - y.idHoraCita);
                        //  if (data[1] === 1 || data[0] === 2) {

                        for (var index1 = 0; index1 < hour.length; index1++) {

                            for (let index2 = 0; index2 < result.length; index2++) {
                                if (hour[index1].idHoraCita === result[index2].idHoraCita) {
                                    hour[index1].HoraCita = "Ocupado";
                                }

                            }
                            //    }

                            // } else {
                            //   for (var index1 = 0; index1 < hour.length - 1; index1++) {
                            //
                            //                              for (let index2 = 0; index2 < result.length; index2++) {
                            //                                if (hour[index1 + 1].idHoraCita === result[index2].idHoraCita) {
                            //                                  hour[index1].HoraCita = "Ocupado";
                            //                                hour[index1 + 1].idHoraCita = "Ocupado"
                            //                              index1++;
                            //                        }

                            //                  }
                            //            }
                        }
                        Response.success(res, 200, "Citas Registradas", hour);
                    }

                }
                ).catch((message) => {
                    console.log(message);
                });

            }
            ).catch((message) => {
                console.log(message);
            });
        } catch (error) {
            console.log(error);
        }
    }
}
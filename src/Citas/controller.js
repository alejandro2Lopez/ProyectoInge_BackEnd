const { Response } = require("../common/response");
const { resultsql } = require("../database")
const moment = require("moment");
const { Service } = require('../Citas/service')
const { Email } = require("../common/emai");

module.exports.CitasController = {
    getCitas: (req, res) => {
        const { params } = req
        data = params.id.split(',');
        try {
            resultsql(`getHoursDatesByDateByBarber '${data[2]}',${data[0]}`).then((result) => {
                resultsql(`getHoursDate '${data[2]}'`).then((hour) => {
                    const fecha = new Date();
                    var now = moment().format("YYYY-M-D");
                    if (result.length <= 0) {

                        if (data[2] == now) {
                            hour = Service.getAvaibleHours(hour, fecha);
                        }
                        Response.success(res, 200, "Citas Registradas", hour);

                    } else {
                        result.sort((x, y) => x.idHoraCita - y.idHoraCita);
                        if (parseInt(data[1]) === 1 || parseInt(data[1]) === 2) {
                            for (var index1 = 0; index1 < hour.length; index1++) {
                                for (let index2 = 0; index2 < result.length; index2++) {
                                    if (hour[index1].idHoraCita === result[index2].idHoraCita) {
                                        hour[index1].HoraCita = "Ocupado";
                                    }

                                }
                            }
                            if (data[2] == now) {
                                hour = Service.getAvaibleHours(hour, fecha);
                            }
                            Response.success(res, 200, "Citas Registradas", hour);
                        } else {
                            for (var index1 = 0; index1 < hour.length; index1++) {
                                for (let index2 = 0; index2 < result.length; index2++) {
                                    if (hour[index1].idHoraCita === result[index2].idHoraCita) {
                                        hour[index1].HoraCita = "Ocupado";
                                    }

                                }
                            }
                            for (var index1 = 0; index1 < hour.length; index1++) {

                                if (index1 > 1 && index1 <= 11) {
                                    if (hour[index1].HoraCita === "Ocupado") {
                                        hour[index1 - 1].HoraCita = "Ocupado"


                                    }
                                }
                                else if (index1 >= 12 && index1 <= hour.length) {
                                    if (hour[index1].HoraCita === "Ocupado") {
                                        hour[index1 - 1].HoraCita = "Ocupado";

                                    }
                                }
                            }
                            for (var index1 = 0; index1 < hour.length; index1++) {


                                if (index1 === 0 && hour[(index1 + 1)].HoraCita === "Ocupado") {
                                    hour[index1].HoraCita = "Ocupado";
                                } else if (index1 > 1 && index1 <= 11) {
                                    if (hour[(index1 + 1)].HoraCita === "Ocupado" && hour[(index1 - 1)].HoraCita === "Ocupado") {
                                        hour[index1].HoraCita = "Ocupado";
                                    }

                                } else if (index1 > 12 && index1 < hour.length - 1) {
                                    if (hour[(index1 + 1)].HoraCita === "Ocupado" && hour[(index1 - 1)].HoraCita === "Ocupado") {
                                        hour[index1].HoraCita = "Ocupado";
                                    }

                                    for (var index1 = 0; index1 < hour.length; index1++) {
                                        if (index1 < 11) {
                                            if (hour[index1].HoraCita !== "Ocupado") {
                                                hour[index1 + 1].HoraCita = "Ocupado";

                                            }
                                        }
                                        if (index1 >= 12 && index1 < hour.length - 1) {
                                            if (hour[index1].HoraCita !== "Ocupado") {
                                                hour[index1 + 1].HoraCita = "Ocupado";

                                            }
                                        }

                                        if (index1 === 11 && hour[index1 - 1].HoraCita === "Ocupado") {
                                            hour[index1].HoraCita = "Ocupado";

                                        }
                                        console.log(index1)
                                        if (index1 === hour.length - 1 && hour[index1 - 1].HoraCita === "Ocupado") {
                                            hour[index1].HoraCita = "Ocupado";

                                        }
                                    }

                                }

                            }

                            if (data[2] == now) {
                                hour = Service.getAvaibleHours(hour, fecha);

                            }

                            Response.success(res, 200, "Citas Registradas", hour);
                        }

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
    },
    confirmDate: (req, res) => {
        const { body } = req;
        if (body.hairCut == 1 || body.hairCut == 2) {
            resultsql(`insert_Date '${body.barber}',${body.client},${body.hourid},'${body.date}',${body.hairCut}`).then((result) => {
                Response.success(res, 200, "Citas Registradas", "Su cita ha sido agendada con éxtio");
                //  Email.sendEmail(body.email, `Su cita para el barbero será en la fecha ${body.date} a las ${body.hour} `, 'Confirmación de Cita',)

            }).catch((message) => {
                console.log(message);
            });

        } else {
            try {
                resultsql(`insert_Date '${body.barber}',${body.client},${body.hourid},'${body.date}',${body.hairCut}`)
                resultsql(`insert_Date '${body.barber}',${body.client},${(body.hourid + 1)},'${body.date}',${body.hairCut}`)

                //Email.sendEmail(body.email, `Su cita para el barbero será en la fecha ${body.date} a las ${body.hour} `, 'Confirmación de Cita',)
                Response.success(res, 200, "Citas Registradas", "Su cita ha sido agendada con éxtio");
            } catch (message) {
                Response.success(res, 200, "Citas Registradas", "Su cita no ha sido agendada con éxtio");
            }

        }
    },
    deletedate: (req, res) => {
        const { params } = req
        data = params.id.split(",");
        resultsql(`deleteDateForUser ${data[0]},${data[1]},'${data[2]}'`)
        Response.success(res, 200, "Cita eliminada", "Su cita ha sido eliminada con éxito");
    },
    getDatebyUser: (req, res) => {
        const { params } = req;
        resultsql(`getDatebyUser ${params.id}`).then((result) => {
            result = Service.cancelDates(result);
            Response.success(res, 200, "Citas Registradas", result);
        }).catch((message) => {
            console.log(message);
        });

    },

    getManageDatebyBarber: (req, res) => {
        const { params } = req;
        data = params.id.split(',');
        resultsql(`getManageDatebyBarber ${data[0]},'${data[1]}'`).then((result) => {
            result = Service.cancelDates(result);
            Response.success(res, 200, "Citas Registradas", result);
        }).catch((message) => {
            console.log(message);
        });

    }
}
const { Response } = require("../common/response");
const { resultsql } = require("../database")
const moment = require("moment")
var nodemailer = require('nodemailer');

module.exports.CitasController = {
    getCitas: (req, res) => {
        const { params } = req
        data = params.id.split(',');
        console.log(data)
        try {
            resultsql(`getHoursDatesByDateByBarber '${data[2]}',${data[0]}`).then((result) => {
                console.log(result.length);
                const fecha = new Date();
                console.log(` Dia ${moment().format('LT').substring(0, 1)}`);
                console.log(fecha.getHours().toString().substring(0, 1))
                resultsql(`getHoursDate '${data[2]}'`).then((hour) => {

                    if (result.length <= 0) {
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
                            Response.success(res, 200, "Citas Registradas", hour);
                        } else {
                            console.log(result)

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
                                else if (index1 >= 12 && index1 <= 31) {
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

                                } else if (index1 > 12 && index1 < 31) {
                                    if (hour[(index1 + 1)].HoraCita === "Ocupado" && hour[(index1 - 1)].HoraCita === "Ocupado") {
                                        hour[index1].HoraCita = "Ocupado";
                                    }

                                    for (var index1 = 0; index1 < hour.length; index1++) {
                                        if (index1 < 11) {
                                            if (hour[index1].HoraCita !== "Ocupado") {
                                                hour[index1 + 1].HoraCita = "Ocupado";

                                            }
                                        }


                                        if (index1 >= 12 && index1 < 31) {
                                            if (hour[index1].HoraCita !== "Ocupado") {
                                                hour[index1 + 1].HoraCita = "Ocupado";

                                            }
                                        }

                                        if (index1 === 11 && hour[index1 - 1].HoraCita === "Ocupado") {
                                            hour[index1].HoraCita = "Ocupado";

                                        }
                                        if (index1 === 31 && hour[index1 - 1].HoraCita === "Ocupado") {
                                            hour[index1].HoraCita = "Ocupado";

                                        }
                                    }

                                }

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
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'correo',
                pass: 'password'
            }
        });

        const { body } = req;
        if (body.hairCut == 1 || body.hairCut == 2) {
            resultsql(`insert_Date '${body.barber}',${body.client},${body.hourid},'${body.date}',${body.hairCut}`).then((result) => {
                Response.success(res, 200, "Citas Registradas", "Su cita ha sido agendada con éxtio");

            }).catch((message) => {
                console.log(message);
            });
            var mailOptions = {
                from: 'correo',
                to: 'ale1jandro.lopez@gmail.com',
                subject: 'Confirmación de Cita',
                text: `Su cita para el barbero será en la fecha ${body.date} a las ${body.hour} `
            };

            /* transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Email sent: ' + info.response);
                  }
              });*/
        } else {
            try {
                resultsql(`insert_Date '${body.barber}',${body.client},${body.hourid},'${body.date}',${body.hairCut}`)
                resultsql(`insert_Date '${body.barber}',${body.client},${(body.hourid + 1)},'${body.date}',${body.hairCut}`)
                var mailOptions = {
                    from: 'correo',
                    to: 'ale1jandro.lopez@gmail.com',
                    subject: 'Confirmación de Cita',
                    text: `Su cita para el barbero será en la fecha ${body.date} a las ${body.hour} `
                };

                /*   transporter.sendMail(mailOptions, function (error, info) {
                       if (error) {
                           console.log(error);
                       } else {
                           console.log('Email sent: ' + info.response);
                       }
                   });*/
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

            const fecha = new Date();
            var now = moment().format("YYYY-MM-DD");
            for (let index = 0; index < result.length; index++) {
                var hora = parseInt(result[index].HoraCita.toString().split(':')[0]);
                if (result[index].HoraCita.toString().substring(result[index].HoraCita.toString().length - 2, result[index].HoraCita.toString().length) === "pm") {
                    hora = (parseInt(result[index].HoraCita.toString().split(':')[0]) + 12);
                    console.log(hora)
                }

                console.log(now == result[index].fecha.toISOString().substring(0, 10));
                if ((fecha.getHours() + 2) >= hora &&
                    now == result[index].fecha.toISOString().substring(0, 10)) {
                    result[index].cancelar = 0

                }
            }
            Response.success(res, 200, "Citas Registradas", result);



        }).catch((message) => {
            console.log(message);
        });

    },

    getManageDatebyBarber: (req, res) => {
        const { params } = req;
        data = params.id.split(',');
        console.log(`'${data[0]}',${data[1]}`)
        resultsql(`getManageDatebyBarber ${data[0]},'${data[1]}'`).then((result) => {
            const fulldate = new Date().toISOString().slice(0, 10);
            const fecha = new Date();
           
            for (let index = 0; index < result.length; index++) {
                var hora = 0;
                if (result[index].HoraCita.toString().substring(result[index].HoraCita.toString().length - 2, result[index].HoraCita.toString().length) === "pm") {
                    hora = (parseInt(result[index].HoraCita.toString().split(':')[0]) + 12);
                    console.log(hora)
                }

                if ((fecha.getHours() + 2) > hora &&
                    fulldate == result[index].fecha.toISOString().substring(0, 10)) {
                    result[index].cancelar = 0

                } if (fulldate == result[index].fecha.toISOString().substring(0, 10) && parseInt(result[index].HoraCita.toString().split(':')[0]) == 1
                    && moment().format('LT').split(':')[0] == 11) {
                    result[index].cancelar = 0


                }
            }
            Response.success(res, 200, "Citas Registradas", result);



        }).catch((message) => {
            console.log(message);
        });

    }
}
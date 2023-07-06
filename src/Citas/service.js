const moment = require("moment");
module.exports.Service = {
    getAvaibleHours: (hour = [], fecha) => {

        for (let index = 0; index < hour.length; index++) {
            var hora = parseInt(hour[index].HoraCita.toString().split(':')[0]);
            if (hour[index].HoraCita.toString().substring(hour[index].HoraCita.toString().length - 2, hour[index].HoraCita.toString().length) === "pm") {
                hora = (parseInt(hour[index].HoraCita.toString().split(':')[0]) + 12);

            }
            if (fecha.getHours() > hora) {

                hour[index].HoraCita = "Ocupado";
            }
            if (hour[index].HoraCita != "Ocupado") {
                if (fecha.getHours() == hora && parseInt(hour[index].HoraCita.toString().split(':')[1].substring(0, 2)) <= parseInt(fecha.getMinutes())) {
                    hour[index].HoraCita = "Ocupado";
                }
            }
        }

        return hour
    },

    cancelDates: (result) => {

        const fulldate = new Date().toISOString().slice(0, 10);
        const date = new Date();
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var Today = year + '-' + month + '-' + day;
        console.log("HOY ES " + Today)
        for (let index = 0; index < result.length; index++) {
            var hora = result[index].HoraCita.toString().split(':')[0];
            if (result[index].HoraCita.toString().substring(result[index].HoraCita.toString().length - 2, result[index].HoraCita.toString().length) === "pm") {
                hora = (parseInt(result[index].HoraCita.toString().split(':')[0]) + 12);
            }
            console.log("LA HORA ES " + result[index].HoraCita.toString().split(':')[1].substring(0, 3) + "  " + date.getMinutes())
            if (parseInt(date.getHours() + 2) > hora &&
                Today == result[index].fecha.toISOString().substring(0, 10)) {
                    result[index].cancelar = 0;
                    hora = 0;



            } if (Today == result[index].fecha.toISOString().substring(0, 10) && parseInt(result[index].HoraCita.toString().split(':')[0]) == 1
                && moment().format('LT').split(':')[0] == 11) {
                result[index].cancelar = 0;
                hora = 0;
            }

        }
        return result;
    },

}
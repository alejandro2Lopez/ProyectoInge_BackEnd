module.exports.Service = {
    getAvaibleHours: (hour = [], fecha) => {

        for (let index = 0; index < hour.length; index++) {
            var hora = parseInt(hour[index].HoraCita.toString().split(':')[0]);
            if (hour[index].HoraCita.toString().substring(hour[index].HoraCita.toString().length - 2, hour[index].HoraCita.toString().length) === "pm") {
                hora = (parseInt(hour[index].HoraCita.toString().split(':')[0]) + 12);

            }
            if (fecha.getHours() > hora) {
                console.log(11 == hora && parseInt(hour[index].HoraCita.toString().split(':')[1].substring(0, 2)));

                hour[index].HoraCita = "Ocupado";
            }

            if (fecha.getHours() == hora && parseInt(hour[index].HoraCita.toString().split(':')[1].substring(0, 2)) <= fecha.getMinutes) {
                hour[index].HoraCita = "Ocupado";
            }

        }
        return hour
    },

    cancelDates: (result) => {

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
        return result;
    },
    sendEmail: () => {


    }

}
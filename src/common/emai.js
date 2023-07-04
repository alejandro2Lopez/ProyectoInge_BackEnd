var nodemailer = require('nodemailer');
module.exports.Email = {

    sendEmail: (message, email,subject) => {

        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'pruebasBarberApp@hotmail.com',
                pass: 'BarberApp'
            }
        });

        var mailOptions = {
            from: 'pruebasBarberApp@hotmail.com',
            to: email,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(message + '.........'+email+ '.........'+subject);
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
var nodemailer = require('nodemailer'); 
// Modulo para enviar correos si necesario
module.exports.Email = {

    sendEmail: (message, email,subject) => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jansc7@gmail.com',
                pass: 'gpfhjiisimboxvkv'
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
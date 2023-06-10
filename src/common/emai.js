var nodemailer = require('nodemailer');
module.exports.Email = {

    sendEmail: (message, email,subject) => {

        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'correo',
                pass: 'password'
            }
        });

        var mailOptions = {
            from: 'correo',
            to: email,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}
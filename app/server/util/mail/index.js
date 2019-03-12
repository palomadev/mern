const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
require('dotenv').config()
const { SMTP_ACCESS } = process.env;
const transporter = nodemailer.createTransport(SMTP_ACCESS);
const readHTMLFile = path => new Promise(res => fs.readFile(path, { encoding: 'utf-8' }, (err, html) => res(!err ? html : undefined)));

const methods = {
    SendEmailReport: async report => {
        const html = await readHTMLFile(path.join(__dirname, '/templates/report.html'));
        const htmlRendered = mustache.render(html, report);
        let mailOptions = {
            from: '"TrueKonnect Email Report" <noreply@truekonnect.com>',
            to: 'admin@truekonnect.com, alexander.guzman@serpicodev.com',
            subject: 'Stylist Report #',
            html: htmlRendered
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) return console.log(error);
            console.log('Message sent: ' + info.response);
        });
    }
}
module.exports = methods;
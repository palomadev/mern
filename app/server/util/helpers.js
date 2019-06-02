module.exports = {
    generalError: (err, res) => {
        const data = err.code ? undefined : err.message;
        const code = err.code || 500;
        return res.status(201).json({
            status: code,
            message: err.msg || 'An error has ocurred, try again',
            data,
        });
    },
    generalSuccess: (res, message, data) => {
        return res.status(201).json({
            status: 201,
            message,
            data,
        });
    },
    initApp: async () => {
        const user = require('../models/user');
        const total = await user.getAll();
        const account = {
            role: 1,
            name: 'Super Admin',
            email: 'admin@paloma.com',
            password: '12345678',
        };
        if (total.length === 0) user.create(account);
        else console.log(total.length + ' users can login.');
        console.log(`Super admin account: ${account.email}:${account.password}`);
    },
    busboy: (callback, req) => {
        const Busboy = require('busboy');
        const midleware = new Busboy({ headers: req.headers });
        midleware.on('finish', () => {
            const merge = { ...req.body, ...req.files };
            callback(merge);
        });
        req.pipe(midleware);
    },
    keepsAwakeHeroku: async (interval = 300000) => {
        const http = require('http');
        //in order to make this works, run this command: heroku labs:enable runtime-dyno-metadata -a <app name>
        const { HEROKU_APP_NAME } = process.env;
        if (HEROKU_APP_NAME) {
            const url = `http://${HEROKU_APP_NAME}.herokuapp.com/`;
            console.log('Starting url and interval: ', url, interval);
            setInterval(() => http.get(url, null, e => console.log('called: ', url)), interval);
        } else console.log('Heroku APPNAME not found: ', HEROKU_APP_NAME);
    },
};

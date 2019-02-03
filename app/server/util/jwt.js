const jwt = require('jsonwebtoken');
const helpers = require('./helpers');
require('dotenv').config()
const { JWT_KEY } = process.env;
const OPTIONS = { expiresIn: "30d" };

const methods = {
    sign: data => jwt.sign(data, JWT_KEY, OPTIONS),
    verify: (token, callback) => jwt.verify(token, JWT_KEY, callback),
    verifyHelper: (req, res, next) => {
        const token = req.body.token || req.headers['authorization'];
        if (token)
            jwt.verify(token, JWT_KEY, (err, decoded) => {
                if (err) helpers.generalError({ code: 403, msg: 'Failed to authenticate token.' }, res);
                else {
                    req.decoded = decoded;
                    req.body.auth = { userId: decoded.userId };
                    next();
                }
            });
        else return helpers.generalError({ code: 403, msg: 'Authentication Required' }, res);
    }
}

module.exports = methods;
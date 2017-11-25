/**
 * Created by on 11/4/17.
 */
const authorization = require("../logic/auth/tokenAuth");
const tokenAuth = require("../logic/auth/tokenAuth");

exports.getToken = (req, res) => {
    authorization.authorizeUser(req.body, (response) => {
        res.send(response);
    });
};

exports.isBearerAuthenticated = (req, res, next) => {
    tokenAuth.validateToken(req.headers.authorization, (isValid, info) => {
        if (isValid) {
            next();
        } else {
            res.status(401);
            res.send(info);
        }
    });
};
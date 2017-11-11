/**
 * Created by on 11/4/17.
 */
const passport = require("passport")
const authorization = require("../logic/auth/tokenAuth")

exports.getToken = (req, res) => {
    authorization.authorizeUser(req.body, (response) => {
        res.send(response)
    })
}

exports.isBearerAuthenticated = passport.authenticate("bearer", {session: false})
/**
 * Created by on 11/4/17.
 */

const passport = require("passport")
const BearerStrategy = require("passport-http-bearer").Strategy
const authorization = require("../logic/authorization")

exports.getToken = (req, res) => {
    res.send(authorization.authorizeUser(req.body))
}

passport.use(new BearerStrategy((accessToken, callback) => {
    if (accessToken === "xyzzzzztoken") {
        callback(null, {name: "aname", data: "adata"}, { scope: "*" })
    } else {
        callback(null, false)
    }
}))


exports.isBearerAuthenticated = passport.authenticate("bearer", {session: false})
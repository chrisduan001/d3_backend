/**
 * Created by on 11/4/17.
 */
// const User = require("../data_access/mongo_schemas/userSchema")
const passport = require("passport")
const BearerStrategy = require("passport-http-bearer").Strategy

// exports.getToken = (req, res) => {
//     // const {id, password} = req.body
//     // User.findOne({_id: id})
//     //     .then((user) => {
//     //         user.verifyPassword(password, function(result) {
//     //             if (result) {
//     //                 res.send({result: "successful"})
//     //             } else {
//     //                 res.send({result: "failed"})
//     //             }
//     //         })
//     //     })
//
//     res.send("xyzzzzz token")
// }

exports.getToken = (req, res) => {
    res.send("xyzzzzz token")
}

// passport.use(new BearerStrategy((accessToken, callback) => {
//     if (accessToken === "xyzzzzz token") {
//         callback(null, {name: "aname", data: "adata"}, { scope: "*" })
//     } else {
//         callback(null, false)
//     }
// }))

// passport.use(new BearerStrategy(
//     (accessToken, callback) => {
//         callback(null, {}, { scope: "*" })
//     }
// ))

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        callback(null, {}, { scope: "*" })
    }
));


exports.isBearerAuthenticated = passport.authenticate("bearer", {session: false})
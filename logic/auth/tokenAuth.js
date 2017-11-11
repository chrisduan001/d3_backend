/**
 * Created by on 11/8/17.
 */
const User = require("../../data/mongo_schemas/userSchema")
const errorEntity = require("../../data/entity/errorEntity").errorEntity
const passport = require("passport")
const BearerStrategy = require("passport-http-bearer").Strategy

exports.authorizeUser = ({email, password}, callback) => {
    User.findOne({email: email})
        .then((user) => {
            if (!user) {
                callback(errorEntity.userAuthError)

                return
            }
            user.verifyPassword(password, (result) => {
                if (result) {
                    //% separates the uid from the token
                    callback({token: user._id + "%" + uid(50)})

                    return
                }

                callback(errorEntity.userAuthError)
            })
        })
        .catch(() => {
            callback(errorEntity.serverError)
        })
}

function uid(len) {
    const buf = []
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^&*()-="
    const charlen = chars.length

    for (let i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)])
    }

    return buf.join("")
}

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

passport.use(new BearerStrategy((accessToken, callback) => {
    if (accessToken === "xyzzzzztoken") {
        callback(null, {name: "aname", data: "adata"}, { scope: "*" })
    } else {
        callback(null, false)
    }
}))


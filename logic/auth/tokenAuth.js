/**
 * Created by on 11/8/17.
 */
const User = require("../../data/mongo_schemas/userSchema")
const Token = require("../../data/mongo_schemas/tokenSchema")
const errorEntity = require("../../data/entity/errorEntity").errorEntity
const passport = require("passport")
const BearerStrategy = require("passport-http-bearer").Strategy
const valueConstants = require("../../constants/valueConstants")
const bcrypt = require("bcrypt")

exports.authorizeUser = ({email, password}, callback) => {
    User.findOne({email: email})
        .then((user) => {
            if (!user) {
                callback(errorEntity.userAuthError)

                return
            }

            bcrypt.compare(password, user.password)
                .then((result) => {
                    if (result) {
                        //save token
                        //% separates the uid from the token
                        const token = user._id + "%" + uid(150)
                        const tokenSchema = new Token({token})

                        if (!user.refreshToken) {
                            user.set("refreshToken", uid(150))
                        }
                        user.token.push(tokenSchema)

                        user.save()
                            .then(callback({
                                token: tokenSchema.token,
                                "expire": valueConstants.TOKEN_EXPIRE_SECONDS
                            }))
                            .catch(() => callback(errorEntity.serverError))
                    } else {
                        callback(errorEntity.userAuthError)
                    }
                })
        })
        .catch(() => {
            callback(errorEntity.serverError)
        })
}

const uid = (len) => {
    const buf = []
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^&*-="
    const charlen = chars.length

    for (let i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)])
    }

    return buf.join("")
}

const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

passport.use(new BearerStrategy((accessToken, callback) => {
    if (accessToken === "xyzzzzztoken") {
        callback(null, {name: "aname", data: "adata"}, { scope: "*" })
    } else {
        callback(null, false)
    }
}))


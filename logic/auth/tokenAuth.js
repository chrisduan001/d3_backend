/**
 * Created by on 11/8/17.
 */
const UserDao = require("../../data/dao/userDao")
const TokenDao = require("../../data/dao/tokenDao")
const errorEntity = require("../../data/entity/errorEntity").errorEntity
const valueConstants = require("../../constants/valueConstants")
const bcrypt = require("bcrypt")
const _ = require("lodash")

exports.authorizeUser = ({email, password}, callback) => {
    UserDao.getUserByEmail(email, (user, error) => {
        if (error) {
            callback(errorEntity.userAuthError)

            return
        }

        bcrypt.compare(password, user.password)
            .then((result) => {
                if (result) {
                    const oauthToken = uid(150)
                    const refreshToken = user.refreshToken ? null : uid(150)
                    //save token
                    //generate refresh token if it is not exist
                    TokenDao.saveToken(user,
                        oauthToken,
                        refreshToken,
                        (err) => {
                            if (err) {
                                callback(errorEntity.serverError)

                                return
                            }

                            callback({
                                //token format is userid + % + token, it will be used to find token by user id
                                token: user.id + "%" + oauthToken,
                                refreshToken: user.refreshToken,
                                "expire": valueConstants.TOKEN_EXPIRE_SECONDS
                            })
                        })
                } else {
                    callback(errorEntity.userAuthError)
                }
            })
    })
}

const uid = (len) => {
    const buf = []
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~+/="
    const charlen = chars.length

    for (let i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)])
    }

    return buf.join("")
}

const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.validateToken = (token, next, callback) => {
    if (token) {
        //token format: Authorization tokendata
        try {
            const tokenData = token.split(" ")[1]
            const userId = tokenData.split("%")[0]

            UserDao.getUserById(userId, {path: "token"}, (user, error) => {
                if (error) {
                    callback(false, errorEntity.invalidTokenError)

                    return
                }

                if (_.filter(user.token, {tokenData})) {
                    if (isTokenExpired(token)) {
                        TokenDao.removeTokenById(token.id)

                        callback(true, errorEntity.expiredTokenError)
                    } else {
                        callback(true, null)
                    }
                }
            })
        } catch (err) {
            callback(false, errorEntity.invalidTokenError)
        }
    } else {
        callback(false, errorEntity.invalidTokenError)
    }
}

//visible for testing
const isTokenExpired = (token) => {
    const tokenDate = new Date(parseInt(token.id.substring(0, 8), 16))
    const currentDate = new Date()

    return tokenDate.getSeconds() + valueConstants.TOKEN_EXPIRE_SECONDS < currentDate.getSeconds()
}


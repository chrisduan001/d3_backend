/**
 * Created by on 11/8/17.
 */
const UserDao = require("../../data/dao/userDao")
const TokenDao = require("../../data/dao/tokenDao")
const valueConstants = require("../../constants/valueConstants")
const bcrypt = require("bcrypt")
const _ = require("lodash")

const {
    userAuthError,
    serverError,
    invalidTokenError
} = require("../../data/entity/errorEntity").errorEntity

exports.authorizeUser = ({email, password}, callback) => {
    UserDao.getUserByEmail(email, (user, error) => {
        if (error) {
            callback(userAuthError)

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
                        (updatedUser, err) => {
                            if (err) {
                                callback(serverError)

                                return
                            }

                            callback({
                                //token format is userid + % + token, it will be used to find token by user id
                                token: updatedUser.id + "%" + oauthToken,
                                refreshToken: updatedUser.refreshToken,
                                "expire": valueConstants.TOKEN_EXPIRE_SECONDS
                            })
                        })
                } else {
                    callback(userAuthError)
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

exports.validateToken = (token, callback) => {
    if (token) {
        //token format: Authorization Bearer tokendata
        try {
            const {1: tokenData} = token.split(" ")
            const {0: userId} = tokenData.split("%")

            UserDao.getUserById(userId, {path: "token"}, (user, error) => {
                if (error) {
                    throw error
                }

                if (_.filter(user.token, {tokenData})) {
                    callback(true, null)

                    return
                }

                throw new Error()
            })
        } catch (err) {
            callback(false, invalidTokenError)
        }
    } else {
        callback(false, invalidTokenError)
    }
}

// const isTokenExpired = (token) => {
//     const tokenDate = new Date(parseInt(token.id.substring(0, 8), 16))
//     const currentDate = new Date()
//
//     return tokenDate.getSeconds() + valueConstants.TOKEN_EXPIRE_SECONDS < currentDate.getSeconds()
// }


/**
 * Created by on 11/8/17.
 */
const User = require("../data/mongo_schemas/userSchema")
const errorCode = require("../data/entity/errorCode").errorCode
const errorMessage = require("../data/entity/errorMessage").errorMessage
const commonModel = require("./commonModel")

exports.authorizeUser = ({email, password}, callback) => {
    User.findOne({email: email})
        .then((user) => {
            if (!user) {
                callback(commonModel.errorModel(errorCode.userAuthError, errorMessage.userAuthError))

                return
            }
            user.verifyPassword(password, (result) => {
                if (result) {
                    callback(result)

                    return
                }

                callback(commonModel.errorModel(errorCode.userAuthError, errorMessage.userAuthError))
            })
        })
        .catch(() => {
            callback(Object.assign(errorCode.serverError, errorCode.serverError))
        })
}
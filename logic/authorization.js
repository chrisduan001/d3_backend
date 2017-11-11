/**
 * Created by on 11/8/17.
 */
const User = require("../data/mongo_schemas/userSchema")
const errorEntity = require("../data/entity/errorEntity").errorEntity

exports.authorizeUser = ({email, password}, callback) => {
    User.findOne({email: email})
        .then((user) => {
            if (!user) {
                callback(errorEntity.userAuthError)

                return
            }
            user.verifyPassword(password, (result) => {
                if (result) {
                    callback({token: "tokenxyzdzz"})

                    return
                }

                callback(errorEntity.userAuthError)
            })
        })
        .catch(() => {
            callback(errorEntity.serverError)
        })
}
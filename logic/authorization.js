/**
 * Created by on 11/8/17.
 */
const User = require("../data/mongo_schemas/userSchema")
const errorCode = require("../data/entity/errorCode")

export const authorizeUser = ({email, password}) => {
    User.findOne({email: email})
        .then((user) => {
            user.verifyPassword(password, function(result) {
                if (result) {
                    return {...errorCode.noError, result}
                }

                return errorCode.userAuthError
            })
        })
        .catch(() => {
            return errorCode.serverError
        })
}
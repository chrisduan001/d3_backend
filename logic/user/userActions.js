/**
 * Created by on 11/19/17.
 */
const UserDao = require("../../data/dao/userDao")
const {saveUserError, serverError} = require("../../data/entity/errorEntity").errorEntity
const _ = require("lodash")

exports.saveNewUser = (userData, callback) => {
    UserDao.saveNewUser(userData, (result, error) => {
        if (error) {
            callback(saveUserError)

            return
        }

        callback(result)
    })
}

exports.getUserByEmail = (email, callback) => {
    UserDao.getUserByEmail(email, (user, error) => {
        if (error) {
            callback(serverError)

            return
        }

        if (_.isEmpty(user)) {
            callback({})
        } else {
            callback(user)
        }
    })
}
/**
 * Created by on 11/19/17.
 */
const UserDao = require("../../data/dao/userDao")
const errorEntity = require("../../data/entity/errorEntity").errorEntity

exports.saveNewUser = (userData, callback) => {
    UserDao.saveNewUser(userData, (result, error) => {
        if (error) {
            callback(errorEntity.saveUserError)

            return
        }

        callback(result)
    })
}
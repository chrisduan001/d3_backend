/**
 * Created by on 11/23/17.
 */
const assert = require("assert")
const tokenDao = require("../../data/dao/tokenDao")
const userDao = require("../../data/dao/userDao")
const testHelper = require("../testHelpter")

describe("token dao test", () => {
    it.only("create new user with hashed password", (done) => {
        let unHashedPass = testHelper.testUser.password
        userDao.saveNewUser({...testHelper.testUser, email: "newuser@digit3.me"}, (user, error) => {
            if (error) {
                assert(false)
            } else {
                assert(unHashedPass !== user.password)
            }
            done()
        })
    })
})
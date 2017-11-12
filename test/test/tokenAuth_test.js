/**
 * Created by on 11/5/17.
 */
const assert = require("assert")
const User = require("../../data/mongo_schemas/userSchema")
const tokenAuth = require("../../logic/auth/tokenAuth")
const testHelper = require("../testHelpter")

describe("token auth test", () => {
    before((done) => {
        User.findOne({email: "test_evn@digit3.me"})
            .then((user) => {
                user.set("token", [])
                user.save()
                    .then(() => done())
            })
    })

    it("test verify user", (done) => {
        tokenAuth.authorizeUser({email: "test_evn@digit3.me", password: "admin"}, () => {
            setTimeout(() => {
                User.findOne({email: "test_evn@digit3.me"})
                    .then((user) => {
                        assert(user.refreshToken)
                        assert(user.token.length === 1)
                        done()
                    })
            }, 300)
        })
    })
})
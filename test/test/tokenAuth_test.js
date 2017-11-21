/**
 * Created by on 11/5/17.
 */
const assert = require("assert")
const User = require(".././userSchema")
const Token = require(".././tokenSchema")
const tokenAuth = require("../../logic/auth/tokenAuth")
const testHelper = require("../testHelpter")

describe("token auth test", () => {
    before((done) => {
        User.findOne({email: "test_evn@digit3.me"})
            .then((user) => {
                user.set("token", [])
                user.save()
                    .then(() => {
                        done()
                    })
            })
    })

    it("test verify user", (done) => {
        tokenAuth.authorizeUser({email: "test_evn@digit3.me", password: "admin"}, () => {
            setTimeout(() => {
                User.findOne({email: "test_evn@digit3.me"})
                    .then((user) => {
                        console.log(user)
                        assert(user.refreshToken)
                        assert(user.token.length === 1)
                        done()
                    })
            }, 300)
        })
    })

    it.only("Validate token successful", (done) => {
        insertToken((token) => {
            console.log(token)
            setTimeout(() => {
                tokenAuth.validateToken("Bearer " + token, (isSuccessful, info) => {
                    assert(isSuccessful)
                    done()
                })
            }, 300)
        })
    })

    it.skip("Validate token failed", (done) => {

    })

    it.skip("Validate token expired", (done) => {

    })

    function insertToken(callback) {
        tokenAuth.authorizeUser({email: "test_evn@digit3.me", password: "admin"}, (value) => {
            callback(value.token)
        })
    }
})
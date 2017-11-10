/**
 * Created by on 11/5/17.
 */
const server = require("../../app")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const assert = require("assert")
const testHelper = require("../testHelpter")
const errorCode = require("../../data/entity/errorCode").errorCode
const errorMessage = require("../../data/entity/errorMessage").errorMessage

chai.use(chaiHttp)

describe("Authorization", () => {
    it("/POST verify user successful", (done) => {
        const postData = {email: "test_evn@digit3.me", password: "admin"}
        chai.request(server)
            .post("/api/token")
            .send(postData)
            .end((err, res) => {
                res.should.have.status(200)
                console.log(res.body)
                // assert(res.body.errorCode === errorCode.noError.errorCode)
                done()
            })
    })

    it("/POST verify user incorrect pass", (done) => {
        const postData = {email: "test_evn@digit3.me", password: "incorrect pass"}
        chai.request(server)
            .post("/api/token")
            .send(postData)
            .end((err, res) => {
                res.should.have.status(200)
                console.log(res.body)
                // assert(res.body.errorCode === errorCode.userAuthError.errorCode)
                // assert(res.body.message === errorMessage.userAuthError.message)
                done()
            })
    })
})
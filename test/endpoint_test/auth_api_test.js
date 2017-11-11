/**
 * Created by on 11/5/17.
 */
const server = require("../../app")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const assert = require("assert")
const testHelper = require("../testHelpter")
const errorEntity = require("../../data/entity/errorEntity").errorEntity
const User = require("../../data/mongo_schemas/userSchema")

chai.use(chaiHttp)

describe("Authorization", () => {
    it("/api/token verify user successful", (done) => {
        const postData = {email: "test_evn@digit3.me", password: "admin"}
        chai.request(server)
            .post("/api/token")
            .send(postData)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.token.should.to.be.a("string")
                assert(res.body.error === undefined)
                done()
            })
    })

    it("/api/token verify user incorrect pass", (done) => {
        const postData = {email: "test_evn@digit3.me", password: "incorrect pass"}
        chai.request(server)
            .post("/api/token")
            .send(postData)
            .end((err, res) => {
                res.should.have.status(200)
                const errEntity = errorEntity.userAuthError.error
                assert(res.body.error.errorCode === errEntity.errorCode)
                assert(res.body.error.message === errEntity.message)
                done()
            })
    })

    it("/api/token verify server error", (done) => {
        const postData = {email: "test_evn@digit3.me", password: "incorrect pass"}
        User.__set__("findOne", )

        chai.request(server)
            .post("/api/token")
            .send(postData)
            .end((err, res) => {
                res.should.have.status(200)
                const errEntity = errorEntity.userAuthError.error
                assert(res.body.error.errorCode === errEntity.errorCode)
                assert(res.body.error.message === errEntity.message)
                done()
            })
    })
})
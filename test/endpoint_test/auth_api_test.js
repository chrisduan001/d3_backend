/**
 * Created by on 11/5/17.
 */
const User = require(".././mongo_schemas/userSchema")
const server = require("../../app")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const assert = require("assert")
const testHelper = require("../testHelpter")

chai.use(chaiHttp)

describe("Authorization", () => {
    it("/POST verify user", (done) => {
        const postData = {email: "", password: "xyz"}
        testHelper.createUser()
            .then(() => {
                chai.request(server)
                    .post("/api/token")
                    .send(postData)
                    .end((err, res) => {
                        res.should.have.status(200)
                        assert(res.body.result === "successful")
                        done()
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    })
})
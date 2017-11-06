/**
 * Created by on 11/5/17.
 */
const User = require("../../data_access/mongo_schemas/userSchema")
const server = require("../../app")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const assert = require("assert")

chai.use(chaiHttp)

describe("Authorization", () => {
    it("/POST verify user", (done) => {
        const userData = new User({name: "test_env_user", email: "t@me.com", password: "xyz"})
        const postData = {password: "xyz"}
        userData.save()
            .then(() => {
                postData.id = userData._id
                chai.request(server)
                    .post("/token")
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
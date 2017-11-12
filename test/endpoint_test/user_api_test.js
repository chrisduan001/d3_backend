/**
 * Created by on 11/5/17.
 */
// const User = require(".././mongo_schemas/userSchema")
// const server = require("../../app")
// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const should = chai.should()
// const assert = require("assert")
//
// chai.use(chaiHttp)
//
// describe("save user", () => {
//     it("/POST user", (done) => {
//         const userData = {name: "test01", email: "test01@me.com", password: "xyz"}
//         chai.request(server)
//             .post("/users")
//             .send(userData)
//             .end((err, res) => {
//                 res.should.have.status(200)
//                 assert(res.body.password !== "xyz")
//                 res.body._id.should.to.be.a("string")
//                 done()
//             })
//     })
//
//     it("/GET users", (done) => {
//         const userData = new User({name: "test02", email: "test01@me.com", password: "xyz"})
//         userData.save()
//             .then(() => {
//                 chai.request(server)
//                     .get("/users")
//                     .end((err, res) => {
//                         res.should.have.status(200)
//                         assert(res.body[0].name === "test02")
//                         done()
//                     })
//             })
//     })
// })

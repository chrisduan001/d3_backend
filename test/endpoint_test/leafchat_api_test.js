/**
 * Created with template on 2/16/18.
 */
const server = require("../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const _ = require("lodash");
const assert = require("assert");
const {userNameUsedError, passcodeError} = require("../../data/entity/errorEntity").errorEntity;

chai.use(chaiHttp);

describe("Leaf chat login", () => {
    it("/POST leaf chat login successful", (done) => {
        const body = {passcode: "l23fct!@#Cap", userName: "hello1"};
        chai.request(server)
            .post("/api/chatLogin")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                assert(res.body.userName === body.userName);
                done();
            });
    });

    it("/POST leaf chat login incorrect passcode", (done) => {
        const body = {passcode: "l23fct!", userName: "hello1"};
        chai.request(server)
            .post("/api/chatLogin")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                assert(_.isEqual(res.body, passcodeError));
                done();
            });
    });

    it("/POST leaf chat login duplicate user name", (done) => {
        const body = {passcode: "l23fct!@#Cap", userName: "hello1"};
        chai.request(server)
            .post("/api/chatLogin")
            .send(body)
            .end(() => {
                chai.request(server)
                    .post("/api/chatLogin")
                    .send(body)
                    .end((err, res) => {
                        assert(_.isEqual(res.body, userNameUsedError));
                        done();
                    });
            });
    });
});
/**
 * Created by on 11/5/17.
 */
const server = require("../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const assert = require("assert");
const testHelper = require("../testHelpter");
const _ = require("lodash");
const {saveUserError, userAuthError} = require("../../data/entity/errorEntity").errorEntity;

chai.use(chaiHttp);

describe("save user", () => {
    let authToken;

    before((done) => {
        const data = {email: testHelper.testUser.email, password: testHelper.testUser.password};
        chai.request(server)
            .post("/api/token")
            .send(data)
            .end((err, res) => {
                authToken = res.body.token;

                done();
            });
    });

    it("/POST user successful", (done) => {
        const userData = {name: "test01", email: "test01@me.com", password: "xyz"};
        chai.request(server)
            .post("/api/users")
            .send(userData)
            .end((err, res) => {
                res.should.have.status(200);
                assert(res.body.password !== "xyz");
                res.body._id.should.to.be.a("string");
                done();
            });
    });

    it("/Post get token failed", (done) => {
        const data = {email: testHelper.testUser.email, password: "invalid pass"};

        chai.request(server)
            .post("/api/token")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                assert(res.body.errorCode === userAuthError.errorCode);
                done();
            });
    });

    it("/POST user failed (same email address)", (done) => {
        const userData = testHelper.testUser;
        chai.request(server)
            .post("/api/users")
            .send(userData)
            .end((err, res) => {
                res.should.have.status(200);
                assert(res.body.errorCode === saveUserError.errorCode);
                done();
            });
    });

    it("/verifyEmail verify email address auth failed", (done) => {
        chai.request(server)
            .get("/api/verifyEmail?email=" + testHelper.testUser.email)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("/verifyEmail verify email address (email used)", (done) => {
        chai.request(server)
            .get("/api/verifyEmail?email=" + testHelper.testUser.email)
            .set("Authorization", "Bearer " + authToken)
            .end((err, res) => {
                res.should.have.status(200);
                assert(res.body.email === testHelper.testUser.email);
                done();
            });
    });

    it("/verifyEmail verify email address (email unused)", (done) => {
        chai.request(server)
            .get("/api/verifyEmail?email=unsed@xyz.com")
            .set("Authorization", "Bearer " + authToken)
            .end((err, res) => {
                res.should.have.status(200);
                //should return {}
                assert(_.isEmpty(res.body));
                done();
            });
    });
});

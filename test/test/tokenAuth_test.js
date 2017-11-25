/**
 * Created by on 11/21/17.
 */
const assert = require("assert");
const rewire = require("rewire");
const tokenAuth = rewire("../../logic/auth/tokenAuth");
const testHelper = require("../testHelpter");
const sinon = require("sinon");
const valueConstant = require("../../constants/valueConstants");
const errorEntity = require("../../data/entity/errorEntity").errorEntity;
const _ = rewire("lodash");

describe("token auth test", () => {
    const updateUser = (testUser) => {
        testUser.refreshToken = "refreshToken";

        return testUser;
    };

    beforeEach(() => {
        this.UserDao = {
            getUserByEmail: sinon.stub().yields(testHelper.testUser, null)
        };

        this.TokenDao = {
            saveToken: sinon.stub().yields(updateUser(testHelper.testUser), null)
        };

        tokenAuth.__set__("UserDao", this.UserDao);
        tokenAuth.__set__("TokenDao", this.TokenDao);
    });

    it("test authorize user successful", (done) => {
        this.bcrypt = {
            compare: sinon.stub().resolves(true)
        };

        tokenAuth.__set__("bcrypt", this.bcrypt);

        tokenAuth.authorizeUser({email: "test_evn@digit3.me", password: "admin"}, (result) => {
            assert(result !== undefined);
            assert(result.expire === valueConstant.TOKEN_EXPIRE_SECONDS);
            assert(result.refreshToken === "refreshToken");

            done();
        });
    });

    it("test authorize user failed", (done) => {
        tokenAuth.authorizeUser({email: "test_evn@digit3.me", password: "admin"}, (result) => {
            this.bcrypt = {
                compare: sinon.stub().resolves(false)
            };

            tokenAuth.__set__("bcrypt", this.bcrypt);

            assert(result.errorCode === errorEntity.userAuthError.errorCode);

            done();
        });
    });

    it("test validate token successful", (done) => {
        this.UserDao = {
            getUserById: sinon.stub().yields(testHelper.testUser, null)
        };
        this._ = {
            filter: sinon.stub().resolves(true)
        };

        tokenAuth.__set__("UserDao", this.UserDao);
        tokenAuth.__set__("_", this._);

        tokenAuth.validateToken("Authroization Bearer xyz%zzzz", (isValid, info) => {
            assert(info === null);
            assert(isValid);

            done();
        });
    });
});
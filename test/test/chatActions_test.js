/**
 * Created with template on 2/16/18.
 */

const assert = require("assert");
const chatActions = require("../../logic/leafChat/chatActions");
const _ = require("lodash");
const {passcodeError, userNameUsedError} = require("../../data/entity/errorEntity").errorEntity;

describe.only("chat login test", () => {
    it("test login successful", (done) => {
        const body = {passcode: "l23fct!@#Cap", userName: "hello1"};
        loginUser(body, (result) => {
            assert(result.userName  === body.userName);
            done();
        });
    });

    it("test duplicate user name", (done) => {
        const body = {passcode: "l23fct!@#Cap", userName: "user1"};

        loginUser(body, () => {
            loginUser(body, (result) => {
                assert(result === userNameUsedError);
                done();
            });
        });
    });

    it("test login with incorrect passcode", (done) => {
        const body = {passcode: "1232132321", userName: "test user"};
        loginUser(body, (result) => {
            assert(result === passcodeError);
            done();
        });
    });

    it("test leave chat", (done) => {
        const body = {passcode: "l23fct!@#Cap", userName: "t01"};
        loginUser(body, () => {
            chatActions.leaveLeafChat({userName: body.userName}, () => {
                loginUser(body, (result) => {
                    assert(result.userName === body.userName);
                    done();
                });
            });
        });
    });

    it("test get all users(No user)", (done) => {
        chatActions.getCurrentUsers((result) => {
            console.log(result);
            assert(result.users === "");
            done();
        });
    });

    it("test get all users(With users)", (done) => {
        const body = {passcode: "l23fct!@#Cap", userName: "t01"};
        const body1 = {passcode: "l23fct!@#Cap", userName: "t02"};
        loginUser(body, () => {
            loginUser(body1, () => {
                chatActions.getCurrentUsers((result) => {
                    console.log(result);
                    assert(result.users === "t01,t02");
                    done();
                });
            });
        });
    });

    const loginUser = (body, done) => {
        chatActions.loginLeafChat(body, (result) => {
            done(result);
        });
    };
});
/**
 * Created by on 11/5/17.
 */
const assert = require("assert");
const tokenDao = require("../../data/dao/tokenDao");
const userDao = require("../../data/dao/userDao");
const testHelper = require("../testHelpter");

describe("token dao test", () => {
    //exclude this test as the database was changed unexpectedly during api test
    xit("test save token", (done) => {
        userDao.getUserByEmail("test_evn@digit3.me", (user, error) => {
            if (error) {
                assert(false, error);

                return;
            }


            tokenDao.saveToken(user, "testtoken", "refreshtoken", (updatedUser, err) => {
                if (err) {
                    assert(false, err);

                    return;
                }

                assert(updatedUser.token[0].value === "testtoken");
                assert(updatedUser.refreshToken === "refreshtoken");

                done();
            });
        });
    });
});
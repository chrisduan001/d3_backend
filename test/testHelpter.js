/**
 * Created by on 11/5/17.
 */
const mongoose = require("mongoose");
const userDao = require("../data/dao/userDao");

const testUser = {
    name: "test_env_user",
    email: "test_evn@digit3.me",
    password: "admin"
};

exports.testUser = testUser;

before((done) => {
    mongoose.connect("mongodb://localhost:27017/d3_test");
    mongoose.connection.once("open", () => {
        console.log("test db connected");

        userDao.saveNewUser(testUser, (result, err) => {
            if (err) {
                console.log("User creation failed, exit test");
                return;
            }

            console.log("test user created");
            done();
        });
    });
});

after((done) => {
    const { users } = mongoose.connection.collections;
    if (!users) {
        done();

        return;
    }

    users.drop(() => {
        console.log("db dropped");
        done();
    });
});
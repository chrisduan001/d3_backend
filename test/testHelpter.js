/**
 * Created by on 11/5/17.
 */
const mongoose = require("mongoose")
const User = require("./mongo_schemas/userSchema")

before((done) => {
    mongoose.connect("mongodb://localhost:27017/d3_test")
    mongoose.connection.once("open", () => {
        console.log("test db connected")

        createUser().then(() => {
            console.log("test user created")
            done()
        })
    })
})

//clear db
beforeEach((done) => {
    const { users } = mongoose.connection.collections
    if (!users) {
        done()

        return
    }

    users.drop(() => {
        console.log("db dropped")
        done()
    })
})

function createUser() {
    const userData = new User({
        name: "test_env_user",
        email: "test_evn@digit3.me",
        password: "admin"
    })

    return userData.save()
}
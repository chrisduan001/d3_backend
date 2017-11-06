/**
 * Created by on 11/5/17.
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
    name: String,
    token: String,
    password: {
        type: String,
        required: [true, "An error has occurred, check your password"]
    },
    email: {
        type: String,
        required: [true, "email can't be null"],
        unique: [true, "email exists"]
    }
})

//note: can't use the fat error function here, won't be able to get value
UserSchema.pre("save", function(next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            next(err)

            return
        }
        this.password = hash
        next()
    })
})

const User = mongoose.model("user", UserSchema)

module.exports = User
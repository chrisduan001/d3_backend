/**
 * Created by on 11/5/17.
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    token: String,
    password: String
})

const User = mongoose.model("user", UserSchema)

module.exports = User
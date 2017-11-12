/**
 * Created by on 11/11/17.
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    }
})

const Token = mongoose.model("token", TokenSchema)
module.exports = Token
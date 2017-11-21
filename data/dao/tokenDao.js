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

//=============data access==============

exports.saveToken = (userInDb, tokenData, refreshToken, callback) => {
    if (refreshToken) {
        userInDb.set("refreshToken", refreshToken)
    }

    const tokenSchema = new Token({tokenData})
    userInDb.token.push(tokenSchema)

    userInDb.save()
        .then(() => callback(null))
        .catch(() => callback(new Error()))
}

exports.removeTokenById = (id) => {
    Token.remove({_id: id})
        .then(() => {})
        .catch(() => {})
}

module.exports = Token
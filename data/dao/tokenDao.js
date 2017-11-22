/**
 * Created by on 11/11/17.
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TokenSchema = new Schema({
    value: {
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

    const tokenSchema = new Token({value: tokenData})
    userInDb.token.push(tokenSchema)

    userInDb.save()
        .then(() => callback(userInDb, null))
        .catch(() => callback(null, new Error()))
}
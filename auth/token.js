/**
 * Created by on 11/4/17.
 */
// const oauth2Orize = require("oauth2orize")
// const cropto = require("crypto")
// const oauth_client = require("./oauth_client")

//
// const server = oauth2Orize.createServer()
//
// server.exchange(oauth2Orize.exchange.code((client, code, redirect, user, callback) => {
//     //todo.. validate
//
//     const token = {
//         value: "this is an oauth token, please save"
//     }
//
//     callback(null, token)
// }))
const express = require("express")
const router = express.Router()
const User = require("../data_access/mongo_schemas/userSchema")

router.post("/", (req, res) => {
    const {id, password} = req.body
    User.findOne({_id: id})
        .then((user) => {
            user.verifyPassword(password, function(result) {
                if (result) {
                    res.send({result: "successful"})
                } else {
                    res.send({result: "failed"})
                }
            })
        })
})

module.exports = router
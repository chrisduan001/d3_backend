const express = require("express")
const User = require("./mongo_schemas/userSchema")

/* GET users listing. */
exports.getUser = (req, res) => {
    User.find({})
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.postUser = (req, res) => {
    const user = new User({name: req.body.name, email: req.body.email, password: req.body.password})
    user.save()
        .then(() => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
}

const express = require("express")
const router = express.Router()
const User = require("../data_access/mongo_schemas/userSchema")

/* GET users listing. */
router.get("/", (req, res, next) => {
    User.find({})
        .then((users) => {
            res.send(users)
        })
})

router.post("/", (req, res) => {
    const user = new User({name: req.body.name, email: req.body.email, password: req.body.password})
    user.save()
        .then(() => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = router

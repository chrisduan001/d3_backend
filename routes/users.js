const express = require("express")
const router = express.Router()
const User = require("../data_access/mongo_schemas/userSchema")

/* GET users listing. */
router.get("/", (req, res, next) => {
    User.find({})
        .then((users) => {
            if (users.length <= 0) {
                insertUser(res)

                return
            }
            res.send(users)
        })
})

function insertUser(res) {
    const user = new User({name: "test user"})
    user.save()
        .then(() => {
            res.send([user])
        })
}

module.exports = router

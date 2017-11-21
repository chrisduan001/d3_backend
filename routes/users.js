const userActions = require("../logic/user/userActions")

/* GET users listing. */
// exports.getUser = (req, res) => {
//     userActions.findUserById(req.body, (response) => {
//         res.send(response)
//     })
// }

exports.postUser = (req, res) => {
    userActions.saveNewUser(req.body, (response) => {
        res.send(response)
    })
}

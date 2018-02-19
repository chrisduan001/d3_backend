/**
 * Created with template on 2/16/18.
 */
const chatActions = require("../logic/leafChat/chatActions");

exports.loginUser = (req, res) => {
    chatActions.loginLeafChat(req.body, (response) => {
        res.send(response);
    });
};

exports.logoutUser = (req, res) => {
    chatActions.leaveLeafChat(req.body, () => {
        res.send();
    });
};
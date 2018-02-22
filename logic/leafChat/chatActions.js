/**
 * Created with template on 2/16/18.
 */
const {userNameUsedError, passcodeError} = require("../../data/entity/errorEntity").errorEntity;
const _ = require("lodash");

const PASSCODE_VALUE = "l23fct!@#Cap";
const currentUsers = [];

exports.loginLeafChat = ({passcode, userName}, callback) => {
    if (passcode !== PASSCODE_VALUE) {
        callback(passcodeError);

        return;
    }

    if (_.find(currentUsers, (user) => user === userName)) {
        callback(userNameUsedError);

        return;
    }

    currentUsers.push(userName);

    callback({userName: userName});
};

exports.leaveLeafChat = ({userName}, callback) => {
    _.remove(currentUsers, (name) => name === userName);

    callback();
};

exports.getCurrentUsers = (callback) => {
    callback({users: _.join(currentUsers, ",")});
};
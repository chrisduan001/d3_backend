/**
 * Created with template on 1/25/18.
 */
const _ = require("lodash");

const connections = {}; //{roomNumber: [users]}

const joinRoom = (roomNumber, userName) => {
    let users = connections[roomNumber];
    users = users ? users : [];

    if (users.length >= 2) {
        return false;
    }

    users.push(userName);

    connections[roomNumber] = users;
    return true;
};

const removeUserFromRoom = (roomNumber, userName) => {
    let users = connections[roomNumber];
    _.remove(users, item => item === userName);
};

exports.socketActions = (io, socket) => {
    const {roomNumber, userName} = socket.request._query;

    if (!roomNumber || !userName) {
        socket.disconnect();
        return;
    }

    if (!joinRoom(roomNumber, userName)) {
        console.log("room full emitted");
        io.sockets.connected[socket.client.id].emit("room full");
    } else {
        socket.join(roomNumber);

        // console.log(socket.client.id + " connected");
        // console.log(socket.request._query);
    }

    socket.on("disconnect", () => {
        removeUserFromRoom(roomNumber, userName);
    });
};
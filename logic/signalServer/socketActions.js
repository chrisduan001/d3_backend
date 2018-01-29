/**
 * Created with template on 1/25/18.
 */
const _ = require("lodash");

const connections = {}; //{roomNumber: [users]}
const INIT_CALL = "init_call";
const CALL_RECEIVED = "call_received";
const ACCEPT_CALL = "accept_call";
const CALL_ACCEPTED = "call_accepted";
const SEND_SDP = "send_sdp";
const RECEIVE_SDP = "receive_sdp";
const ICE_CANDIDATE = "ice_candidate";
const RECEIVE_ICE_CANDIDATE = "receive_ice_candidate";
const SEND_MESSAGE = "send_message";
const NEW_MESSAGE = "new_message";

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

    socket.on("disconnect", () => {
        console.log(userName + " disconnected");
        removeUserFromRoom(roomNumber, userName);
    });


    if (!joinRoom(roomNumber, userName)) {
        console.log("room full emitted");
        io.sockets.connected[socket.client.id].emit("room full");

        return;
    }

    socket.join(roomNumber);

    io.to(roomNumber).emit("join room", {userName});

    socket.on(SEND_MESSAGE, (data) => {
        socket.to(data.roomNumber).emit(NEW_MESSAGE, {message: data.message});
    });

    socket.on(INIT_CALL, (data) => {
        socket.to(data.roomNumber).emit(CALL_RECEIVED);
    });

    socket.on(ACCEPT_CALL, (data) => {
        socket.to(data.roomNumber).emit(CALL_ACCEPTED);
    });

    socket.on(SEND_SDP, (data) => {
        socket.to(data.roomNumber).emit(RECEIVE_SDP, {message: data.message});
    });

    socket.on(ICE_CANDIDATE, (data) => {
        socket.to(data.roomNumber).emit(RECEIVE_ICE_CANDIDATE, {message: data.message});
    });
};
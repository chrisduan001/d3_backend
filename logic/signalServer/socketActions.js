/**
 * Created with template on 1/25/18.
 */
const _ = require("lodash");

const connections = {}; //eg: {roomNumber: [users]}
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
const GET_ROOM_INFO = "SOCKET_GET_ROOM_INFO";
const SEND_ROOM_INFO = "SOCKET_SEND_ROOM_INFO";
const USER_DISCONNECTED = "SOCKET_USER_DISCONNECTED";
const REQUEST_VOICE_CALL = "REQUEST_VOICE_CALL";
const REQUEST_VIDEO_CALL = "REQUEST_VIDEO_CALL";
const ACCEPTED_VOICE_CALL = "ACCEPTED_VOICE_CALL";
const ACCEPTED_VIDEO_CALL = "ACCEPTED_VIDEO_CALL";
const DECLINE_CALL = "DECLINE_CALL";
const CALL_DECLINED = "CALL_DECLINED";
const VOICE_CALL_RECEIVED = "VOICE_CALL_RECEIVED";
const VIDEO_CALL_RECEIVED = "VIDEO_CALL_RECEIVED";

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
        socket.to(roomNumber).emit(USER_DISCONNECTED);
    });


    if (!joinRoom(roomNumber, userName)) {
        console.log("room full emitted");
        io.sockets.connected[socket.client.id].emit("room full");

        return;
    }

    socket.join(roomNumber);

    io.to(roomNumber).emit("join room", {userName});

    socket.on(SEND_MESSAGE, (data) => {
        socket.to(roomNumber).emit(NEW_MESSAGE, {message: data.message});
    });

    socket.on(INIT_CALL, () => {
        socket.to(roomNumber).emit(CALL_RECEIVED);
    });

    socket.on(ACCEPT_CALL, () => {
        socket.to(roomNumber).emit(CALL_ACCEPTED);
    });

    socket.on(SEND_SDP, (data) => {
        console.log(roomNumber);
        socket.to(roomNumber).emit(RECEIVE_SDP, {message: data.message});
    });

    socket.on(ICE_CANDIDATE, (data) => {
        socket.to(roomNumber).emit(RECEIVE_ICE_CANDIDATE, {message: data.message});
    });

    socket.on(GET_ROOM_INFO, () => {
        io.sockets.connected[socket.client.id].emit(SEND_ROOM_INFO, {message: connections[roomNumber]});
    });
};
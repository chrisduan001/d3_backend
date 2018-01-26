/**
 * Created with template on 1/25/18.
 */
const io = require("socket.io-client");
const assert = require("assert");

describe("socket test", () => {
    let socket;
    let socket2;
    let socket3;

    const connectSocket01 = (roomNumber, shouldJoin) => {
        socket = io.connect("http://localhost:1337", {
            query: {userName: "T01", roomNumber}
        });

        socket.on("connect", () => {
        });

        socket.on("disconnect", () => {
            console.log("disconnected");
        });

        socket.on("room full", () => {
            assert(shouldJoin);
        });
    };

    const connectSocket02 = (roomNumber, shouldJoin) => {
        socket2 = io.connect("http://localhost:1337", {
            query: {userName: "T02", roomNumber}
        });

        socket2.on("connect", () => {});

        socket2.on("disconnect", () => {
            console.log("disconnected");
        });

        socket2.on("room full", () => {
            assert(shouldJoin);
        });
    };

    const connectSocket03 = (roomNumber, shouldJoin) => {
        socket3 = io.connect("http://localhost:1337", {
            query: {userName: "T03", roomNumber}
        });

        socket3.on("connect", () => {
        });

        socket3.on("disconnect", () => {
            console.log("disconnected");
        });

        socket3.on("room full", () => {
            console.log("room full socket03");
            assert(shouldJoin);
        });
    };


    it("Check room full", (done) => {
        connectSocket01("t2", false);
        connectSocket02("t2", false);
        connectSocket03("t2", true);

        setTimeout(() => {
            socket.disconnect();
            socket2.disconnect();
            socket3.disconnect();
            done();
        }, 2000);
    }).timeout(3000);

    it("Check user disconnect", (done) => {
        connectSocket01("t2", false);
        connectSocket02("t2", false);

        //disconnect user 2
        setTimeout(() => {
            socket2.disconnect();
        }, 500);

        //connect user3
        setTimeout(() => {
            connectSocket03("t2", false);
        }, 1000);

        setTimeout(() => {
            socket.disconnect();
            socket3.disconnect();
            done();
        }, 2000);
    }).timeout(3000);
});
import { io } from "socket.io-client";
var socket = io("http://localhost:3001", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
export default socket
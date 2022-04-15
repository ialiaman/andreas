import { io } from "socket.io-client";
var socket = io("http://192.163.206.200:3001", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
export default socket
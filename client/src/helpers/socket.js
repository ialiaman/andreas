import { io } from "socket.io-client";
var socket = io("192.163.206.200:3001", {
  transports: ["websocket"],
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
export default socket;

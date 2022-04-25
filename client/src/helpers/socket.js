import { io } from "socket.io-client";
var socket = io("localhost:3001", {
  // transports: ["websocket"],
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
export default socket;

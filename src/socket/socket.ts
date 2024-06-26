import { io } from "socket.io-client";
const SOCKET_URL = `http://localhost:4000/realtime-chat`;
const socket = io(SOCKET_URL, {
  query: {
    token: JSON.parse(localStorage.getItem("userAuthInfo" || "null"))
      ?.access_token,
  },
});
export default socket;

import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "";

const socket = io(SOCKET_URL, {
  query: {
    token: JSON.parse(localStorage.getItem("userAuthInfo") || "null")
      ?.access_token,
  },
});

export default socket;

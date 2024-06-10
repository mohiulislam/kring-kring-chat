import { io } from "socket.io-client";
const SOCKET_URL = `http://localhost:4000/realtime-chat`;
const socket = io(SOCKET_URL, {
  query: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGl1bGlzbGFtNUBnbWFpbC5jb20iLCJzdWIiOiI2NjYwMjdhYmE0MDgwZmRiZDM1MWYwNjYiLCJpYXQiOjE3MTc2NzgxMzAsImV4cCI6NTMxNzY3ODEzMH0.wEVAQqT143OwiBa5QTPAWYc7I3O-tx9XflQIVemL8Qw",
  },
});
export default socket;

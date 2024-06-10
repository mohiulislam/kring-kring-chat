import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import toast from "react-hot-toast";
import { useGetMessagesQuery } from "../../../lib/features/api/group/message/meessageApi";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

function ChatBox() {
  const groupId = "66604d2fecc21e0241eb5383";
  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useGetMessagesQuery({ groupId });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url('https://images.unsplash.com/photo-1516557070061-c3d1653fa646?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.default",
          height: "7vh",
          display: "flex",
          minHeight: "60px",
          alignItems: "center",
        }}
        paddingLeft={2}
      >
        <ListItemAvatar>
          <Avatar
            alt={"participantName"}
            src="https://cdn.vectorstock.com/i/1000x1000/98/45/person-gray-photo-placeholder-woman-vector-23519845.webp"
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
              }}
            >
              {"Shaila Khatun"}
            </Typography>
          }
        />
      </Box>
      <Box sx={{ paddingTop: "1vh", overflow: "auto" }}>
        <Box
          sx={{
            width: "40%",
            marginLeft: true ? "auto" : "16px",
            marginRight: true ? "16px" : "auto",
          }}
        >
          <ChatBubble
            message="Assalamualaykum."
            isSender={true}
            deliveryTime="now"
          />
        </Box>
        <Box
          sx={{
            width: "40%",
            marginLeft: false ? "auto" : "16px",
            marginRight: false ? "16px" : "auto",
          }}
        >
          <ChatBubble
            message="Walaykumus salam"
            isSender={false}
            deliveryTime="now"
          />
        </Box>
      </Box>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <ChatInput />
      </Box>
    </Box>
  );
}

export default ChatBox;

import socket from "@/socket/socket";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

// Define the ChatInput component, which takes a groupId as a prop
function ChatInput({ groupId }: { groupId: string }) {
  const [message, setMessage] = useState("");
  const sendMessage = (message: string) => {
    if (message.trim()) {
      console.log(message);

      socket.emit("message", {
        message: message,
        groupId: groupId,
      });
      setMessage("");
    }
  };
  const queryClient = useQueryClient();

  const handleSendClick = () => {
    sendMessage(message);
    queryClient.setQueryData(["messages", 1], (oldData: any) => {
      if (!oldData) return oldData;

      const updatedFirstPage = [message, ...oldData.pages[0]];

      return {
        ...oldData,
        pages: [updatedFirstPage, ...oldData.pages.slice(1)],
      };
    });
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage(message);
    }
  };

  

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Type your message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSendClick}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ChatInput;

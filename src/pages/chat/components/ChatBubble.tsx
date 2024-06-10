import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatBubbleProps {
  message: string;
  isSender: boolean;
  deliveryTime: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isSender,
  deliveryTime,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: isSender ? "primary.dark" : "background.default",
        borderRadius: "12px",
        padding: "8px 16px",
        margin: "8px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: isSender ? "flex-end" : "flex-start",
      }}
    >
      <Typography variant="body1" sx={{ color: "text.primary" }}>
        {message}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          alignSelf: "flex-end",
        }}
      >
        {deliveryTime}
      </Typography>
    </Box>
  );
};

export default ChatBubble;

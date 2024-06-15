import { Message } from "@/interfaces/interfaces";
import { getDeliveryTime } from "@/utils/getDeliveryTime";
import { Box, Typography } from "@mui/material";
import React from "react";

interface ChatBubbleProps {
  message: Message;
  won: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, won }) => {
  const deliveryTime = getDeliveryTime(message.createdAt);
  return (
    <Box
      sx={{
        backgroundColor: won ? "primary.dark" : "#474747",
        borderRadius: "12px",
        padding: "8px 16px",
        margin: "8px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: won ? "flex-end" : "flex-start",
        wordBreak: "break-word",
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: "text.primary", wordBreak: "break-word" }} // Apply wordBreak to text
      >
        {message.content}
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

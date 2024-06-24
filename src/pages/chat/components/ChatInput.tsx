import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import socket from "@/socket/socket";
import { useAuthStore } from "@/store/store";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

// Define your validation schema
const schema = yup.object({
  message: yup.string()
   .required('Message is required')
   .min(1, 'Your message must be at least 1 character long'),
}).required();

function ChatInput({ onSendMessage, groupId }: { groupId: string; onSendMessage: (any) => void; }) {
  const userId = useAuthStore((state) => state?.userAuthInfo.user._id);
  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { message: string }) => {
    console.log("Sending message:", data.message);
    
    if (data.message.trim()) {
      socket.emit("message", {
        message: data.message,
        groupId: groupId,
      });
      
      onSendMessage({
        messagesQueryKey: ["messages", { groupId: groupId, pageSize: 15 }],
        message: {
          user: userId,
          content: data.message,
          group: groupId,
          createdAt: new Date().toISOString(),
        },
      });
      reset();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Use Controller to wrap your TextField */}
      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            {...field} // Spread field props to connect input with react-hook-form
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}

export default ChatInput;

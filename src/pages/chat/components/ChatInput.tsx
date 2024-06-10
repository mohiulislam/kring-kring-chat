import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, TextField } from "@mui/material";

function ChatInput() {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Type your message here..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ChatInput;

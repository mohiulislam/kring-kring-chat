import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

import unisexAvatar from "@/assets/imgs/unisex-avatar.jpg";
import { Group } from "@/interfaces/interfaces";
import { useAuthStore, useGroupStore } from "@/store/store";

export default function ChatItem({ group }: { group: Group }) {
  const userId = useAuthStore((state) => state?.userAuthInfo.user._id);

  const participant = group.users.find((user) => user._id !== userId);

  const participantName = participant?.firstName + " " + participant?.lastName;

  const lastMessage = group?.lastMessage?.content;

  const groupId = useGroupStore((state) => state.group?._id);

  const lastMessageTime = lastMessage
    ? format(group.lastMessage.updatedAt ?? "", "M/d/yy, h:mma")
    : null;
  return (
    <ListItem
      sx={{
        width: "100%",
        borderRadius: "5px",
        backgroundColor: groupId === group._id ? "#4a4a4a" : "",
        "&:hover": {
          backgroundColor: "#4a4a4a",
        },
      }}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar alt={participantName} src={unisexAvatar} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {participantName}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {lastMessage || "Start a conversation"}
            </Typography>

            <Typography color="text.secondary" variant="caption">
              {lastMessageTime}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
}

import { Box, Grid, List, Typography } from "@mui/material";
import { useEffect } from "react";

import { useGetGroups } from "@/apiHooks/group/useGroup";
import { useGroupStore } from "@/store/store";
import socket from "../../socket/socket";
import ChatBox from "./components/ChatBox";
import ChatItem from "./components/ChatItem";

function Chat() {
  const { data: groups, error, isLoading, isError } = useGetGroups();

  const { groupId, setGroupId } = useGroupStore();

  const handleSetGroup = (groupId: string) => {
    setGroupId(groupId);
  };

  console.log(groups);

  useEffect(() => {
    if (groups) {
      groups.forEach((group) =>
        socket.emit("joinGroup", { groupId: group._id })
      );
    }
  }, [groups]);

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        xs={4}
        md={3}
        item
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                zIndex: 999,
                backgroundColor: "background.default",
                height: "7vh",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color={"text.primary"}
                sx={{ fontWeight: "semi-bold" }}
                marginLeft={4}
              >
                Chats
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                overflow: "auto",
                height: "100%",
                paddingX: 2,
              }}
            >
              <List>
                {groups?.map((group: any) => {
                  return (
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleSetGroup(group._id)}
                    >
                      <ChatItem group={group} />
                    </Box>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid sx={{ height: "100%" }} xs={8} md={9} item>
        {groupId && <ChatBox />}
      </Grid>
    </Grid>
  );
}

export default Chat;

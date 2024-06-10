import { Box, Grid, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChatItem from "./components/ChatItem";
import ChatBox from "./components/ChatBox";
import { useGetGroupsQuery } from "../../lib/features/api/group/groupsApi";
import socket from "../../socket/socket";

function Chat() {
  const { data: groups, isLoading, isError, error } = useGetGroupsQuery();
  const [group, setGroup] = useState<string | null>();

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
                    <div
                      onClick={() => {
                        setGroup(group.id);
                      }}
                    >
                      <ChatItem group={group} />
                    </div>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid sx={{ height: "100%" }} xs={8} md={9} item>
        <ChatBox />
      </Grid>
    </Grid>
  );
}

export default Chat;

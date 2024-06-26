import { Box, Grid, List, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

import { useCreateGroup, useGetGroups } from "@/apiHooks/group/useGroup";
import { Group } from "@/interfaces/interfaces";
import { useAddToContactModalStore, useGroupStore } from "@/store/store";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import socket from "../../socket/socket";
import ChatBox from "./components/ChatBox";
import ChatItem from "./components/ChatItem";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  })
  .required();
interface FormData {
  email: string;
}

function Chat() {
  const { data: groups, error, isLoading, isError } = useGetGroups();

  const { group, setGroup } = useGroupStore();

  const handleSetGroup = (group: Group) => {
    setGroup(group);
  };
  console.log(groups?.toString());

  useEffect(() => {
    if (groups) {
      groups.forEach((group) =>
        socket.emit("joinGroup", { groupId: group._id })
      );
    }
  }, [groups]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#3b3b3b",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: "12px",
  };
  const { isOpen, open, close } = useAddToContactModalStore();
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const {
    data,
    error: errorCreateGroup,
    isError: isErrorCreateGroup,
    isSuccess,
    isPending,
    mutate,
  } = useCreateGroup();

  function onSubmit(data: FormData) {
    mutate({
      participantUserName: data.email,
    });
  }

  const sortedGroups = _.orderBy(
    groups,
    [
      (group) => {
        const lastMessageDate = group?.lastMessage?.updatedAt;
        return lastMessageDate ? new Date(lastMessageDate) : new Date(0);
      },
    ],
    ["desc"]
  );

  return (
    <Grid container style={{ height: "100vh" }}>
      <div>
        <Modal
          open={isOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={style}>
            <CloseIcon
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: 0,
                right: 0,
                margin: "5px",
                fontSize: "2rem",
              }}
              onClick={() => close()}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Participant by email
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    id="fullWidth"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 4,
              }}
            >
              <Button
                sx={{ color: "text.primary" }}
                variant="contained"
                type="submit"
              >
                {isPending ? "Adding..." : "Add"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
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
                {sortedGroups?.map((group: any) => {
                  return (
                    <Box
                      key={group._id}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleSetGroup(group)}
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
        {group && <ChatBox />}
      </Grid>
    </Grid>
  );
}

export default Chat;

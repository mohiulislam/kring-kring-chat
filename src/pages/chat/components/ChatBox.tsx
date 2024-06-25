import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGetMessages } from "@/apiHooks/message/useMessage";
import ChatBubble from "./ChatBubble";
import { useAuthStore, useGroupStore } from "@/store/store";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect, useRef } from "react";
import socket from "@/socket/socket";
import queryClient from "@/queryClient";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import unisexAvatar from "@/assets/imgs/unisex-avatar.jpg";
import _ from "lodash";

// Define your validation schema
const schema = yup
  .object({
    message: yup
      .string()
      .required("Message is required")
      .min(1, "Your message must be at least 1 character long"),
  })
  .required();

interface Message {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  content: string;
  group: string;
  createdAt: string;
}
function ChatBox() {
  const group = useGroupStore((state) => state.group);
  const {
    data,
    error,
    isLoading,
    isError,
    fetchPreviousPage,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMessages({ groupId: group._id, pageSize: 15 });

  const userId = useAuthStore((state) => state?.userAuthInfo.user._id);

  const loadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      (data?.pageParams?.length < 2 && scrollRef.current) ||
      data?.pages[0]?.length
    ) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data?.pages[0]?.length]);

  useEffect(() => {
    socket.on("message", (data: Message) => {
      const messagesQueryKey = [
        "messages",
        { groupId: data.group, pageSize: 15 },
      ];

      if (data?.user?._id !== userId) {
        toast.success(data?.content);
        updateMessagesCache({
          messagesQueryKey,
          message: {
            content: data?.content,
            user: data.user._id,
            group: data?.group,
            createdAt: data?.createdAt,
          },
        });
      }
    });
    return () => {
      socket.off("message");
    };
  }, []);

  function updateMessagesCache({
    messagesQueryKey,
    message,
  }: {
    messagesQueryKey: any;
    message: {
      user: string;
      content: string;
      group: string;
      createdAt: string;
    };
  }) {
    queryClient.setQueryData(messagesQueryKey, (oldData: any) => {
      if (!oldData) return oldData;
      const newPages = [...oldData.pages];
      newPages[0] = [message, ...newPages[0]];

      return {
        ...oldData,
        pages: newPages,
      };
    });
  }

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  console.log(group);

  const onSubmit = async (data: { message: string }) => {
    console.log("Sending message:", data.message);

    if (data.message.trim()) {
      socket.emit("message", {
        message: data.message,
        groupId: group._id,
      });

      updateMessagesCache({
        messagesQueryKey: ["messages", { groupId: group._id, pageSize: 15 }],
        message: {
          user: userId,
          content: data.message,
          group: group._id,
          createdAt: new Date().toISOString(),
        },
      });

      queryClient.setQueryData(["groups"], (oldData: any) => {
        const groupToUpdate = _.findIndex(oldData, ["_id", group._id]);

        if (groupToUpdate !== -1) {
          const updatedGroups = _.cloneDeep(oldData);
          updatedGroups[groupToUpdate].lastMessage = {
            content: data.message,
            updatedAt: new Date().toISOString(),
          };

          return updatedGroups;
        }
        return oldData;
      });

      reset();
    }
  };

  const participant = group.users.find((user) => user._id !== userId);

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
        justifyContent: "space-between",
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
          <Avatar alt={"participantName"} src={unisexAvatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
              }}
            >
              {participant?.firstName + " " + participant?.lastName}
            </Typography>
          }
        />
      </Box>
      <Box
        ref={scrollRef}
        sx={{ paddingTop: "1vh", overflow: "auto", flexBasis: "100%" }}
      >
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={hasNextPage}
          loader={<div className="loader">Loading...</div>}
          useWindow={false}
          isReverse
          threshold={25}
          initialLoad={false}
        >
          {status === "success" &&
            data.pages
              .slice()
              .reverse()
              .map((page) =>
                page
                  .slice()
                  .reverse()
                  .map(
                    (message: {
                      _id?: string;
                      user: string;
                      content: string;
                      createdAt: Date;
                    }) => (
                      <Box
                        key={message._id}
                        sx={{
                          width: "40%",
                          marginLeft: userId === message.user ? "auto" : "16px",
                          marginRight:
                            userId === message.user ? "16px" : "auto",
                        }}
                      >
                        <ChatBubble
                          won={userId === message.user}
                          message={message}
                        />
                      </Box>
                    )
                  )
              )}
        </InfiniteScroll>
      </Box>
      <Box sx={{ width: "100%" }}>
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
      </Box>
    </Box>
  );
}

export default ChatBox;

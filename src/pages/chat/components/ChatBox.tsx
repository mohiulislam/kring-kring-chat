import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { useGetMessages } from "@/apiHooks/message/useMessage";
import { Message } from "@/interfaces/interfaces";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { useAuthStore, useGroupStore } from "@/store/store";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect, useRef, useState } from "react";

function ChatBox() {
  const groupId = useGroupStore((state) => state.groupId);
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
  } = useGetMessages({ groupId, pageSize: 15 });

  const userId = useAuthStore((state) => state?.userAuthInfo.user._id);

  const loadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (data?.pageParams?.length < 2 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data?.pageParams]);

  
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
          <Avatar
            alt={"participantName"}
            src="https://cdn.vectorstock.com/i/1000x1000/98/45/person-gray-photo-placeholder-woman-vector-23519845.webp"
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
              }}
            >
              {"Shaila Khatun"}
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
          threshold={5}
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
                  .map((message: Message) => (
                    <Box
                      key={message._id}
                      sx={{
                        width: "40%",
                        marginLeft: userId === message.user ? "auto" : "16px",
                        marginRight: userId === message.user ? "16px" : "auto",
                      }}
                    >
                      <ChatBubble
                        won={userId === message.user}
                        message={message}
                      />
                    </Box>
                  ))
              )}
        </InfiniteScroll>
      </Box>
      <Box sx={{ width: "100%" }}>
        <ChatInput groupId={groupId} />
      </Box>
    </Box>
  );
}

export default ChatBox;

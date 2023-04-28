import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Header from "../components/Header/Header";
import { UserContext } from "../context/user-context/userContext";
import axios from "axios";
import LoadingBox from "../components/Loading/LoadingBox";
import convertToBase64 from "../utils/convertToBase64";
import { ChatContext } from "../context/chat-context/chatContext";
import {
  getChatsSuccess
} from "../context/chat-context/chatAction";

const Chats = () => {
  const [senders, setSenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [openChat, setOpenChat] = useState(null);
  const [message, setMessage] = useState("");

  const { user } = useContext(UserContext);
  const { dispatch, chats } = useContext(ChatContext);

  const handleOpenChat = (senderId) => {
    setSelected(senderId);
    chats.forEach((chat) => {
      if (chat.users.find((x) => x._id === senderId)) {
        setOpenChat(chat);
      }
    });
  };

  const sendNewMessage = async () => {
    let receiver = openChat.users.find((x) => x._id !== user._id);
    let chatData = {
      sender: user._id,
      receiver: receiver._id,
      message: {
        content: message,
        sender: user._id,
      },
    };
    if (!receiver) {
      return alert("Something Went Wrong!");
    }

    try {
      const { data } = await axios.post(
        "https://am-product-store.onrender.com/chat/new-chat",
        chatData
      );
      setOpenChat(data);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let senderList = [];
    const getAllChats = async () => {
      try {
        const { data } = await axios.get(
          `https://am-product-store.onrender.com/chats/all-chats/${user?._id}`
        );

        if (data?.length > 0) {

          dispatch(getChatsSuccess(data));

          data.forEach((item, index) => {
            item.users.forEach((x) => {
              if (x._id !== user._id) {
                senderList.push(x);
                setSenders(senderList);
              }
            });
          });

          
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllChats();
  }, [user?._id]);
  return (
    <>
      <Header />

      {loading ? (
        <LoadingBox />
      ) : (
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: "100%",
            minHeight: "100vh",
          }}
        >
          <Box sx={{ width: "100%", height: "80px" }}></Box>
          <Box>
            <Container>
              <Grid container spacing={0}>
                <Grid
                  item
                  md={4}
                  sx={{
                    height: "100%",
                    minHeight: "calc(100vh - 80px)",
                    overflowY: "scroll",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {senders?.length > 0 ? (
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "transparent",
                      }}
                    >
                      {senders.map((sender) => (
                        <ListItem
                          key={sender._id}
                          sx={{
                            cursor: "pointer",
                            backgroundColor: `${
                              sender._id === selected ? "#eee" : "#f5f5f5"
                            }`,
                            "&:hover": {
                              background: "#f1f1f1",
                            },
                          }}
                          onClick={() => handleOpenChat(sender._id)}
                        >
                          <ListItemAvatar>
                            {sender?.profilePicture ? (
                              <Avatar
                                src={`data:image/png;base64,${convertToBase64(
                                  sender.profilePicture.data
                                )}`}
                              ></Avatar>
                            ) : (
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={sender.firstName + " " + sender.lastName}
                            secondary={sender.email}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box>No Chat Found!</Box>
                  )}
                </Grid>
                <Grid item md={8}>
                  <Box>
                    {openChat?.messages ? (
                      <Box
                        sx={{
                          position: "relative",
                          height: "100%",
                          minHeight: "calc(100vh - 95px)",
                        }}
                      >
                        <ul className="chat-content">
                          {openChat.messages.map((message) => (
                            <li
                              key={message._id}
                              className={
                                message.sender === user._id ? "right" : "left"
                              }
                            >
                              <span>{message.content}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="chat-input">
                          <TextField
                            name="message"
                            label="Message"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            sx={{ marginLeft: "10px" }}
                            onClick={sendNewMessage}
                          >
                            Send
                          </Button>
                        </div>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          minHeight: "calc(100vh - 95px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h4">
                          Click an user to start conversation
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chats;
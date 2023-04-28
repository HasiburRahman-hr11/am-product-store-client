import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../../context/user-context/userContext";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  maxWidth: "600px",
  p: 4,
  margin: "0 auto",
};

const MessageModal = ({ openModal, handleCloseModal, receiver }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const sendMessage = async () => {
    let chatData = {
      sender: user._id,
      receiver: receiver,
      message: {
        content: message,
        sender: user._id,
      },
    };
    if(!receiver){
        return alert('Something Went Wrong!');
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/chat/new-chat",
        chatData
      );
      setMessage('');
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", mb: "10px" }}
        >
          Send A Message
        </Typography>
        <Box component="div">
          <TextField
            name="message"
            label="Message"
            fullWidth
            multiline
            rows={4}
            sx={{ margin: "20px 0" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ padding: "10px 20px", minWidth: "150px" }}
              onClick={sendMessage}
            >
              {loading ? (
                <CircularProgress
                  sx={{
                    color: "#fff",
                    width: "25px !important",
                    height: "25px !important",
                  }}
                />
              ) : (
                "Send"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default MessageModal;

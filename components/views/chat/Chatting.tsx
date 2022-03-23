import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import axios from "../../../lib/api";

// * Socket.io
import SocketIOClient from "socket.io-client";

// * MUI
import { Stack, TextField, Alert, Button, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import socketio from "../../../pages/api/chat/socketio";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem;

  .MuiButton-root {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

interface IMessage {
  user: string;
  message: string;
}

const Chatting: React.FC = () => {
  const [sendMessage, setSendMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMessage[]>([]);

  const { _id, name, profileImage } = useSelector((state) => state.user);
  const isLogged = useSelector((state) => state.user.isLogged);

  const messageEnd = useRef(null);

  useEffect((): any => {
    const scrollToBottom = () => {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [chat]);

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.NEXT_PUBLIC_API_URL, {
      path: "/api/chat/socketio",
    });

    socket.emit("login", { name, _id, profileImage });

    socket.on("login", (data) => {
      chat.push({
        user: "SYSTEM",
        message: `${data || "비회원"} 유저가 접속했습니다.`,
      });
      setChat([...chat]);
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMessage) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnect on component unmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessageHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSendMessage(event.target.value);
    },
    [sendMessage]
  );

  const enterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // send message
      event.preventDefault();
      submitSendMessage(event);
    }
  };

  const submitSendMessage = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (sendMessage) {
      const message: IMessage = {
        user: name,
        message: sendMessage,
      };

      const response = await axios.post("/api/chat", message);
      setSendMessage("");
    }
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Alert severity="info">
          채팅 기능은 로그인된 유저에게만 제공됩니다.
        </Alert>
        {/* 채팅 메시지 출력 영역 */}
        <Stack spacing={2} direction="column" sx={{ height: "500px" }}>
          <Paper
            variant="outlined"
            sx={{ overflow: "hidden", fontSize: "1.5rem", height: "500px" }}
          >
            {chat.length ? (
              chat.map((chat, index) => (
                <div className="chat-message" key={index}>
                  {chat.user === name ? "Me" : chat.user} : {chat.message}
                </div>
              ))
            ) : (
              <div className="alert-message">No Chat Messages</div>
            )}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => (messageEnd.current = el)}
            />
          </Paper>
        </Stack>
        {/* 채팅 메시지 입력 영역 */}
        {isLogged && (
          <Stack spacing={1} direction="row">
            <TextField
              id="chat-message-input"
              label="enter your message"
              variant="outlined"
              value={sendMessage}
              onChange={sendMessageHandler}
              margin="normal"
              autoFocus
              multiline
              rows={2}
              fullWidth
              onKeyPress={enterKeyPress}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={submitSendMessage}
            >
              Send
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Chatting;
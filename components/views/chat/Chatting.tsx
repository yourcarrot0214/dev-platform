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

// * Children Component
import MessageTab from "./MessageTab";
import SystemMessage from "./SystemMessage";

// * utils
import useTimeStamp from "./useTimeStamp";
import EVENTS from "../../../utils/socket/events";
import { getChatRoomAPI } from "../../../lib/api/chat";
import { ChatRoom } from "../../../types/chat";

import useSocketClient from "../../../hooks/useSocketClient";
import { SendRoomMessage } from "../../../types/chat";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  padding: 2rem;

  .MuiButton-root {
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .message-end {
    margin: 1rem 0;
  }
`;

interface Message {
  user: string;
  message: string;
  timestamp: string;
}

const Chatting: React.FC = () => {
  const chatRoom = useSelector<ChatRoom | null>((state) => state.chat.chatRoom);
  const [sendMessage, setSendMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);

  const { _id, name, profileImage } = useSelector((state) => state.user);
  const isLogged = useSelector<boolean>((state) => state.user.isLogged);

  const messageEnd = useRef<null | HTMLDivElement>(null);
  const { socket, roomId, messages, setMessages } = useSocketClient();

  useEffect((): any => {
    const scrollToBottom = () => {
      messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  useEffect((): any => {
    return () => {
      console.log("Chatting Component clean up.");
      socket.emit(EVENTS.CLIENT.LEAVE_ROOM, roomId);
    };
  }, [roomId]);

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
    event:
      | React.FormEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (sendMessage) {
      const { ampm, hours, minutes } = useTimeStamp(new Date(Date.now()));
      const message = {
        user: name,
        message: sendMessage,
        timestamp: `${ampm} ${hours}:${minutes}`,
      };

      socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
        message,
        roomId: chatRoom?._id,
      });
      setMessages((messages) => [...messages, message]);
      setSendMessage("");
    }
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        {!isLogged && (
          <Alert severity="warning" variant="filled">
            채팅 기능은 로그인된 유저에게만 제공됩니다.
          </Alert>
        )}
        {/* 채팅 메시지 출력 영역 */}
        <Stack spacing={2} direction="column" sx={{ height: "500px" }}>
          <Paper
            variant="outlined"
            sx={{ overflow: "auto", height: "500px", padding: "1rem" }}
          >
            {chatRoom?.messages &&
              chatRoom.messages.map((chat, index) => {
                const { ampm, hours, minutes } = useTimeStamp(
                  new Date(chat.createdAt)
                );
                return (
                  <MessageTab
                    key={index}
                    name={chat.author.name}
                    profileImage={profileImage}
                    message={chat.message}
                    isMine={chat.author.name === name}
                    timestamp={`${ampm} ${hours}:${minutes}`}
                  />
                );
              })}
            {messages?.length
              ? messages.map((chat, index) =>
                  chat.user === "SYSTEM" ? (
                    <SystemMessage
                      key={index}
                      message={chat.message}
                      timestamp={chat.timestamp}
                    />
                  ) : (
                    <MessageTab
                      key={index}
                      name={chat.user}
                      profileImage={profileImage}
                      message={chat.message}
                      isMine={chat.user === name}
                      timestamp={chat.timestamp}
                    />
                  )
                )
              : !chatRoom?.messages && (
                  <div className="alert-message">No Chat Messages</div>
                )}
            <div
              style={{ float: "left", clear: "both" }}
              ref={messageEnd}
              className="message-end"
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

/*
  TODO : chat message 출력하기
    ? 유저 정보 출력하기
      * 이름, 프로필사진, 타임스탬프 ✅
      * 좌(유저)/우(본인) 정렬 ✅
      * max-width 설정 ✅
      ! profileImage를 socket에서 전달받아 데이터를 저장하고 props로 전달하기
    ? system 메시지 출력하기
      * 이름, 메시지, 타임스탬프 ✅
      * 중앙정렬 ✅
    ? 타임 스탬프 정보 변환
      * 오전/오후, 12시간제로 데이터 변환 출력 ✅
*/

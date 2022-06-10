import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import { useDispatch, shallowEqual } from "react-redux";

// * MUI
import {
  Stack,
  TextField,
  Alert,
  Button,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LogoutIcon from "@mui/icons-material/Logout";

// * Children Component
import MessageTab from "./MessageTab";
import SystemMessage from "./SystemMessage";
import Info from "./Info";

// * utils
import timeStamp from "./timeStamp";
import { ChatRoom, ChatMember } from "../../../types/chat";

import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  emitMessage,
  subscribeToChatMember,
  emitExitRoom,
  subscribeToExitMember,
} from "../../../lib/api/socket";
import { chatActions } from "../../../store/chat";
import { exitChatRoomAPI } from "../../../lib/api/chat";

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
  username: string;
  message: string;
  timestamp: string;
  roomId: string;
  profileImage?: string;
}

interface User {
  _id: string;
  name: string;
  profileImage: string;
}

const Chatting: React.FC = () => {
  const dispatch = useDispatch();
  const chatRoom = useSelector<ChatRoom | null>((state) => state.chat.chatRoom);
  const [sendMessage, setSendMessage] = useState<string>("");

  const { _id, name, profileImage } = useSelector((state) => state.user);
  const isLogged = useSelector<boolean>((state) => state.user.isLogged);

  const messageEnd = useRef<null | HTMLDivElement>(null);

  const roomId = useSelector((state) => state.chat.chatRoom?._id);
  const members = useSelector(
    (state) => state.chat.chatRoom?.members,
    shallowEqual
  );
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect((): any => {
    fetch("/api/chats/socketio").finally(() => {
      if (roomId)
        initiateSocket({ room: roomId, user: { _id, name, profileImage } });

      subscribeToChat((err: Error, message: Message) => {
        if (err) return;

        setMessages((prevMessages) => [...prevMessages, message]);
      });

      subscribeToChatMember((err: Error, user: User) => {
        if (err) return;

        let updateChatMembers = members?.find(
          (member) => member._id === user._id
        )
          ? members
          : members?.concat(user);

        dispatch(
          chatActions.updateChatMembers({
            _id: roomId as string,
            members: updateChatMembers as ChatMember[],
          })
        );
      });

      subscribeToExitMember((err: Error, userId: string) => {
        if (err) return;
        let updateChatMembers = members?.filter(
          (member) => member._id !== userId
        );
        if (updateChatMembers === members) return;
        dispatch(
          chatActions.updateChatMembers({
            _id: roomId as string,
            members: updateChatMembers as ChatMember[],
          })
        );
        if (userId === _id) dispatch(chatActions.setInitChatRoom());
      });
    });

    return () => {
      setMessages([]);
      disconnectSocket();
    };
  }, [roomId, members, dispatch, _id, name, profileImage]);

  useEffect((): any => {
    const scrollToBottom = () => {
      messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  const sendMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendMessage(event.target.value);
  };

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
      const { ampm, hours, minutes } = timeStamp(new Date(Date.now()));
      const message = {
        username: name,
        message: sendMessage,
        timestamp: `${ampm} ${hours}:${minutes}`,
        roomId: roomId as string,
        profileImage: profileImage,
      };

      emitMessage(message);

      setSendMessage("");
    }
  };

  const exitRoomHandler = async () => {
    exitChatRoomAPI({ roomId: roomId as string, userId: _id });
    emitExitRoom(_id);
  };

  return (
    <Container>
      <Stack spacing={1} direction="column">
        {!isLogged && (
          <Alert severity="warning" variant="filled">
            채팅 기능은 로그인된 유저에게만 제공됩니다.
          </Alert>
        )}
        {/* 채팅 메뉴 출력 영역 */}
        {chatRoom?.messages && (
          <Stack direction="row">
            <Tooltip title="돌아가기" arrow>
              <IconButton
                aria-label="back"
                onClick={() => dispatch(chatActions.setInitChatRoom())}
              >
                <ArrowBackIosNewIcon color="action" />
              </IconButton>
            </Tooltip>
            <Tooltip title="채팅방 나가기" arrow>
              <IconButton aria-label="exit" onClick={exitRoomHandler}>
                <LogoutIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
        {/* 채팅 메시지 출력 영역 */}
        <Stack spacing={2} direction="column" sx={{ height: "500px" }}>
          {process.env.NODE_ENV === "production" && (
            <Alert severity="warning" variant="filled">
              vercel 배포 서버리스 환경에서 socket.io 인스턴스 서버의 연결이
              되지 않아 부득이하게 시연 영상 링크를 덧붙입니다.
              <a
                rel="noreferrer"
                href="https://youtu.be/e8mNc6AXncY"
                target="_blank"
              >
                {" "}
                🔗 보러가기
              </a>
            </Alert>
          )}
          <Paper
            variant="outlined"
            sx={{ overflow: "auto", height: "500px", padding: "1rem" }}
          >
            {chatRoom?.messages &&
              chatRoom.messages.map((chat, index) => {
                const { ampm, hours, minutes } = timeStamp(
                  new Date(chat.createdAt)
                );
                return (
                  <MessageTab
                    key={index}
                    name={chat.author.name}
                    profileImage={chat.author.profileImage}
                    message={chat.message}
                    isMine={chat.author.name === name}
                    timestamp={`${ampm} ${hours}:${minutes}`}
                  />
                );
              })}
            {messages?.length
              ? messages.map((chat, index) =>
                  chat.username === "SYSTEM" ? (
                    <SystemMessage
                      key={index}
                      message={chat.message}
                      timestamp={chat.timestamp}
                    />
                  ) : (
                    <MessageTab
                      key={index}
                      name={chat.username}
                      profileImage={chat.profileImage}
                      message={chat.message}
                      isMine={chat.username === name}
                      timestamp={chat.timestamp}
                    />
                  )
                )
              : !chatRoom?.messages && <Info message="채팅에 참여하세요!" />}
            <div
              style={{ float: "left", clear: "both" }}
              ref={messageEnd}
              className="message-end"
            />
          </Paper>
        </Stack>
        {/* 채팅 메시지 입력 영역 */}
        {isLogged && chatRoom?.messages && (
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

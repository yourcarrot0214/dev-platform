const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

export default EVENTS;

/*
  ? create room
  1. client - server connect
  2. client -> CREATE_ROOM, {roomName}
  3. server -> {
    1. roomId 생성 : mongodb chat document
    2. rooms object 생성 : {roomId: {name: roomName}}
    3. socket.join(roomId)
    4. emit SERVER.ROOMS, rooms
    5. emit SERVER.JOINED_ROOM, roomId
  }
  4. client -> {
    on(SERVER.ROOMS, (value) => {
      dispatch.setRooms(value)
    })

    on(SERVER.JOINED_ROOM, (roomId) => {
      dispatch.setRoomId(roomId)
    })
  }

  ? send message to room
  1. client -> {
      emit.(SEND_ROOM_MESSAGE, {username, roomId, message})
  }
    const {data} = await sendRoomMessage({username, roomId, message})
    dispatch.setRoomMessage(data)
  2. server -> {
    on.(SEND_ROOM_MESSAGE, (data) => {
      const newMessage = await Message.create(data).catch(catcher);
      await Chat.findOneAndUpdate({_id: data.roomId}, {...})

      socket.to(data.roomId).emit(SERVER.ROOM_MESSAGE, newMessage);
    })
  }
  3. client -> {
    on.(SERVER.ROOM_MESSAGE, (newMessage) => {
      dispatch.setRoomMessage(newMessage);
    })
  }
*/

/*
  1. client에서 SEND_ROOM_MESSAGE 이벤트로 메시지 정보를 서버로 보낸다.
  2. server에서는 받은 메시지 정보를 chat document에 저장한다.
  3. 저장된 메시지는 SERVER.ROOM_MESSAGE 이벤트로 정보를 전달한다.
  4. client에서 SERVER.ROOM_MESSAGE 이벤트를 확인하고, 메시지 정보를 리덕스에 업데이트 한다.
*/

/*
  TODO 1. redux chat store 구조설계
  TODO 2. chat store api 설계
*/

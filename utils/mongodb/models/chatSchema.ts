import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 60 * 60 * 1000 * 9),
    },
  }
);

export default chatSchema;

/*
  TODO CLIENT
    ? 해당 roomId와 일치하는 message document의 정보를 불러온다. 
    ? socket 채널에 로그인된 유저의 정보를 저장한다. (id, name, profileImage)
    
  TODO SERVER
*/

/*
  ? roomSchema
    * /chat에서 [생성하기] 버튼을 누르면 api 요청을 보내고
    * room document를 생성하고 id값을 response로 보내주면
    * 해당 id값을 route로 하는 채팅 페이지로 연결
    * 여기에 messageSchema의 ObjectId를 따로 저장한다 해도 불러올때마다 sort를 해야되는건 매한가지.
    * 
*/

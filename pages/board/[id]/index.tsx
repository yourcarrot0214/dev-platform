/*
  TODO : 게시글
  ? query에 포함된 post id를 통해 getPostAPI를 호출하여 DB로부터 게시글 데이터를 받습니다.
  ? 게시글 데이터를 store.board.detail에 저장합니다.
  ? NextPage type의 게시글 컴포넌트를 화면에 출력합니다.
*/
import { NextPage } from "next";
import { getPostAPI, getBoardListAPI } from "../../../lib/api/board";
import { boardActions } from "../../../store/board";
import wrapper from "../../../store";
import { Store } from "redux";
import Post from "../../../components/views/board/Post";

const postDetail: NextPage = () => {
  return <Post />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store: Store) => async (context) => {
    const id = context.query.id;

    try {
      const { data } = await getPostAPI(id as string);
      store.dispatch(boardActions.setDetail(data));
    } catch (error) {
      console.log(error);
    }

    return { props: {} };
  }
);

export default postDetail;

/*
  TODO : 게시글
  ? query에 포함된 post id를 통해 getPostAPI를 호출하여 DB로부터 게시글 데이터를 받습니다.
  ? 게시글 데이터를 store.board.detail에 저장합니다.
  ? NextPage type의 게시글 컴포넌트를 화면에 출력합니다.
*/
import { NextPage } from "next";
import { getPostAPI } from "../../lib/api/board";
import { boardActions } from "../../store/board";
import wrapper from "../../store";
import { Store } from "redux";
import { NextPageContext } from "next/types";
// import Post from "../../components/views/board/Post";

const postDetail: NextPage = () => {
  return <div>Post Page</div>;
};

postDetail.getInitialProps = wrapper.getInitialAppProps(
  (store: Store) => async ({ query }: NextPageContext) => {
    const { id } = query;

    try {
      if (id) {
        const { data } = await getPostAPI(id as string);
        console.log(">> data :: ", data);
        store.dispatch(boardActions.setDetail(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default postDetail;

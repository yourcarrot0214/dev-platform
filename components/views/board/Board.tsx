import Link from "next/link";
import Styled from "styled-components";
import { useSelector } from "../../../store";

import PostCard from "./common/main/PostCard";

const Container = Styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;

  .post-menu-bar {
    padding: 1rem;
    .new-posting {
      background: none;
      color: #161616;
      outline: none;
      border: 1px solid #161616;
      border-radius: 1rem;
      padding: 0.25rem 0.5rem;
      transition: all 0.125s ease-in 0s;

      :hover {
        background: #161616;
        color: white;
        border: 1px solid white;
      }
    }
    .warning {
      font-size: 1rem;
      color: #d50000;
    }
  }

  .post-list-wrapper {
    flex: 1 1 0%;

    .post-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

const Board: React.FC = () => {
  const { postlist, commentlist, replieslist } = useSelector(
    (state) => state.board
  );
  const isLogged = useSelector((state) => state.user.isLogged);

  function postDataList() {
    let result = [];
    for (let i = 0; i < postlist.length; i++) {
      let data = {
        post: postlist[i],
        commentlist: commentlist.filter(
          (comment) => comment.postId === postlist[i]._id
        ),
        replieslist: replieslist.filter(
          (replies) => replies.postId === postlist[i]._id
        ),
      };
      result.push(data);
    }
    return result;
  }

  return (
    <Container>
      <div className="post-menu-bar">
        {isLogged ? (
          <Link href="/board/write">
            <button className="new-posting">새 글 작성</button>
          </Link>
        ) : (
          <h3 className="warning">
            📣 새 글 작성은 로그인 유저에게만 제공됩니다.
          </h3>
        )}
      </div>
      <div className="post-list-wrapper">
        <div className="post-list">
          {postDataList().map((postData) => (
            <PostCard
              key={postData.post._id}
              post={postData.post}
              commentlist={postData.commentlist}
              replieslist={postData.replieslist}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Board;

/*
  TODO : Board CSS update
    ? 게시판 게시글 목록 출력 CSS를 업데이트 합니다.
    ? 게시글 목록 출력은 기존 리스트 형식에서 카드 형식으로 변경합니다.
    ? 출력 데이터
      - main
        - title
        - tags
        - timestamp
      - footer
        - user profile image
        - user name
        - replies count

  TODO : 새글 작성 버튼 및 로그인 안내
    ? 로그인된 유저에게는 새글 작성 버튼을 출력하고 비로그인 유저에게는 안내 메시지를 출력하기
    ? .post-list 상단에 출력되며 state.user.isLogged 값에 따라 다른 컴포넌트를 출력
*/

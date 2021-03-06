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
            <button className="new-posting">μ κΈ μμ±</button>
          </Link>
        ) : (
          <h3 className="warning">
            π£ μ κΈ μμ±μ λ‘κ·ΈμΈ μ μ μκ²λ§ μ κ³΅λ©λλ€.
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
    ? κ²μν κ²μκΈ λͺ©λ‘ μΆλ ₯ CSSλ₯Ό μλ°μ΄νΈ ν©λλ€.
    ? κ²μκΈ λͺ©λ‘ μΆλ ₯μ κΈ°μ‘΄ λ¦¬μ€νΈ νμμμ μΉ΄λ νμμΌλ‘ λ³κ²½ν©λλ€.
    ? μΆλ ₯ λ°μ΄ν°
      - main
        - title
        - tags
        - timestamp
      - footer
        - user profile image
        - user name
        - replies count

  TODO : μκΈ μμ± λ²νΌ λ° λ‘κ·ΈμΈ μλ΄
    ? λ‘κ·ΈμΈλ μ μ μκ²λ μκΈ μμ± λ²νΌμ μΆλ ₯νκ³  λΉλ‘κ·ΈμΈ μ μ μκ²λ μλ΄ λ©μμ§λ₯Ό μΆλ ₯νκΈ°
    ? .post-list μλ¨μ μΆλ ₯λλ©° state.user.isLogged κ°μ λ°λΌ λ€λ₯Έ μ»΄ν¬λνΈλ₯Ό μΆλ ₯
*/

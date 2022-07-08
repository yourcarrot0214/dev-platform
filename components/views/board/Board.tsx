import React, { useEffect } from "react";
import Styled from "styled-components";
import { useSelector } from "../../../store";
import { useRouter } from "next/router";

import PostCard from "./common/main/PostCard";
import { CommentType, RepliesType } from "../../../types/post";

const Container = Styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 0;

  display: flex;

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
*/

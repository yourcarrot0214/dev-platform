import React from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 20rem;
  border-radius: 4px;
  background: ${palette.gray_e5};
  margin: 1rem;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    padding: 1rem;
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;

    h4 {
      font-size: 1rem;
      height: 46px;
    }
    p {
      height: 69px;
    }
  }
`;

const PostCard = ({ post, commentlist, replieslist }) => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push(`/board/${post._id}`)}>
      <div className="content-wrapper">
        <h4>{post.title}</h4>
        <p>{post.content.slice(0, 85)} ...</p>
        {post.hashtags.map((tag) => (
          <span>{tag}</span>
        ))}
        <span>{commentlist.length + replieslist.length}</span>
      </div>
    </Container>
  );
};

export default PostCard;

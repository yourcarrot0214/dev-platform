import React from "react";
import styled from "styled-components";
import palette from "../../../../../styles/palette";
import { useRouter } from "next/router";

// * MUI
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";

const Container = styled.div`
  width: 20rem;
  border-radius: 4px;
  background: #f5f5f5;
  margin: 1rem 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;

  :hover {
    transform: translateY(-7px);
  }

  .content-wrapper {
    padding: 1rem;
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;

    h4 {
      font-size: 1rem;
      height: 46px;
      margin: 0 0 0.5rem 0;
      color: #161616;
    }
    p {
      height: 69px;
      font-size: 0.8rem;
      margin-top: 0;
      color: #424242;
    }
    .tags-wrapper {
      padding: 0.5rem 0;
      .tag {
        padding: 0.2rem 0.5rem;
        background: #424242;
        color: ${palette.snow};
        font-size: 0.8rem;
        border-radius: 4px;
        margin-right: 0.3rem;
      }
    }

    .footer {
      display: flex;
      flex-direction: row;
      align-items: center;

      .comment-wrapper,
      .create-wrapper {
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        align-items: center;

        svg {
          width: 0.8rem;
          color: #757575;
        }

        span {
          margin-left: 0.3rem;
          font-size: 0.8rem;
          color: #757575;
        }
      }

      .create-wrapper {
        margin-left: 0.5rem;
      }
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
        <div className="tags-wrapper">
          {post.hashtags.map((tag, index) => {
            if (index < 3) return <span className="tag"># {tag}</span>;
          })}
        </div>
        <div className="footer">
          <div className="comment-wrapper">
            <ChatIcon />
            <span>{commentlist.length + replieslist.length}</span>
          </div>
          <div className="create-wrapper">
            <CreateIcon />
            <span>
              {new Date(post.createdAt).toLocaleString("ko-KR", {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PostCard;

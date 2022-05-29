import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import {
  TextField,
  Paper,
  Chip,
  Stack,
  Button,
  Typography,
  ButtonGroup,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { PostType } from "../../../types/post";
import { deletePostingAPI } from "../../../lib/api/board";
import CommentBoard from "./common/comment/CommentBoard";

interface ChipData {
  key: number;
  label: string;
}

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem;

  .time-zone {
    margin-bottom: 1rem;
    .created-at,
    .updated-at {
      font-size: 12px;
      color: ${palette.gray_85};
      line-height: 1.5;
    }
  }
`;

// TODO :: hashtags는 string[] type인 상태이므로 ChipData type으로 변환
const onChangeHashtagsType = (hashtags: string[]) => {
  return hashtags.map((hashtag, index) => ({
    key: index,
    label: hashtag,
  }));
};

const Post: React.FC = () => {
  const post: PostType = useSelector((state) => state.board.detail!.post);
  const router = useRouter();
  const userId: string = useSelector((state) => state.user._id);
  const [title] = useState<string | null>(post.title);
  const [content] = useState<string>(post.content);
  const [hashtags] = useState<ChipData[]>(onChangeHashtagsType(post.hashtags));

  const onDeletePosting = async (postId: string) => {
    const confirm = window.confirm("정말로 삭제합니까?");
    if (confirm) {
      await deletePostingAPI(postId);
      router.push("/board");
    }
  };

  useEffect(() => {
    document.title = `DEV-PLATFORM : ${title}`;

    return () => {
      document.title = "DEV-PLATFORM";
      return;
    };
  }, [title]);

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Typography variant="h4" component="div" gutterBottom>
          Post Page
        </Typography>

        <TextField
          id="post-title"
          label="title"
          variant="standard"
          value={title}
          margin="normal"
          inputProps={{ readOnly: true }}
        />

        {hashtags.length !== 0 && (
          <Paper
            sx={{
              display: "flex",
              justifyCopntent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 1,
              mb: 1,
              backgroundColor: `${palette.black}`,
            }}
            component="ul"
          >
            {hashtags.map((hashtag) => (
              <li key={hashtag.key}>
                <Chip label={hashtag.label} color="success" sx={{ m: 0.5 }} />
              </li>
            ))}
          </Paper>
        )}
        <TextField
          id="outlined-multiline-static"
          label="content"
          variant="standard"
          value={content}
          multiline
          rows={10}
          fullWidth
          margin="normal"
          inputProps={{ readOnly: true }}
        />
        <div className="time-zone">
          <p className="created-at">
            {new Date(post.createdAt).toLocaleString("ko-KR", {
              timeZone: "UTC",
            })}{" "}
            에 작성되었습니다.
          </p>
          {post.createdAt !== post.updatedAt && (
            <p className="updated-at">
              {new Date(post?.updatedAt).toLocaleString("ko-KR", {
                timeZone: "UTC",
              })}{" "}
              에 수정되었습니다.
            </p>
          )}
        </div>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => router.push("/board")}
        >
          돌아가기
        </Button>
        {userId === String(post.author._id) && (
          <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1 }}>
            <ButtonGroup>
              <Button
                variant="outlined"
                color="warning"
                size="large"
                endIcon={<BorderColorIcon />}
                onClick={() => router.push(`/board/write/${post._id}`)}
              >
                수정
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                endIcon={<DeleteForeverIcon />}
                onClick={() => onDeletePosting(post._id)}
              >
                삭제
              </Button>
            </ButtonGroup>
          </Stack>
        )}
      </Stack>
      <Stack spacing={2} direction="column" sx={{ mt: 5, mb: 1 }}>
        <CommentBoard />
      </Stack>
    </Container>
  );
};

export default Post;

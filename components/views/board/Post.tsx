import React, { useState, useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
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

interface ChipData {
  key: number;
  label: string;
}

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem;
`;

// TODO :: hashtags는 string[] type인 상태이므로 ChipData type으로 변환
const onChangeHashtagsType = (hashtags: string[]) => {
  return hashtags.map((hashtag, index) => ({
    key: index,
    label: hashtag,
  }));
};

const Post: React.FC = () => {
  const post = useSelector<PostType | null>((state) => state.board.detail);
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);
  const [title, setTitle] = useState<string | null>(post.title);
  const [content, setContent] = useState<string>(post.content);
  const [tag, setTag] = useState<string>("");
  const [hashtags, setHashtags] = useState<ChipData[]>(
    onChangeHashtagsType(post.hashtags)
  );
  const [photos, setPhotos] = useState<string[]>(post.photos);
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const onDeletePosting = async (postId: string) => {
    const confirm = window.confirm("정말로 삭제합니까?");
    if (confirm) {
      await deletePostingAPI(postId);
      router.push("/board");
    }
  };

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
        {/* 게시글 작성자인 경우 */}
        {userId === String(post.author) && (
          <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1 }}>
            {/* delete 기능 구현시 ButtonGroup로 감싸기 */}
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
    </Container>
  );
};

export default Post;

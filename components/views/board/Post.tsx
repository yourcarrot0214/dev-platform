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

import Counter from "./common/Counter";
import CommentInput from "./common/comment/CommentInput";
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

  const [commentText, setCommentText] = useState<string>("");

  const onChangeCommentText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const onSubmitComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCommentText("");
  };

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
      {/* counter */}
      <Stack spacing={2} direction="column" sx={{ mt: 5, mb: 1 }}>
        <CommentBoard />
      </Stack>
    </Container>
  );
};

export default Post;

/*
  TODO : Comment + Replies Component
    ? 1. component counter component
      - comment, replies length를 더한 전체 값을 출력합니다.
      - total값을 props로 전달받아 memo된 JSX를 반환합니다.
    ? 2. comment input component
      - comment를 작성하는 input 영역과 전송 button을 출력합니다.
    ? 3. comment list component
      - comment 개별 정보를 출력합니다.
      - <CommentList />에서 comment의 갯수만큼 <Comment />를 출력합니다.
      - comment component는 replies list를 출력하는 component를 children으로 두어야 합니다.
      - 본인이 작성한 comment에는 수정, 삭제 버튼을 출력해야 합니다.
      - 수정시 content 출력 영역이 input으로 변경되어야 합니다.
    ? 4. replies list component
      - replies 개별 정보를 출력합니다.
      - <RepliesList /> 에서 replies의 갯수만큼 <Replies />를 출력합니다.
      - 본인이 작성한 replies에는 수정, 삭제 버튼을 출력해야 합니다.
      - 수정시 content 출력 영역이 input으로 변경되어야 합니다.
    ? 5. replies input component toggle button
      - comment에 답글을 달 수 있는 toggle button을 출력합니다.
      - replies를 작성하는 input 영역과 전송, 취소 button을 출력합니다.
      - 취소 버튼은 props.withCancleButton의 boolean값으로 출력 여부를 결정합니다.

    TODO : component 구조 설정
    ? comment, replies 작성 버튼은 공통의 input component를 사용합니다.
    ? comment, replies 작성자 정보를 출력하는 부분은 공통의 <Author /> component를 사용합니다.
    ? comment, replies 정보를 출력하는 component는 공통 컴포넌트를 사용합니다.
    ? replies input component를 출력하는 toggle button 
*/

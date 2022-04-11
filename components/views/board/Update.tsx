import React, { useState, useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { boardActions } from "../../../store/board";
import {
  TextField,
  Paper,
  Chip,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { updatePostingAPI } from "../../../lib/api/board";
import { PostType } from "../../../types/post";

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

const Update: React.FC = () => {
  const dispatch = useDispatch();
  const post: PostType = useSelector((state) => state.board.detail!.post);
  const router = useRouter();
  const userId: string = useSelector((state) => state.user._id);
  const [title, setTitle] = useState<string | null>(post.title);
  const [content, setContent] = useState<string>(post.content);
  const [tag, setTag] = useState<string>("");
  const [hashtags, setHashtags] = useState<ChipData[]>(
    onChangeHashtagsType(post.hashtags)
  );
  const [photos, setPhotos] = useState<string[]>(post.photos);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTitle(value);
    },
    [title]
  );

  const onChangeTag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTag(value);
    },
    [tag]
  );

  const onChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setContent(value);
    },
    [content]
  );

  const onSubmitTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let key = hashtags.length === 0 ? 0 : hashtags[hashtags.length - 1].key + 1;
    let hashtag = { key: key, label: tag };
    setHashtags([...hashtags, hashtag]);
    setTag("");
  };

  const deleteHashtag = (chipToDelete: ChipData) => () => {
    setHashtags((tags) => tags.filter((tag) => tag.key !== chipToDelete.key));
  };

  const onUpdatePosting = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    // ? 1. 필수 데이터를 검증합니다.
    if (!title || !content) {
      setLoading(false);
      return alert("제목과 내용을 입력해주세요.");
    }

    try {
      // ? 2. hashtags 배열의 값을 ChipData에서 string으로 변환합니다.
      const conversionHashtags = hashtags.map((tag) => tag.label);

      // ? 3. post type에 맞게 request body를 생성합니다.
      const requestBody = {
        title: title,
        hashtags: conversionHashtags,
        content: content,
        userId: userId,
        photos: photos,
      };

      // ? 4. request api를 호출하고, response data를 스토어에 업데이트 합니다.
      const { data } = await updatePostingAPI(post?._id as string, requestBody);
      dispatch(boardActions.setDetailPost(data));

      // ? 5. 해당 게시글로 route를 연결합니다.
      router.push(`/board/${post._id}`);
    } catch (error) {
      setLoading(false);
      console.log("write error :: ", error);
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
          variant="outlined"
          value={title}
          onChange={onChangeTitle}
          required
          error={title === "" ? true : false}
          margin="normal"
        />
        <form onSubmit={onSubmitTag}>
          <TextField
            id="post-hashtag"
            label="tag"
            variant="outlined"
            value={tag}
            onChange={onChangeTag}
          />
        </form>
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
                <Chip
                  label={hashtag.label}
                  color="success"
                  sx={{ m: 0.5 }}
                  onDelete={deleteHashtag(hashtag)}
                />
              </li>
            ))}
          </Paper>
        )}
        <TextField
          id="outlined-multiline-static"
          label="content"
          variant="outlined"
          value={content}
          onChange={onChangeContent}
          required
          error={content === "" ? true : false}
          multiline
          rows={10}
          fullWidth
          margin="normal"
        />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => router.push(`/board/${post._id}`)}
        >
          돌아가기
        </Button>
        <Button
          variant="outlined"
          color="success"
          size="large"
          endIcon={<SendIcon />}
          onClick={onUpdatePosting}
        >
          업데이트
        </Button>
      </Stack>
    </Container>
  );
};

export default Update;

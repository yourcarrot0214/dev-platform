import React, { useState, useCallback } from "react";
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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { postingAPI } from "../../../lib/api/board";

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

const Write: React.FC = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.user._id);
  const username = useSelector((state) => state.user.name);
  const [title, setTitle] = useState<string | null>("");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [hashtags, setHashtags] = useState<ChipData[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
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

  const onSubmitPost = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
      console.log(requestBody);

      // ? 4. request api를 호출합니다.
      await postingAPI(requestBody);

      // ? 5. board route로 page를 전환합니다.
      router.push("/board");
    } catch (error) {
      setLoading(false);
      console.log("write error :: ", error);
    }
  };

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Typography variant="h4" component="div" gutterBottom>
          새글 작성하기
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
          autoFocus
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
            {hashtags.map((hashtag) => {
              return (
                <li key={hashtag.key}>
                  <Chip
                    label={hashtag.label}
                    onDelete={deleteHashtag(hashtag)}
                    color="primary"
                    sx={{ m: 0.5 }}
                  />
                </li>
              );
            })}
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
          onClick={() => router.push("/board")}
        >
          돌아가기
        </Button>
        <LoadingButton
          onClick={(event) => onSubmitPost(event)}
          loading={loading}
          endIcon={<SendIcon />}
          loadingPosition="end"
          variant="contained"
          color="success"
          size="large"
        >
          등록하기
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default Write;

/*
  TODO : Board - Write Component
  ? aws s3에 이미지를 등록하고 이미지 주소를 string으로 저장하기.
*/

import React, { useState, useCallback } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { TextField } from "@mui/material";

const Write: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const username = useSelector((state) => state.user.name);
  const [title, setTitle] = useState<string | null>("");
  const [content, setContent] = useState<string>("");
  const [hashtags, setHastags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);

  const onChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTitle(value);
    },
    [title]
  );

  const onChangeHashTags = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setHastags([...hashtags, value]);
    },
    [hashtags]
  );

  const onChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setContent(value);
    },
    [content]
  );

  return (
    <>
      <h1>Write Page</h1>
      <div style={{ width: "100%", height: "100%" }}>
        <TextField
          id="post-title"
          label="title"
          variant="outlined"
          value={title}
          onChange={onChangeTitle}
          required
          error={title === "" ? true : false}
        />
        <TextField
          id="outlined-multiline-static"
          label="content"
          variant="outlined"
          value={content}
          onChange={onChangeContent}
          required
          error={content === "" ? true : false}
          multiline
          maxRows={10}
          minRows={10}
          rows={10}
          fullWidth
        />
      </div>
    </>
  );
};

export default Write;

/*
  TODO : Board - Write Component
  
  ? required data
    - author : useSelector((state) => state.user._id);
    - title : const [title, setTitle] = useState<string | null>("");
    - content : const [content, setContent] = useState<string | null>("");
    - hashtags : const [hashtag, setHashtag] = useState<string[] | null>("");
    - photos: 
    - createdAt : submit시 new Date()
    - updatedAt : submit시 new Date()
*/

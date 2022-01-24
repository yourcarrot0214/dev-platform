import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Write: React.FC = () => {
  return <h1>Write Page!</h1>;
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

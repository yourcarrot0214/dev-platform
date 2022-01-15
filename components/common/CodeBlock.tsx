import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.code`
  background-color: ${palette.black};
  border-radius: 6px;
  color: ${palette.gray_f7};
  display: block;
  line-height: 1.5;
  margin-bottom: 2rem;
  padding: 40px 10px 10px;
  position: relative;
  white-space: pre-wrap;

  ::before {
    content: "";
    position: absolute;
    background: #2b2b2b;
    border-radius: 6px 6px 0 0;
    height: 30px;
    left: 0;
    top: 0;
    width: 100%;
  }

  ::after {
    content: "";
    position: absolute;
    background: ${palette.tawny};
    border-radius: 50%;
    box-shadow: 20px 0 ${palette.warnningOrange}, 40px 0 ${palette.clearGreen};
    height: 12px;
    left: 12px;
    top: 9px;
    width: 12px;
  }
`;

const CodeBlock: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CodeBlock;

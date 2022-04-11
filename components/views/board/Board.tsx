import React, { useState } from "react";
import Styled from "styled-components";
import { useSelector } from "../../../store";
import { useRouter } from "next/router";

// * MUI Component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Button, Alert, Snackbar } from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

// * MUI Icon
import CreateIcon from "@mui/icons-material/Create";
import ChatIcon from "@mui/icons-material/Chat";
import { PostType, CommentType, RepliesType } from "../../../types/post";

const Container = Styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem;

  .post-title {
    cursor: pointer;
  }
`;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function createData(
  index: number,
  id: string,
  title: string,
  author: string,
  createdAt: string
) {
  return { index, id, title, author, createdAt };
}

const Board: React.FC = () => {
  const router = useRouter();
  const isLogged: boolean = useSelector((state) => state.user.isLogged);
  const postlist: PostType[] = useSelector((state) => state.board.postlist);
  const commentlist: CommentType[] = useSelector(
    (state) => state.board.commentlist
  );
  const replieslist: RepliesType[] = useSelector(
    (state) => state.board.replieslist
  );
  const rows = postlist.map((post: PostType, index) =>
    createData(
      index + 1,
      post._id,
      post.title,
      post.author.name,
      post.createdAt
    )
  );

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen(true);

  const handleClose = () => setOpen(false);

  interface IGetCount {
    (postId: string): number;
  }

  const getCommentCount: IGetCount = (postId: string) =>
    commentlist.filter((comment) => comment.postId === postId).length;

  const getRepliesCount: IGetCount = (postId: string) =>
    replieslist.filter((replies) => replies.postId === postId).length;

  const getCommentAndRepliesCount: IGetCount = (postId: string) =>
    getCommentCount(postId) + getRepliesCount(postId);

  return (
    <Container>
      <Stack spacing={2} direction="column" sx={{ mt: 1, mb: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="posting list">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Author</TableCell>
                <TableCell align="left">Created At</TableCell>
              </TableRow>
            </TableHead>
            {postlist.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <h1>게시글이 없습니다.</h1>
                </TableCell>
              </TableRow>
            ) : (
              <TableBody>
                {rows.map((post) => (
                  <TableRow key={post.id} hover>
                    <TableCell component="th" scope="row">
                      {post.index}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="post-title"
                      onClick={() => router.push(`/board/${post.id}`)}
                    >
                      {post.title}
                      <IconButton aria-label="comment">
                        <StyledBadge
                          badgeContent={getCommentAndRepliesCount(post.id)}
                          color="info"
                          showZero
                        >
                          <ChatIcon fontSize="small" />
                        </StyledBadge>
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{post.author}</TableCell>
                    <TableCell align="left">
                      {new Date(post.createdAt).toLocaleString("ko-KR", {
                        timeZone: "UTC",
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Stack>
      {isLogged ? (
        <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<CreateIcon />}
            onClick={() => router.push("/board/write")}
          >
            작성하기
          </Button>
        </Stack>
      ) : (
        <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<CreateIcon />}
            onClick={handleClick}
          >
            작성하기
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="error" onClose={handleClose} variant="filled">
              게시글 작성 기능은 로그인 된 유저에게만 제공됩니다.
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Container>
  );
};

export default Board;

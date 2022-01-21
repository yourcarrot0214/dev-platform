import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AccordionUI from "../AccordionUI";
import { ExtendButtonBase, ButtonTypeMap, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Send from "@mui/icons-material/Send";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SaveIcon from "@mui/icons-material/Save";
import palette from "../../../../styles/palette";

type Color =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | string;

type Size = "small" | "medium" | "large" | string;
type Variant = "contained" | "outlined" | "text" | string;
type Sx = Array<Function | object | boolean> | Function | object;

interface IProps {
  color: Color;
  size: Size;
  variant: Variant;
  text?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: Sx;
}

const Container = styled.div`
  .MuiAccordion-root {
    margin: 1rem 0;
    background-color: ${palette.gray_eb};
  }
`;

const BasicButtons = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Container>
      <AccordionUI
        title="Basic Button"
        subtitle="버튼 컴포넌트의 디폴트 형태입니다. variant 속성의 값으로 text, contained, outlined를 줄 수 있습니다."
      >
        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </AccordionUI>
      <AccordionUI
        title="Text Button"
        subtitle="variant 속성의 값을 별도로 주지 않을 경우 디폴트 값인 text가 적용된 버튼이 됩니다."
      >
        <Stack spacing={2} direction="row">
          <Button>Primary</Button>
          <Button disabled>Disabled</Button>
          <Button href="#">Link</Button>
        </Stack>
      </AccordionUI>
      <AccordionUI
        title="Contained Button"
        subtitle="variant 속성 값이 contained인 버튼입니다."
      >
        <Stack spacing={2} direction="row">
          <Button variant="contained">Contained</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button variant="contained" href="#">
            Link
          </Button>
        </Stack>
      </AccordionUI>
      <AccordionUI
        title="Outlined Button"
        subtitle="variant 속성의 값이 outlined인 버튼입니다."
      >
        <Stack spacing={2} direction="row">
          <Button variant="outlined">Contained</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
          <Button variant="outlined" href="#">
            Link
          </Button>
        </Stack>
      </AccordionUI>
      <AccordionUI
        title="Color Button"
        subtitle="기본제공하는 6가지의 색상을 버튼에 적용할 수 있습니다."
      >
        <Stack spacing={2} direction="row">
          <Button color="primary" variant="contained">
            primary
          </Button>
          <Button color="secondary" variant="outlined">
            secondary
          </Button>
          <Button color="success" variant="contained">
            success
          </Button>
          <Button color="error" variant="outlined">
            error
          </Button>
          <Button color="info" variant="text">
            info
          </Button>
          <Button color="warning" variant="contained">
            warning
          </Button>
        </Stack>
      </AccordionUI>
      <AccordionUI
        title="Button with icon"
        subtitle="버튼에 아이콘을 배치하여 출력합니다."
      >
        <Stack spacing={2} direction="row">
          <Button
            color="primary"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button color="secondary" variant="outlined" endIcon={<Send />}>
            Send
          </Button>
        </Stack>
      </AccordionUI>
      <AccordionUI
        title="Icon Button"
        subtitle="Icon으로만 이루어진 버튼으로 IconButton 컴포넌트에 children으로 Icon을 배치합니다."
      >
        <Stack spacing={2} direction="row">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary">
            <Send />
          </IconButton>
          <IconButton color="secondary">
            <AlarmIcon />
          </IconButton>
          <IconButton color="success">
            <AddShoppingCartIcon />
          </IconButton>
        </Stack>
      </AccordionUI>
      <AccordionUI title="Loading Button" subtitle="로딩 상태를 출력합니다.">
        <Box sx={{ "& > button": { m: 1 } }}>
          <FormControlLabel
            sx={{ display: "block" }}
            control={
              <Switch
                checked={loading}
                onChange={() => setLoading(!loading)}
                name="loading"
                color="primary"
              />
            }
            label="Loading"
          />
          <LoadingButton
            onClick={() => setLoading(true)}
            loading={loading}
            variant="outlined"
            disabled
          >
            disabled
          </LoadingButton>
          <LoadingButton
            onClick={() => setLoading(true)}
            loading={loading}
            loadingIndicator="Loading..."
            variant="outlined"
          >
            Fetch data
          </LoadingButton>
          <LoadingButton
            onClick={() => setLoading(true)}
            loading={loading}
            endIcon={<Send />}
            loadingPosition="end"
            variant="contained"
            color="success"
          >
            Send
          </LoadingButton>
          <LoadingButton
            loading={loading}
            onClick={() => setLoading(true)}
            variant="outlined"
            startIcon={<SaveIcon />}
            loadingPosition="start"
            color="secondary"
          >
            Save
          </LoadingButton>
        </Box>
      </AccordionUI>
    </Container>
  );
};

export default BasicButtons;

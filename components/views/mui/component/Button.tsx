import React from "react";
import Button from "@mui/material/Button";
import { ExtendButtonBase, ButtonTypeMap, Stack } from "@mui/material";

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

const BasicButtons = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
};

export default BasicButtons;

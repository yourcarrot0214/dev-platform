import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AccordionUI from "../AccordionUI";
import {
  ExtendButtonBase,
  ButtonTypeMap,
  Stack,
  ButtonGroup,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
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
  | "warning";

type Size = "small" | "medium" | "large";
type Variant = "contained" | "outlined" | "text";
type Sx = Array<Function | object | boolean> | Function | object;
type LoadingPosition = "start" | "end";
type Icon = JSX.Element | undefined;

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

const iconList: Icon[] = [
  <DeleteIcon />,
  <Send />,
  <AlarmIcon />,
  <AddShoppingCartIcon />,
  <SaveIcon />,
];

const BasicButtons = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [size, setSize] = useState<Size>("small");
  const [variant, setVariant] = useState<Variant>("text");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [color, setColor] = useState<Color>("primary");
  const [loadingPosition, setLoadingPosition] = useState<LoadingPosition>(
    "start"
  );
  const [icon, setIcon] = useState<Icon>(undefined);
  const [iconLocation, setIconLocation] = useState<
    "startIcon" | "endIcon" | null
  >(null);

  return (
    <Container>
      <AccordionUI title="Button UI" subtitle="버튼 테스트 필드">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack spacing={2} direction="column">
              <FormControl>
                <FormLabel>Size</FormLabel>
                <RadioGroup defaultValue={size} row>
                  <FormControlLabel
                    value="small"
                    control={<Radio />}
                    label="small"
                    onClick={() => setSize("small")}
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label="medium"
                    onClick={() => setSize("medium")}
                  />
                  <FormControlLabel
                    value="large"
                    control={<Radio />}
                    label="large"
                    onClick={() => setSize("large")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Variant</FormLabel>
                <RadioGroup defaultValue={variant} row>
                  <FormControlLabel
                    value="text"
                    control={<Radio />}
                    label="text"
                    onClick={() => setVariant("text")}
                  />
                  <FormControlLabel
                    value="contained"
                    control={<Radio />}
                    label="contained"
                    onClick={() => setVariant("contained")}
                  />
                  <FormControlLabel
                    value="outlined"
                    control={<Radio />}
                    label="outlined"
                    onClick={() => setVariant("outlined")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Color</FormLabel>
                <RadioGroup defaultValue={color} row>
                  <FormControlLabel
                    value="primary"
                    control={<Radio />}
                    label="primary"
                    onClick={() => setColor("primary")}
                  />
                  <FormControlLabel
                    value="secondary"
                    control={<Radio />}
                    label="secondary"
                    onClick={() => setColor("secondary")}
                  />
                  <FormControlLabel
                    value="success"
                    control={<Radio />}
                    label="success"
                    onClick={() => setColor("success")}
                  />
                  <FormControlLabel
                    value="info"
                    control={<Radio />}
                    label="info"
                    onClick={() => setColor("info")}
                  />
                  <FormControlLabel
                    value="warning"
                    control={<Radio />}
                    label="warning"
                    onClick={() => setColor("warning")}
                  />
                  <FormControlLabel
                    value="error"
                    control={<Radio />}
                    label="error"
                    onClick={() => setColor("error")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Icon</FormLabel>
                <RadioGroup defaultValue={icon} row>
                  <FormControlLabel
                    value="undefined"
                    control={<Radio />}
                    label="undefined"
                    onClick={() => setIcon(undefined)}
                  />
                  <FormControlLabel
                    value="saveIcon"
                    control={<Radio />}
                    label={<SaveIcon />}
                    onClick={() => setIcon(<SaveIcon />)}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Icon Location</FormLabel>
                <RadioGroup defaultValue={icon} row>
                  <FormControlLabel
                    value="startIcon"
                    control={<Radio />}
                    label="start"
                    onClick={() => setIconLocation("startIcon")}
                  />
                  <FormControlLabel
                    value="endIcon"
                    control={<Radio />}
                    label="end"
                    onClick={() => setIconLocation("endIcon")}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Button
              size={size}
              variant={variant}
              color={color}
              startIcon={iconLocation === "startIcon" ? icon : null}
              endIcon={iconLocation === "endIcon" ? icon : null}
            >
              Button
            </Button>
          </Grid>
        </Grid>
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

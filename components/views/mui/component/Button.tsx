import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AccordionUI from "../AccordionUI";
import {
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
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

  const handleSize = (event: React.MouseEvent<HTMLElement>, newSize: Size) => {
    setSize(newSize);
  };

  const handleVariant = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: Variant
  ) => {
    setVariant(newVariant);
  };

  const handleColor = (
    event: React.MouseEvent<HTMLElement>,
    newColor: Color
  ) => {
    setColor(newColor);
  };

  const handleIcon = (event: React.MouseEvent<HTMLElement>, newIcon: Icon) => {
    setIcon(newIcon);
  };

  const handleIconLocation = (
    event: React.MouseEvent<HTMLElement>,
    newIconLocation: "startIcon" | "endIcon" | null
  ) => {
    setIconLocation(newIconLocation);
  };

  return (
    <Container>
      <AccordionUI title="Button UI" subtitle="버튼 테스트 필드">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={2} direction="column">
              <Typography variant="h6" fontSize="1rem">
                Size
              </Typography>
              <ToggleButtonGroup
                value={size}
                exclusive
                onChange={handleSize}
                aria-label="button size"
                size="small"
                color="info"
              >
                <ToggleButton value="small" aria-label="small size">
                  small
                </ToggleButton>
                <ToggleButton value="medium" aria-label="medium size">
                  medium
                </ToggleButton>
                <ToggleButton value="large" aria-label="large size">
                  large
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography variant="h6" fontSize="1rem">
                Variant
              </Typography>
              <ToggleButtonGroup
                value={variant}
                onChange={handleVariant}
                exclusive
                aria-label="button variant"
                size="small"
                color="info"
              >
                <ToggleButton value="text" aria-label="text variant">
                  text
                </ToggleButton>
                <ToggleButton value="contained" aria-label="contained variant">
                  contained
                </ToggleButton>
                <ToggleButton value="outlined" aria-label="outlined variant">
                  outlined
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography variant="h6" fontSize="1rem">
                Color
              </Typography>
              <ToggleButtonGroup
                value={color}
                exclusive
                onChange={handleColor}
                size="small"
                color="info"
                aria-label="button color"
              >
                <ToggleButton value="primary" aria-label="primary color">
                  primary
                </ToggleButton>
                <ToggleButton value="secondary" aria-label="secondary color">
                  secondary
                </ToggleButton>
                <ToggleButton value="success" aria-label="success color">
                  success
                </ToggleButton>
                <ToggleButton value="info" aria-label="info color">
                  info
                </ToggleButton>
                <ToggleButton value="warning" aria-label="warning color">
                  warning
                </ToggleButton>
                <ToggleButton value="error" aria-label="error color">
                  error
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography variant="h6" fontSize="1rem">
                Icon Location
              </Typography>
              <ToggleButtonGroup
                value={iconLocation}
                onChange={handleIconLocation}
                exclusive
                size="small"
                color="info"
                aria-label="icon location"
              >
                <ToggleButton value="startIcon" aria-label="start icon">
                  start
                </ToggleButton>
                <ToggleButton value="endIcon" aria-label="end icon">
                  end
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography variant="h6" fontSize="1rem">
                Icon
              </Typography>
              <ToggleButtonGroup
                value={icon}
                onChange={handleIcon}
                exclusive
                size="small"
                color="info"
                aria-label="icon"
              >
                <ToggleButton value={undefined} aria-label="undefined">
                  undefined
                </ToggleButton>
                <ToggleButton value={<AlarmIcon />} aria-label="alarm icon">
                  <AlarmIcon />
                </ToggleButton>
                <ToggleButton value={<DeleteIcon />} aria-label="delete icon">
                  <DeleteIcon />
                </ToggleButton>
                <ToggleButton value={<Send />} aria-label="send icon">
                  <Send />
                </ToggleButton>
                <ToggleButton
                  value={<AddShoppingCartIcon />}
                  aria-label="add shopping cart icon"
                >
                  <AddShoppingCartIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Button
                size={size}
                variant={variant}
                color={color}
                startIcon={iconLocation === "startIcon" ? icon : null}
                endIcon={iconLocation === "endIcon" ? icon : null}
              >
                Button
              </Button>
            </Stack>
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

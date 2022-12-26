import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { useContext } from "react";
import SettingsContext from "../context/SettingsContext.jsx";
import { common } from "@mui/material/colors";

function valuetext(value) {
  return `${value} Minutes`;
}

export default function TimeSlider({ value, marks, handleSliderChange }) {
  const settings = useContext(SettingsContext);

  const boxStyle = {
    width: 300,
    border: 1,
    borderColor: "yellow",
    padding: 3,
  };

  const sliderStyle = {
    // color: common.white,
  };

  return (
    <Box sx={boxStyle}>
      <Slider
        sx={sliderStyle}
        value={value}
        onChange={handleSliderChange}
        aria-label="Custom marks"
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={60}
      />
    </Box>
  );
}

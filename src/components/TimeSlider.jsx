import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { useContext } from "react";
import SettingsContext from "../context/SettingsContext.jsx";

function valuetext(value) {
  return `${value} Minutes`;
}

export default function TimeSlider({ value, marks, handleSliderChange }) {
  const settings = useContext(SettingsContext);

  const boxStyle = {
    width: "80%",
    // border: 1,
    // borderColor: "yellow",
    padding: 3,
    // margin: "0 0 5px 0",
  };

  return (
    <Box sx={boxStyle}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        aria-label="Custom marks"
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={1}
        max={60}
      />
    </Box>
  );
}

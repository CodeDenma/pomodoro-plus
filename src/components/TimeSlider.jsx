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

  let count = 0;

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        key={`slider-${count++}`}
        onChange={handleSliderChange}
        aria-label="Custom marks"
        // defaultValue={defaultValue}
        value={value}
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

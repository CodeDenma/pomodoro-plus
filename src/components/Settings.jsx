import React, { useContext } from "react";
import ReactSlider from "react-slider";
import "../styles/slider.scss";
import SettingsContext from "../context/SettingsContext.jsx";
import BackButton from "./BackButton.jsx";

import TimeSlider from "./TimeSlider.jsx";
import CycleSlider from "./CycleSlider.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Settings() {
  const settings = useContext(SettingsContext);

  const focusMarks = [
    {
      value: 25,
      label: "25",
    },
    {
      value: 60,
      label: "60",
    },
  ];

  const breakMarks = [
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  const longBreakMarks = [
    {
      value: 15,
      label: "15",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  const cycleMarks = [
    {
      value: 4,
      label: "4",
    },
  ];

  const handleWorkChange = (e) => {
    settings.setFocusMinutes(e.target.value);
  };

  const handleBreakChange = (e) => {
    settings.setBreakMinutes(e.target.value);
  };

  const handleLongBreakChange = (e) => {
    settings.setLongBreakMinutes(e.target.value);
  };

  const handleCycleChange = (e) => {
    settings.setCycle(e.target.value);
  };

  return (
    <div id="settings">
      <div className="sliders">
        {/* <div style={{ textAlign: "left" }}> */}
        Focus Minutes
        <TimeSlider
          value={settings.focusMinutes}
          marks={focusMarks}
          handleSliderChange={handleWorkChange}
        />

        Short Break Minutes
        <TimeSlider
          value={settings.breakMinutes}
          marks={breakMarks}
          handleSliderChange={handleBreakChange}
        />

        Long Break Minutes
        <TimeSlider
          value={settings.longBreakMinutes}
          marks={longBreakMarks}
          handleSliderChange={handleLongBreakChange}
        />

        Number of Focus Sessions
        <CycleSlider
          value={settings.cycle}
          marks={cycleMarks}
          handleSliderChange={handleCycleChange}
        />
      </div>
      <div
        className="back-button"
        onClick={() => settings.setShowSettings(false)}
      >
        <ArrowBackIcon />
        Back
      </div>
    </div>
  );
}

export default Settings;

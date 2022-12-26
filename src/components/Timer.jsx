import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";
import SettingsButton from "./SettingsButton.jsx";

import { useContext, useEffect, useRef, useState } from "react";
import SettingsContext from "../context/SettingsContext.jsx";

import PlayCircleIcon from "@mui/icons-material/PlayCircle.js";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import FastForwardIcon from "@mui/icons-material/FastForward";
import StopIcon from "@mui/icons-material/Stop";

// const red = "#f54e4e";
const red = "#f44336";
// const green = "#4aec8c";
const green = "#43a047";

function Timer() {
  const settings = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("focus"); // focus/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode = modeRef.current === "focus" ? "break" : "focus";

    const nextSeconds =
      (nextMode === "focus" ? settings.focusMinutes : settings.breakMinutes) *
      60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  useEffect(() => {
    secondsLeftRef.current = settings.focusMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        isPausedRef.current = true;
        setIsPaused(isPausedRef);
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settings]);

  const totalSeconds = mode === "focus"
    ? settings.focusMinutes * 60
    : settings.breakMinutes * 60;

  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  const progressBarStyle = {
    rotation: 0.25,
    strokeLinecap: "butt",
    textSize: "20px",
    pathTransitionDuration: 0.5,
    // pathTransition: 'none',
    pathColor: mode === "focus" ? red : green,
    textColor: "#fff",
    trailColor: "rgba(255, 255, 255, .2)",
    backgroundColor: "#3e98c7",
  };

  function stop() {
    isPausedRef.current = true;
    setIsPaused(isPausedRef.current);

    secondsLeftRef.current = settings.focusMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    setMode("focus");
    modeRef.current = "focus";
  }

  return (
    <div id="timer">
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles(progressBarStyle)}
      />
      <div className="control-buttons" style={{ marginTop: "20px" }}>
        <StopIcon onClick={stop} />
        {isPaused
          ? (
            <PlayCircleIcon
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          )
          : (
            <PauseCircleIcon
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
        <FastForwardIcon onClick={switchMode} />
      </div>
      <div className="control-buttons">
        <SettingsIcon
          onClick={() => settings.setShowSettings(true)}
        />
      </div>
    </div>
  );
}

export default Timer;

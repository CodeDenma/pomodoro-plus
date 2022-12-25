import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";
import PlayButton from "./PlayButton.jsx";
import PauseButton from "./PauseButton.jsx";
import SettingsButton from "./SettingsButton.jsx";

import { useContext, useEffect, useRef, useState } from "react";
import SettingsContext from "../context/SettingsContext.jsx";
import PlayCircle from "@mui/icons-material/PlayCircle.js";

const red = "#f54e4e";
const green = "#4aec8c";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";

      const nextSeconds = (nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = mode === "work"
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;

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
    pathColor: mode === "work" ? red : green,
    textColor: "#fff",
    trailColor: "rgba(255, 255, 255, .2)",
    backgroundColor: "#3e98c7",
  };

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles(progressBarStyle)}
      />
      <div className="control-buttons" style={{ marginTop: "20px" }}>
        {isPaused
          ? (
            <PlayCircle
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
            // <PlayButton
            //   onClick={() => {
            //     setIsPaused(false);
            //     isPausedRef.current = false;
            //   }}
            // />
          )
          : (
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;

import React from 'react';
import './index.scss';
import Timer from './components/Timer.jsx';
import Settings from './components/Settings.jsx';
import { useState } from 'react';
import SettingsContext from './context/SettingsContext.jsx';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

import NavBar from './components/NavBar';
import { useEffect } from 'react';

import colors from './styles/colors.module.scss';

const theme = createTheme({
  // palette: {
  //   primary: {
  //     light: '#757ce8',
  //     main: '#3f50b5',
  //     dark: '#002884',
  //     // contrastText: '#fff',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: '#ff7961',
  //     main: '#f44336',
  //     dark: '#ba000d',
  //     contrastText: '#000',
  //   },
  // },
  palette: {
    primary: {
      light: '#757ce8',
      // main: '#3f50b5',
      // main: '#80cbc4',
      main: colors.primaryMain,
      dark: '#002884',
      // contrastText: '#fff',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    }
  },
});


function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const [count, setCount] = useState(1);
  const [cycle, setCycle] = useState(4);

  const defaultTemplates = {
    Default: {
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      cycle: 4
    },
    Test: {
      focus: 50,
      shortBreak: 10,
      longBreak: 30,
      cycle: 2
    }
  };

  const [templates, setTemplates] = useState(defaultTemplates);
  const [templateLabel, setTemplateLabel] = useState('Default');


  function changeTemplate({ focus, shortBreak, longBreak, cycle }) {
    setFocusMinutes(focus);
    setBreakMinutes(shortBreak);
    setLongBreakMinutes(longBreak);
    setCycle(cycle);
  }

  useEffect(() => {
    // changeTemplate(defaultTemplates.test);
  }, []);

  const value = {
    focusMinutes,
    breakMinutes,
    setFocusMinutes,
    setBreakMinutes,
    showSettings,
    setShowSettings,

    longBreakMinutes,
    setLongBreakMinutes,
    count,
    setCount,
    cycle,
    setCycle,

    changeTemplate,
    templates,
    setTemplates,
    templateLabel,
    setTemplateLabel
  };

  return (
    <ThemeProvider theme={theme}>
      <SettingsContext.Provider value={value}>
        <NavBar />
        <main>
          {showSettings ? <Settings /> : <Timer />}
        </main>
      </SettingsContext.Provider>
    </ThemeProvider >
  );
}

export default App;
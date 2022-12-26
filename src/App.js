import React from 'react';
import './index.scss';
import Timer from './components/Timer.jsx';
import Settings from './components/Settings.jsx';
import { useState } from 'react';
import SettingsContext from './context/SettingsContext.jsx';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <SettingsContext.Provider value={{
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
          showSettings,
          setShowSettings
        }}>
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </main>
    </ThemeProvider>
  );
}

export default App;
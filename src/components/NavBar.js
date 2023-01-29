import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useContext } from "react";


import SettingsIcon from "@mui/icons-material/Settings";


import '../index.scss';
import SettingsContext from "../context/SettingsContext.jsx";



export default function NavBar() {
  const settings = useContext(SettingsContext);

  return (
    <div id="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, userSelect: 'none' }}>
              Pomodoro+
            </Typography>

            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            // sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <IconButton>
              <SettingsIcon
                onClick={() => settings.setShowSettings(!settings.showSettings)}
              />
            </IconButton>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

    </div>
  );
}

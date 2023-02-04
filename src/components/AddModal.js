import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import AddCircleIcon from "@mui/icons-material/AddCircle";


import { useContext } from 'react';
import SettingsContext from "../context/SettingsContext.jsx";
import { useState } from 'react';

// import Button from '@mui/material/Button';

import TimeSlider from "./TimeSlider.jsx";
import CycleSlider from "./CycleSlider.jsx";


import NewTemplateTextField from './NewTemplateTextField.js';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  bgcolor: '#263238',
  // border: '2px solid #000',
  border: '2px solid background.paper',
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function AddModal() {
  const settings = useContext(SettingsContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newName, setNewName] = React.useState('');

  const [newFocusMinutes, setNewFocusMinutes] = useState(25);
  const [newBreakMinutes, setNewBreakMinutes] = useState(5);
  const [newLongBreakMinutes, setNewLongBreakMinutes] = useState(15);

  const [newCycle, setNewCycle] = useState(4);

  function handleAdd(e) {
    if (Object.keys(settings.templates).length >= 5) {
      alert('You can only have 5 templates in total.');
      return handleClose();
    }

    if (settings.templates.hasOwnProperty(newName)) {
      alert(`${newName} Template is already in use.`);
      return handleClose();
    }

    const newTemplate = {
      focus: newFocusMinutes,
      shortBreak: newBreakMinutes,
      longBreak: newLongBreakMinutes,
      cycle: newCycle
    };

    const templatesCopy = JSON.parse(JSON.stringify(settings.templates));

    templatesCopy[newName] = newTemplate;

    settings.setTemplates(templatesCopy);

    settings.changeTemplate(newTemplate);
    settings.setTemplateLabel(newName);

    setNewFocusMinutes(25);
    setNewBreakMinutes(5);
    setNewLongBreakMinutes(15);
    setNewCycle(4);

    return handleClose();
  }

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



  const handleNewWorkChange = (e) => {
    setNewFocusMinutes(e.target.value);
  };

  const handleNewBreakChange = (e) => {
    setNewBreakMinutes(e.target.value);
  };

  const handleNewLongBreakChange = (e) => {
    setNewLongBreakMinutes(e.target.value);
  };

  const handleNewCycleChange = (e) => {
    setNewCycle(e.target.value);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}> */}
      <AddCircleIcon onClick={handleOpen} />
      {/* </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="add-template">
            Focus Minutes
            <TimeSlider
              value={newFocusMinutes}
              marks={focusMarks}
              handleSliderChange={handleNewWorkChange}
            />

            Short Break Minutes
            <TimeSlider
              value={newBreakMinutes}
              marks={breakMarks}
              handleSliderChange={handleNewBreakChange}
            />

            Long Break Minutes
            <TimeSlider
              value={newLongBreakMinutes}
              marks={longBreakMarks}
              handleSliderChange={handleNewLongBreakChange}
            />

            Number of Focus Sessions
            <CycleSlider
              value={newCycle}
              marks={cycleMarks}
              handleSliderChange={handleNewCycleChange}
            />
          </div>
          <div id='new-template-name'>
            <NewTemplateTextField newName={newName} setNewName={setNewName} />
          </div>
          <div
            className="confirmation"
          >
            <Button onClick={handleClose}>Cancel</Button>
            {/* <Button onClick={handleDelete}>Confirm</Button> */}
            <Button onClick={handleAdd}>Save</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import EditIcon from "@mui/icons-material/Edit";


import { useContext } from 'react';
import SettingsContext from "../context/SettingsContext.jsx";

// import Button from '@mui/material/Button';
import EditTemplateTextField from './EditTemplateTextField.js';

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

export default function DeleteModal() {
  const settings = useContext(SettingsContext);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    const templateLabel = settings.templateLabel;

    if (templateLabel === 'Default') {
      alert('You cannot edit the Default Template');
      return handleClose();
    }

    setOpen(true);
  };

  const [newName, setNewName] = React.useState('');

  function handleEdit(e) {
    const templateLabel = settings.templateLabel;

    const templatesCopy = JSON.parse(JSON.stringify(settings.templates));

    delete templatesCopy[templateLabel];

    settings.setTemplates(templatesCopy);

    const defaultTemplate = settings.templates.Default;

    settings.changeTemplate(defaultTemplate);
    settings.setTemplateLabel('Default');

    return handleClose();
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}> */}
      <EditIcon onClick={handleOpen} />
      {/* </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id='edit-template-name'>
            <EditTemplateTextField newName={newName} setNewName={setNewName} />
          </div>

          <div className='confirmation'>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEdit}>Confirm</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
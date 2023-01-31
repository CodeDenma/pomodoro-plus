import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useContext } from 'react';
import SettingsContext from "../context/SettingsContext.jsx";

// import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // borderRadius: '2%',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

export default function DeleteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const settings = useContext(SettingsContext);

  function handleDelete(e) {
    const templateLabel = settings.templateLabel;

    if (templateLabel === 'Default') {
      alert('You cannot delete the Default Template');
      return handleClose();
    }

    const templatesCopy = JSON.parse(JSON.stringify(settings.templates));

    delete templatesCopy[templateLabel];

    settings.setTemplates(templatesCopy);

    const defaultTemplate = settings.templates.Default;

    settings.changeTemplate(defaultTemplate);
    settings.setTemplateLabel('Default');

    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <DeleteForeverIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            Are you sure you want to delete the&nbsp;
            <b>
              {settings.templateLabel}
            </b>
            &nbsp; template?
          </div>

          <div className='confirmation'>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete}>Confirm</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
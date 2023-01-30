import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useContext } from 'react';
import SettingsContext from '../context/SettingsContext.jsx';

export default function TemplateLabels() {
  const settings = useContext(SettingsContext);

  const [templateLabel, setTemplateLabel] = useState('Default');

  const formControlSX = {
    m: 1,
    minWidth: 200,
  };

  const handleChange = (event) => {
    const templateName = event.target.value;

    const templateObject = settings.templates[templateName];


    settings.changeTemplate(templateObject);
    settings.setCount(1);

    setTemplateLabel(templateName);
  };

  const menuItems = Object.keys(settings.templates).map((name, index) => {
    return <MenuItem key={index} value={name}>{name}</MenuItem>;
  });

  return (
    <div id="template-labels">
      <FormControl sx={formControlSX}>
        <InputLabel id="demo-simple-select-helper-label">Template</InputLabel>
        <Select
          value={templateLabel}
          label="Template"
          onChange={handleChange}
        // onMouseEnter={() => console.log('hello world')}
        // onMouseLeave={() => console.log('goodbye world')}
        >
          {menuItems}
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
    </div>
  );
}
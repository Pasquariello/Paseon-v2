import React, { useEffect, useState } from 'react';
import {Box, Tabs, Tab, Typography, TextField, } from '@mui/material';
import { styled } from '@mui/material/styles';

import SwipeableViews from 'react-swipeable-views';

import FieldOptions from './FieldOptions'
import shortid from 'shortid';
import EditField from './EditField';
import CustomFieldAdd from '../customFieldAdd'
import { useTheme } from '@mui/material/styles';

import {useDispatch, useSelector} from 'react-redux';


const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(12),
    marginRight: theme.spacing(0),
    color: 'rgba(000, 000, 000, 0.4)',
    '&.Mui-selected': {
      color: '#000',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function PanelControls({isEdit, setIsEdit, formTitle, setFormTitle, 
  addNewField, 
  fieldList, 
  setFieldList, 
  editField,
  setIsDragging
 }) {
  const theme = useTheme();

  const {selectedField} = useSelector(state => state.formDetails);

  useEffect(() => {
    if (selectedField) {
      setValue(1);
    }
  }, [selectedField]);


  const [ customField, setCustomField ] = useState({
    name: '',
    type: '',
    default: '',
    options: {
    values: [],
    defaults: [],
    required: false,
    columnCount: 1, // TODO - add ability to set num columns
    },
})
  // TABS STFF END
  

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  return (
      <Box 
        p={2}
      >


      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Options"
      >
        <StyledTab label="Form Controls" />
        <StyledTab label="Custom Input" />
        <StyledTab label="Submission Settings" />
      </Tabs>

    
          <TextField
              margin="dense"
              required
              fullWidth
              id="form-title"
              label="Form Title"
              name="title"
              size="small"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
          />


   
     
        <TabPanel value={value} index={0} dir={theme.direction}>
          
          <Typography variant="h6">Common</Typography>
  
          <FieldOptions
            setFieldList={setFieldList}
            addNewField={ addNewField }
            fieldList={fieldList}
            isEdit={isEdit}
            editField={editField}
            variant="common"
          />
         
          <Box mt={2} mb={1}>
            <hr/>
          </Box>
          <Typography variant="h6">Basic</Typography>
          
          <FieldOptions
            setFieldList={setFieldList}
            addNewField={ addNewField }
            fieldList={fieldList}
            isEdit={isEdit}
            editField={editField}
            variant="basic"
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CustomFieldAdd 
              editField={editField}
              addNewField={addNewField} 
              customField={customField} 
              setCustomField={setCustomField} 
              selectedField={selectedField} 
              fieldList={fieldList} 
              setFieldList={setFieldList} 
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>

 
      </Box>

  );
}

export default PanelControls;

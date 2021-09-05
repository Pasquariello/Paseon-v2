import React, { useRef, useState } from 'react';
import {AppBar, Box, Tabs, Tab, Typography, TextField } from '@material-ui/core';
import FieldOptions from './FieldOptions'
import shortid from 'shortid';
import EditField from './EditField';
import CustomFieldAdd from '../AddCustomField'

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function PanelControls({isEdit, setIsEdit, formTitle, setFormTitle, 
  addNewField, 
  fieldList, 
  setFieldList, 
  commonFields, 
  editField,
  setIsDragging
 }) {
  let resultsRef = useRef();

  // TABS STUFF START
  // const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  
 
  return (
      <Box 
        p={2} 
        style={{
          // minWidth: '400px', 
          display: 'flex',
          maxHeight: '100vh', 
          position: 'relative',
          flex: 1,

        }}
      >
        <Box 
          style={{
              top: '0',
              // left: 0,

              // position: 'absolute',
              flex: 1,
              margin: '0 auto',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              border: '1px solid blue'
          }}
        >


{/* Tab container Start */}

{/* <AppBar position="static">
  <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab
            value="one"
            label="Item One"
            // {...a11yProps('one')}
          />
          <Tab value="two" label="Item Two" 
          // {...a11yProps('two')} 
          />
          <Tab value="three" label="Item Three"
          //  {...a11yProps('three')} 
           />
        </Tabs>
</AppBar> */}
      {/* <TabPanel value={value} index="one"> */}
        <FieldOptions
          setFieldList={setFieldList}
          addNewField={ addNewField }
          fieldList={fieldList}
          isEdit={isEdit}
          // setIsDragging={setIsDragging}
          commonFields={commonFields}
          // handleOnDrop={handleOnDrop}

          editField={editField}
        />
      {/* </TabPanel>
      <TabPanel value={value} index="two"> */}
        <CustomFieldAdd 
            editField={editField}
            addNewField={addNewField} 
            customField={customField} 
            setCustomField={setCustomField} 
            // selectedField={selectedField} 
            fieldList={fieldList} 
            setFieldList={setFieldList} 
        />
      {/* </TabPanel>
      <TabPanel value={value} index="three"> */}
      {/* <EditField setIsEdit={setIsEdit} />  */}
      {/* </TabPanel> */}

{/* Tab container end */}



          <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="form-title"
              label="Form Title"
              name="title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
          />
          {/* {
            isEdit 
            ? <EditField setIsEdit={setIsEdit} /> 
            : (
              <FieldOptions
                setFieldList={setFieldList}
                addNewField={ addNewField }
                fieldList={fieldList}
                isEdit={isEdit}
                
                commonFields={commonFields}
                handleOnDrop={handleOnDrop}

                editField={editField}
              />
            )   
          } */}
        </Box>
      </Box>

  );
}

export default PanelControls;

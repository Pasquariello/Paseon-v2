import React, { useRef } from 'react';
import { Box, TextField } from '@material-ui/core';
import FieldOptions from './FieldOptions'
import shortid from 'shortid';
import EditField from './EditField';


function PanelControls({isEdit, setIsEdit, formTitle, setFormTitle, 
  addNewField, fieldList, setFieldList, commonFields, handleOnDrop, editField
 }) {
  let resultsRef = useRef();
  
 
  return (
      <Box 
        p={2} 
        style={{
          // minWidth: '400px', 
          // width: '33%', 
          maxHeight: '100vh', 
          position: 'relative'
        }}
      >
        <Box 
          style={{
              top: '0',
              left: 0,
              margin: '0 auto',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              border: '1px solid red'
          }}
        >
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="form-title"
              label="Form Title"
              name="title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
          />
          {
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
          }
        </Box>
      </Box>

  );
}

export default PanelControls;

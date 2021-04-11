import React, { useRef } from 'react';
import { Box, TextField } from '@material-ui/core';
import FieldOptions from './FieldOptions'
import shortid from 'shortid';
import EditField from './EditField';


function PanelControls({dataList, setDataList, isEdit, setIsEdit, formTitle, setFormTitle, 
  addNewField, selectedField, fieldList, setFieldList,
 }) {
  let resultsRef = useRef();
  // const addNewField = (newField) => {
  //   const { name, type, label } = newField;
  //   console.log('name', name)
  //   const tempArray = dataList;
  //   const newTempArray = [
  //       ...tempArray, 
  //       {
  //           id: shortid.generate(), 
  //           subItems: [
  //               {
  //                   id: shortid.generate(), 
  //                   name,
  //                   label,
  //                   type, 
  //                   row: dataList.length, 
  //                   col: 0, 
  //               }
  //           ] 
  //       }
  //   ]
  //   setDataList(newTempArray);
    
  //   // scrollToRef();

  // }

//   const scrollToRef = () => {
//     // Need to wait for DOM to update after elem has been added to list
//     setTimeout(function(){ 
//         resultsRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
//     }, 100);
//   } 


  return (
      <Box p={2} style={{ minWidth: '400px', width: '33%', maxHeight: '100vh', position: 'relative'}}>
        <Box 
          style={{
              top: '0',
              left: 0,
              margin: '0 auto',
              textAlign: 'center',
              whiteSpace: 'nowrap',
          }}
        >
          {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="form-title"
              label="Form Title"
              name="title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
          /> */}
          {
            isEdit 
            ? <EditField setIsEdit={setIsEdit} /> 
            : (
              <FieldOptions
                dataList={dataList}
                setDataList={setDataList}
                selectedField={selectedField}
                setFieldList={setFieldList}

                addNewField={ addNewField }
                fieldList={fieldList}
                isEdit={isEdit}
              />
            )   
          }
        </Box>
      </Box>

  );
}

export default PanelControls;

import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import FormDnDSandbox from "./FormDnDSandbox";
import shortid from 'shortid';
import PanelControls from "./PanelControls";
import ActionControls from './ActionControls';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// NEW 
import {addField, fetchFormData} from 'src/store/formDetailsSlice';

import FormBuilderProvider from 'src/context/FormBuilderContext';

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = {...payload, id: payload.id || shortid.generate() };
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};


const FormBuilderView = React.memo( ({formData }) => {

  const dispatch = useDispatch();

  const params = useParams();

  const formId = params.id;

  useEffect(() => {
    if (formId) dispatch(fetchFormData(formId));
  }, [dispatch, formId]);

  // const dataList = [];
  
  // const form = useSelector((state) => useSelector(state,  ));
  const {id} = useSelector(state => state.formDetails);
  const form = useSelector(state => state.formDetails);

  const {rows} = useSelector(state => state.formDetails);

  const [isEdit, setIsEdit] = useState(null);
  const [formTitle, setFormTitle] = useState('');

  const  addNewField = (newField) => {
    const { name, type, label, options } = newField;
    const formId = id || shortid.generate();

    const rowId = shortid.generate()
    const rowPosition = rows?.length || 0;
    const column = {
      id: shortid.generate(), 
      fields: [...newField],
      name,
      label,
      type, 
      options,
      position: form?.fields?.columns.length || 0, // TAYLOR todo - migrate to formDetails
      rowPosition, 
      // col: 0, 
      width: 50,
      rowId,
    }


    const newRow = {
        id: rowId,
        position: rowPosition,
        formId: id || formId,
        colCount: 1,
        // DEPENDING ON HOW PASSING COLUMN!
        columns: [ {id: column.id, position: column.position}],
        // columns: [ ...columns, column]

    }

      
  
      // const formFoo = {
      //   id: id || formId,
      //   title:  form?.title || '',
      //   rows: [ ...rows, newRow.id],
      //   row: newRow,
      //   column: item,
      //   columns:  [ ...columns, item],
      // }
      const formFoo = {
        id: id || formId,
        name: form?.title || '',
        rows: [ ...rows, newRow],
        columns: [column],  

        // columns: [ ...columns, column],  
        row: newRow,
        column: column,
      }


   

      dispatch(
        addField(formFoo)
      )    
  }
 
  const [controlPanelOpen, setControlPanelOpen] = useState(true);

  const toggleControlPanel = () => {
    setControlPanelOpen(!controlPanelOpen);
  }

  return (
    <FormBuilderProvider>
    <Box display="flex" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        flex: 1
      }}>
        <Box 
          style={{
            display: 'flex',
            overflow: 'hidden',
            width: '100%',
            flex: 1,

          }}
        >

          <div 
            style={{
              backgroundColor: '#ddd',
              borderRight: '1px solid',
              position: 'relative',
            }}
          >
             <div style={{
              position: 'absolute',
              right: -26,
              bottom: 10,
            }}>
              <IconButton 
                style={{background: '#d9d', color: '#fff'}} variant="contained"
                onClick={toggleControlPanel}
              >
                { 
                  controlPanelOpen 
                  ? <KeyboardArrowLeftIcon fontSize="large"/> 
                  : <KeyboardArrowRightIcon fontSize="large"/>
                }
                
              </IconButton>
            </div>
            <Box 
              flexDirection="column" 
              style={{
                overflowY: 'scroll',
                width: controlPanelOpen ? 350 : 0,
                position: 'relative',

              }}
            >
              <PanelControls
                addNewField={addNewField}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                formTitle={formTitle || ''}
                setFormTitle={setFormTitle}
              /> 
            </Box>
          </div>
  
          <Box 
            m={2}
            flexDirection="column" 
            style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              alignItems: 'center',
            }}
          >
            <ActionControls 
              formTitle={formTitle}
            />

   
           
                {/* TODO - rename */}
  
                <FormDnDSandbox
                  addNewField={addNewField}
                  />
          </Box>
        </Box> 
    </Box>
    </FormBuilderProvider>
  );
});

// function mapStateToProps(state) {
//   const { forms } = state
//   return { formData: forms.selected }
// }

// export default connect(mapStateToProps)(FormBuilderView);
export default FormBuilderView;

// TODO list 
/*
1. clean up all foo and bar variables
2. remove all unused code
3. clean up form actions - remove unesed actions clean up naming 
4. clean up form reducer - remove unesed redcuers clean up naming 
5. create an "update" form method
6. updata onCard 'column' vars
7. clean up 'scene' object and all instances of use
8. consolodate formData and dataList - this will include a rework of "selected and structureForm" in the reducer
9. move selected form into state for component and away from redux, (redux can hold id, and name, maybe untransformed fields?)
when I do this I wll need to swap the row in the row comp to be a passed in prop, but first make sure to test
the efficiency of the update/edit form field methods (update title, move etc) before stripping from redux.

Do 9 first!
10. clean up field builder methods, make sure set up for: 
  input, textarea, checkbox, radio, dropdown, date
11. set up options for each
  add another checkbox / radio to group
  set defaul, placeholder, is required
  is hidden if 
  customize ID selectors? 
12. standardize field model
13.style fields in drag and drop
1̶4̶.̶ ̶r̶e̶ ̶a̶d̶d̶ ̶"̶a̶d̶d̶ ̶f̶i̶e̶l̶d̶ ̶o̶n̶ ̶c̶l̶i̶c̶k̶"̶ ̶m̶e̶t̶h̶o̶d̶
̶15. set up desktop preview
16. mobile preview
17. tablet preview
. start field advanced settings - include rules, requirements
*/
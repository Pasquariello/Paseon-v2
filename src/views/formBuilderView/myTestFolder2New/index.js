import React, { useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch, connect } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction, setFormStructure, changeField} from 'src/actions/formActions';
import { Box, Button } from '@material-ui/core';
import FormDnDSandbox from "./FormDnDSandbox";
import shortid from 'shortid';
import PanelControls from "./PanelControls";
import ActionControls from './ActionControls';

import FormFieldModel from 'src/models/formFieldModel';

import {commonFields } from 'src/utils/commonFields';

// NEW 
import {addField, selectFormById} from 'src/store/formsSlice'


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
  const dataList = [];
  
  // const form = useSelector((state) => useSelector(state,  ));
  const form = useSelector(state => state.forms)
  const [id, setId] = useState();
  
  useEffect(() => {
   if (form.ids) {
     setId(form.ids[0])
    }
  }, [form])
  // const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  // const [ fieldList, setFieldList ] = useState(formData?.fields)
  const [isEdit, setIsEdit] = useState(null);
  // const [elemWidth, setElemWidth] = useState(false);
  const [formTitle, setFormTitle] = useState('');


  


  const addNewField = (newField) => {
    const { name, type, label, options } = newField;
    const position = form?.fields?.length || 0
    console.log(form)
    const formId = id || shortid.generate();
    const columns = form?.row?.columns || []
    const rows = form?.entities[id]?.rows || []

    const item = {
      id: shortid.generate(), 
      name,
      label,
      type, 
      options,
      position: form?.fields?.columns.length || 0,
      row: dataList.length, 
      col: 0, 
      width: 50
    }
    const newRow = {
        id: shortid.generate(),
        position: rows.length,
        formId: id || formId,
        columns: [ ...columns, item.id]
    }

    const fieldsCopy = form?.entities[id]?.fields ? form.entities[id].fields : []
      
  
    console.log('rows', rows)
      const formFoo = {
        id: id || formId,
        title:  form?.title || '',
        rows: [ ...rows, newRow.id],
        row: newRow,
        column: item
      }
      dispatch(
        addField(formFoo)
      )    
  }
 

    const [commonFieldsState, setCommonFieldsState] = useState(commonFields)

  return (
 
    <Box display="flex" 
      style={{
      // border: '1px solid', flex: 1, height: '100%', overflow: 'hidden'
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
        <Box 
        
        style={{
          backgroundColor: 'green',
          // flex:2,
          display: 'flex',
          overflow: 'hidden',
          height: '100%',
        }}>
          <Box flexDirection="column" style={{
            backgroundColor: 'yellow',
            flex: 0,
          }}>

            <PanelControls
              addNewField={addNewField}
              fieldList={dataList}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              formTitle={formTitle || ''}
              setFormTitle={setFormTitle}
              commonFields={commonFieldsState}
              handleOnDrop={e => {
                return setCommonFieldsState( applyDrag(commonFieldsState, e) )
              } }
              // editField={editField}
            /> 
          </Box>
  
          <Box 
            flexDirection="column" 
            style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              height: '100%'
            }}
          >
            <ActionControls 
                formTitle={formTitle}
                dataList={[]}
            />
              <Box
                m={2}
                style={{
                  background: 'red',
                  overflow: 'auto',
                  height: '100%',
                  border: '1px dashed',
                  flex: "1 1 auto",
                  overflowY: "auto",
                  minHeight: "0px",
                }}
                
              >
                {/* TODO - rename */}
                <FormDnDSandbox/>
              </Box>
          </Box>
        </Box> 
    </Box>
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
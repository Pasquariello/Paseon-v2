import React, { useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch, connect } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction, changeField} from 'src/actions/formActions';
import { Box, Button } from '@material-ui/core';
import MyList from "./MyList";
import shortid from 'shortid';
import PanelControls from "./PanelControls";
import ActionControls from './ActionControls';

import FormFieldModel from 'src/models/formFieldModel';

import {commonFields } from 'src/utils/commonFields';

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = {...payload, id: shortid.generate() };
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.forms.structuredForm)
  // const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  const [ fieldList, setFieldList ] = useState(formData?.fields)
  const [isEdit, setIsEdit] = useState(null);
  const [elemWidth, setElemWidth] = useState(false);
  const [formTitle, setFormTitle] = useState('');


  useEffect(() => {

    const formElementsList = formData ? formData.fields : [];
    // const formElementsList = dataList || [];
    console.log('formElementsList', formElementsList)
    console.log('dataList', dataList)

    // setFieldList(formData?.fields)
    const title = formData ? formData.name : '';
    setFormTitle(title);
    if (formElementsList.length) {
      console.log('formElementsList', formElementsList)
        buildArrayMatrix(formElementsList);
    }
 
  }, [formData]);

  useEffect(() => {
    if (id) {
      console.log('ID', id)
        dispatch(getSingleForm(id))
    }
  }, [dispatch, id])

  const buildArrayMatrix = (array) => {
    let tempArray = [];
    const arrayCopy = array;

    // Build Matrix from array list based on element row
    arrayCopy.map((el, index) => {
        if (tempArray[el.row]){
            tempArray[el.row].splice(el.col, 0, el)
            return el

        } else {
            tempArray.push([el])
            return {...el, row: tempArray.length - 1 }
        }
    });
    console.log('formModel(tempArray)', formModel(tempArray))
    // this on is calling the name form 
    dispatch(addNewFieldAction(formModel(tempArray)))
  }


    // transform above matrix into array of rows
    // update column index to be sequential and set row to correct index
    const formModel = (arr) => {
      return arr.map((row, rowIndex) => {
        return {
          // id: `${rowIndex}`,
          id: shortid.generate(),
          subItems: row.map((formField, formFieldIndex) => {
              const { label, name, type, _id, width } = formField
      
              return {
                  id: _id?.$oid ? _id?.$oid : formField.id, //shortid.generate(),
                  label,
                  name,
                  type,
                  col: formFieldIndex, 
                  row: rowIndex,
                  width,
              }
          })
        }
      }) 
    }
  


  const obj = {
      type: "container",
      props: {
        orientation: "vertical"
      },
      dataList
    //   dataList:  [
    //     {id: '1', subItems: [{id: '11', name: 'name'}, {id: '12', name: 'phone'}]},
    //     {id: '2', subItems: [{id: '21', name: 'email'}, {id: '22', name: 'address'}]}
    // ]
  }
  const selectedField = useSelector(state => state.forms.selectedField)

  const editField = (e) => {
    console.log('HI')
    if (selectedField) {

      const newArray = dataList.map((row, rowIndex) => {
        const newSubItems = row.subItems.map((col, colIndex) => {
            if (col.id === selectedField.colId) {
                console.log('colId', col.id)
                return {...col, ['label']:  e?.target.value}
            }
            return col
        })
        return {...row, subItems: newSubItems}
      })

      console.log('NEW ARRAY', newArray)
      dispatch(changeField(newArray))
    }
  }


   const addNewField = (newField) => {
      const { name, type, label, options } = newField;
  
      const item = {
        id: shortid.generate(), 
        name,
        label,
        type, 
        options,
        row: dataList.length, 
        col: 0, 
        width: 50
      }

      const copy = [...dataList];
      const lastIndex = dataList.length - 1;
      copy.splice(lastIndex, 1, { ...dataList[lastIndex], subItems: [item]} )
      
      const fooTest = !dataList[lastIndex].subItems.length 
        ?  copy
        : [
          ...dataList, 
          {
            id: shortid.generate(), 
            subItems: [ item ] 
          }
        ]
        console.log('fooTest', fooTest)
      dispatch(addNewFieldAction(fooTest))
    }
  
  
    const onRowDrop = (dropResult) => {
      const scene = Object.assign({}, obj);
  
 
        scene.dataList = applyDrag(scene.dataList, dropResult);
        dispatch(addNewFieldAction(scene.dataList))


    }
  
    
       const getCardPayload = (rowId, index) => {
       
        const foo = obj.dataList.filter(p => p.id === rowId)[0].subItems[
          index - 1
        ];

        return obj.dataList.filter(p => p.id === rowId)[0].subItems[
          index -1
        ];
      }

    const onCardDrop = (rowId, dropResult)  => {
     
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, obj);
        
        const column = scene.dataList.filter(p => p.id === rowId)[0];
        const rowIndex = scene.dataList.indexOf(column);

        const newColumn = Object.assign({}, column);
        const dropResultCopy = {...dropResult, payload: {...dropResult.payload, row: rowIndex}}
        newColumn.subItems = applyDrag(newColumn.subItems, dropResultCopy);
        scene.dataList.splice(rowIndex, 1, newColumn);
        dispatch(addNewFieldAction(scene.dataList))

     
      }
    }
  

    const [commonFieldsState, setCommonFieldsState] = useState(commonFields)

  return (
 
    <Box display="flex" height="100%" width="">

      {/* Panel Start */}
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

            editField={editField}

      />  
      {/* Panel End */}
 
        {/* FORM DROP ZONE START */}
        <Box m={2} p={2} style={{minWidth: '750px'}}>

        <ActionControls 
            formTitle={formTitle}
            dataList={obj.dataList}
        />

        <MyList
            onRowDrop={onRowDrop}
            onCardDrop={onCardDrop}
            getCardPayload={getCardPayload}
            dataList={obj.dataList.length ? obj.dataList : []}
        />

    
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
  );
});

function mapStateToProps(state) {
  const { forms } = state
  return { formData: forms.selected }
}

export default connect(mapStateToProps)(FormBuilderView);

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
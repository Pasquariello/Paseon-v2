import React, {useEffect, useContext, useState, useCallback} from 'react';
import Row from "./Row";
import Column from "./Column";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container, Draggable } from "react-smooth-dnd";
import {fetchFormData, moveRow, moveCol, clearEmptyRows, incrementRowColCount, decrementRowColCount} from 'src/store/formDetailsSlice';

import {Box, Button, TextField, Typography} from '@mui/material';
import { FormBuilderContext } from 'src/context/FormBuilderContext';


import ContentEditable from 'react-contenteditable'


// todo move to util file and delete
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];

  let itemToAdd = payload;

  if (removedIndex !== null) {

    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {

    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};


const myfieldsOrig = [
  {
    id: 88,
    fields: [
      {
        label: 'First Name T',
        value: 'Taylor'
      }
    ],
    half: true,
    row: 0,
    col: 0
  }, 
  {
    id: 2,
    fields: [
      {
        label: 'last Name',
        value: 'Sylvia'
      }
    ],    
    half: true,
    row: 0,
    col: 1,
  },
  {
    id: 3,
    fields: [
      {
        label: 'age',
        value: 'Huron'
      }
    ],    
    row: 1,
    col: 0,
    half: false,
  },
  {
    id: 4,
    fields: [
      {
        label: 'dob',
        value: 'Barley'
      }
    ],    
    row: 2,
    col: 0,
    half: true,
  },
  {
    id: 5,
    fields: [
      {
        label: 'occupation',
        value: 'Bear'
      }
    ],    
    row: 2,
    col: 1,
    half: true,

  },
  {
    id: 6,
    fields: [
      {
        label: 'Favorite Snack',
        value: 'Gabrielle'
      }
    ],    
    row: 3,
    col: 0,
    half: false,

  },
  {
    id: 7,
    fields: [
      {
        label: 'Favorite Star',
        value: 'Selina'
      }
    ],    
    row: 4,
    col: 0,
    half: false,
  },
];



const  FormDnDSandbox = React.memo((props) => {
  const { buildRows, rows2, setRows2, rows, myfields, setMyfields, addNewField} = useContext(FormBuilderContext);


  useEffect(() => {
    // const structuredRow = 
    buildRows(myfieldsOrig);
    // console.log('structuredRow', structuredRow)
    // setRows(structuredRow);

    const obj = myfieldsOrig.reduce((o, key) => ({ ...o, [key.id]: key.fields}), {})
    console.log('obj', obj)
    console.log("")
    setMyfields(obj)


    
  }, [setMyfields]);

  const handleEditLabel = useCallback( ({value, fieldIndex, colId, myfields}) => {
    
    // console.log('ID', id)
    const row = myfields[colId].map((field, index) => {
          if (index === fieldIndex){
            return {
              ...field,
              label: value
            }
          }
          return field
        }) 

    setMyfields({...myfields,
      [colId]: row
    })

  }, [setMyfields]);


  const handleRowDrop = (dropResult) => {
    console.log('dropResult row', dropResult)

  
    if (dropResult.removedIndex === null) {
      console.log('IF')
      const fooDropResult = {
        ...dropResult,
        removedIndex: dropResult.payload.row,
        payload: {
          columns: [dropResult.payload],
          rowId: "9zscoBiWu8",
        }
      }
      const item = {
        columns: [dropResult.payload],
        rowId: "9zscoBiWu8",
      };

      const rows2Copy = [...rows2]; 
      const elem = rows2Copy.splice(dropResult.payload.row, 1)[0];
      rows2Copy.splice(dropResult.addedIndex, 0, elem);
  
      console.log('rows2Copy', rows2Copy)


      const fooDragResults  = applyDrag(rows2Copy, fooDropResult) 
      setRows2(fooDragResults)
      // console.log('fooDragResults', fooDragResults)
    } 
    else {
      console.log('ELSE')

      const dragResults  = applyDrag(rows2, dropResult) 
      console.log('dragResults', dragResults)
      setRows2(dragResults)
  
    }
   
    // Origninal working stuff
    // const dragResults = dropResult.payload.length ? applyDrag(rows, dropResult) 
    // : applyDrag(rows, {...dropResult, payload: [dropResult.payload], removedIndex: dropResult.payload.row});
    // const dragResults  = applyDrag(rows, dropResult) 
    

    // const updatedRows = dragResults.map((row, rowIndex) => {
    //   return row.map(field => {
    //     return {...field, row: rowIndex}
    //   }) 
    // })
  
    // setRows(updatedRows)
  }

  const handleCardDrop = (rowIndex, dropResult) => {

    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const row = rows2[rowIndex].columns;
  
      const newCol = applyDrag(row, dropResult);

      const updatedCols = newCol.map((col, colIndex) => {
        return {
          ...col, 
          col: colIndex,
          row: rowIndex,
        }
      });
      
      console.log(updatedCols)
  
      const updatedRows = rows2.map((row, i) => {
        if (rowIndex === i) {
          return {
            ...row,
            columns: updatedCols
          }
        }
        return row
      })
      setRows2(updatedRows);

     
    }


  }

  const  handleToggleWidth = (rowIndex, colIndex) => {
    const newRows = rows2[rowIndex].columns.map((col, i) => {
      const colSize = i === colIndex ? !rows2[rowIndex].columns[colIndex].half : rows2[rowIndex].columns[colIndex].half;
      return {
        rowId: shortid.generate(),
        columns: [{
          ...col,
          half: colSize,
        }]
      }
    });
    
    const rowsCopy = [...rows2];
    rowsCopy.splice(rowIndex, 1, ...newRows)
    console.log('rowsCopy', rowsCopy)
    setRows2(rowsCopy);
  }

 
  console.log("rows2", rows2)

  const [editField, setEditField] = useState();

    return ( 
      <div
        style={{
        overflow: 'auto',
        border: '1px dashed blue',
        overflowY: "auto",
        width: '50%',
      }}
      
    >
        form container
        <Button onClick={addNewField}>addNewField test button</Button>
                <Button onClick={() => console.log('rows', rows)}>Print state</Button>

          edit field: {editField?.name}      
        <Container
          groupName="row" // contains all draggble rows
          style={{
            background: '#f6f6f6',
            border: '1px dashed black',
          }}
          orientation="vertical"
          onDrop={handleRowDrop}
          getChildPayload={index =>rows2[index]}
          // dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}      
        >

          {rows2.map((row, rowIndex) => {
            return (

             <Row
              key={row.rowId}
              handleEditLabel={handleEditLabel}
              rowLength={row.columns.length}
              rowId={row.rowId}
              row={row}
              rowIndex={rowIndex}
              handleCardDrop={handleCardDrop}
              // handleRowDrop={handleRowDrop}
              handleToggleWidth={handleToggleWidth}
             />
            )
          })}   
        </Container> 
        </div> 
    );
})

export default FormDnDSandbox;

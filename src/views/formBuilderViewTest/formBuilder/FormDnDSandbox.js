import React, {useEffect, useContext, useCallback} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';
import { Container } from "react-smooth-dnd";
import {Button } from '@mui/material';
import { FormBuilderContext } from 'src/context/FormBuilderContext';

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



const  FormDnDSandbox = (props) => {
  const { buildRows, rows2, setRows2, rows, setMyfields, addNewField} = useContext(FormBuilderContext);


  useEffect(() => {
    buildRows(myfieldsOrig); // this will call setRows2

    const obj = myfieldsOrig.reduce((o, key) => ({ ...o, [key.id]: key.fields}), {})

    setMyfields(obj)

  }, [setMyfields]);

  const handleEditLabel = useCallback( ({value, fieldIndex, colId, myfields}) => {
    
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

  
    if (dropResult.removedIndex === null) {

      const rows2Copy = [...rows2]; 
      const elem = rows2Copy.splice(dropResult.payload.row, 1)[0];
      rows2Copy.splice(dropResult.addedIndex, 0, elem);
  
      const updatedRows = applyDrag(rows2Copy, dropResult) 
      setRows2(updatedRows)
    } 
    else {
      const dragResults  = applyDrag(rows2, dropResult) 
      setRows2(dragResults)
    }
   
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
    setRows2(rowsCopy);
  }

 
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
              handleToggleWidth={handleToggleWidth}
             />
            )
          })}   
        </Container> 
        </div> 
    );
}

export default FormDnDSandbox;

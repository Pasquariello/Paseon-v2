import React, {useEffect, useContext, useState} from 'react';
import Row from "./Row";
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
    id: 1,
    fields: [
      {
        label: 'First Name',
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
  // console.log('rows2', rows2)
  // const [rows, setRows] = useState([]);
  // const [rows2, setRows2] = useState([]);

  // const [myfields, setMyfields] = useState()

  // const rowCount = Math.max.apply(Math, myfields.map(function(field) { return field.row; })) + 1;

  // const buildRows = (arrayToSort) => {
  //   // sort by row
  //   arrayToSort.sort((a, b) => a.row - b.row);
  //   let foo = [...arrayToSort]
  //   foo.sort((a, b) => a.row - b.row);

  //   let rowArray = [];
  //   arrayToSort.forEach((field, index) => { 
  //     const col = {
  //       id: field.id,
  //       row: field.row,
  //       col: field.col,
  //       half: field.half,
  //     }
  //     if (rowArray[field.row]){
  //       rowArray[field.row] = [...rowArray[field.row], col]
  //     } 
  //     else { 
    
  //       rowArray.push([col]) 
  //     }
  //   })

  //   let rowArray2 = [];
  //   foo.forEach((field, index) => { 
  //     const col = {
  //       id: field.id,
  //       row: field.row,
  //       col: field.col,
  //       half: field.half,
  //     }
  //     if (rowArray2[field.row]){
  //       rowArray2[field.row] = {...rowArray2[field.row], columns: [...rowArray2[field.row].columns, col]}
  //     } 
  //     else { 
    
  //       rowArray2.push({
  //         rowId: shortid.generate(),
  //         columns: [col]
  //       }) 
  //     }
  //   })
  //   console.log('HERE', rowArray2)
  //   setRows2(rowArray2)
  //   console.log('rowArray', rowArray)
  //   return rowArray;

  // }


  useEffect(() => {
    const structuredRow = buildRows(myfieldsOrig);
    console.log('structuredRow', structuredRow)
    // setRows(structuredRow);

    const obj = myfieldsOrig.reduce((o, key) => ({ ...o, [key.id]: key.fields}), {})
    console.log('obj', obj)

    setMyfields(obj)
    
  }, []);

  // const addNewField = () => {
  //   // const newRow = [
  //   //   {
  //   //     fields: [
  //   //       {
  //   //         label: 'First Name',
  //   //         value: 'Test New'
  //   //       }
  //   //     ],
  //   //     half: false,
  //   //     col: 0,
  //   //     row: rows.length + 1,
  //   //   }
  //   // ]
  //   const newId = Math.floor(Math.random() * 1000);
  //   const col = {
  //     id: newId,
  //     row: rows.length + 1,
  //     col: 0,
  //     half: false,
  //   }

  //   const fieldSet = {
  //     value: 'New',
  //     label: 'New'
  //   }

  //   setRows2([
  //     ...rows2,
  //     {
  //       rowId: shortid.generate(),
  //       columns: [col]
  //     }
  //   ])

  //   setRows([...rows, [col]])
  //   setMyfields({...myfields, [newId]: [fieldSet]})

  // }



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
    console.log(rowIndex)
    console.log('dropResult card', dropResult)

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
          return updatedCols
        }
        return row
      })
      console.log('updatedRows', updatedRows)
      // setRows(updatedRows);

     
    }
    // if col to row


  }

  const  handleToggleWidth = (rowIndex, colIndex) => {

    // const newRows = rows2.map((row, ri) => {
    //   if (ri === rowIndex) {
    //       // const colSize = ri === colIndex ? !rows2[rowIndex].columns[colIndex].half : rows2[rowIndex].columns[colIndex].half;
    //       const columns = row.columns.map((col, ci) => {
    //         if (ci === colIndex) {
    //           return {
    //             ...col,
    //             half: !col.half
    //           } 
    //         } 
    //         return col
    //       })
    //     return {
    //       ...row,
    //       columns,
    //     }
    //   }
    //   return row;
    // })
    // const rowsCopy = [...rows];
    // rowsCopy.splice(rowIndex, 1, ...newRows)
    // setRows2(newRows);

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

 

  const [editField, setEditField] = useState();

    return ( 
      <Box
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
          // shouldAcceptDrop={(sourceContainerOptions, payload) => {
          //   if (sourceContainerOptions.groupName === 'col') {
          //     return true
          //   }
          //   return true
          // }}
          // dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}      
        >

          {rows2.map((row, rowIndex) => {
            return (
            <>
             <Row
              key={row.rowId}
              rowLength={row.length}
              rowId={row.rowId}
              row={row}
              rowIndex={rowIndex}
              handleCardDrop={handleCardDrop}
              // handleRowDrop={handleRowDrop}
              handleToggleWidth={handleToggleWidth}
              myfields={myfields}
             />
             </>
            )
          })}   
        </Container> 
        </Box> 
    );
})

export default FormDnDSandbox;

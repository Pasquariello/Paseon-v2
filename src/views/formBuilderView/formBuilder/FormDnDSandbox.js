import React, {useEffect, useContext, useState} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container, Draggable } from "react-smooth-dnd";
import {fetchFormData, moveRow, moveCol, clearEmptyRows, incrementRowColCount, decrementRowColCount} from 'src/store/formDetailsSlice';

import {Box, Button, Typography} from '@mui/material';
import { FormBuilderContext } from 'src/context/FormBuilderContext';


// todo move to util file and delete
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];

  let itemToAdd = payload;
  console.log('ITEM TO ADD', itemToAdd)

  if (removedIndex !== null) {

    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {

    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

// const myfields = [
//   {
//     name: 'Taylor',
//     half: true,
//     row: 0,
//     col: 0
//   }, 
//   {
//     name: 'Sylvia',
//     half: true,
//     row: 0,
//     col: 1,
//   },
//   {
//     name: 'Huron',
//     row: 1,
//     col: 0,
//     half: false,
//   },
//   {
//     name: 'Barley',
//     row: 2,
//     col: 0,
//     half: true,
//   },
//   {
//     name: 'Bear',
//     row: 2,
//     col: 1,
//     half: true,

//   },
//   {
//     name: 'Gabrielle',
//     row: 3,
//     col: 0,
//     half: false,

//   },
//   {
//     name: 'Selina',
//     row: 4,
//     col: 0,
//     half: false,
//   },
// ];


const myfields = [
  {
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
    fields: [
      {
        label: 'First Name',
        value: 'Taylor'
      }
    ],    half: true,
    row: 0,
    col: 1,
  },
  {
    fields: [
      {
        label: 'First Name',
        value: 'Taylor'
      }
    ],    row: 1,
    col: 0,
    half: false,
  },
  {
    fields: [
      {
        label: 'First Name',
        value: 'Taylor'
      }
    ],    row: 2,
    col: 0,
    half: true,
  },
  {
    fields: [
      {
        label: 'First Name',
        value: 'Taylor'
      }
    ],    row: 2,
    col: 1,
    half: true,

  },
  {
    fields: [
      {
        label: 'First Name',
        value: 'Taylor'
      }
    ],    row: 3,
    col: 0,
    half: false,

  },
  {
    fields: [
      {
        label: 'First Name',
        value: 'Taylor'
      }
    ],    row: 4,
    col: 0,
    half: false,
  },
];



const  FormDnDSandbox = React.memo((props) => {

  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  // const rowCount = Math.max.apply(Math, myfields.map(function(field) { return field.row; })) + 1;

  const buildRows = (arrayToSort) => {
    // sort by row
    arrayToSort.sort((a, b) => a.row - b.row);

    let rowArray = [];
    arrayToSort.forEach((field, index) => { 
      if (rowArray[field.row]){
        rowArray[field.row] = [...rowArray[field.row], field]
      } 
      else { 
        rowArray.push([field]) 
      }
    })

    return rowArray;

  }

  useEffect(() => {
    const structuredRow = buildRows(myfields);
    console.log('structuredRow', structuredRow)
    setRows(structuredRow);

  }, []);

  // const addNewField = () => {
  //   const newRow = [
  //     {
  //       name: 'new',
  //       col: 0,
  //       row: rows.length + 1,
  //     }
  //   ]
  //   setRows([...rows, newRow])
  // }



  const handleRowDrop = (dropResult) => {

    const dragResults = dropResult.payload.length ? applyDrag(rows, dropResult) 
    : applyDrag(rows, {...dropResult, payload: [dropResult.payload], removedIndex: dropResult.payload.row});
    

    const updatedRows = dragResults.map((row, rowIndex) => {
      return row.map(field => {
        return {...field, row: rowIndex}
      }) 
    })
    setRows(updatedRows)
  }

  const handleCardDrop = (rowIndex, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const row = rows[rowIndex];
      const newCol = applyDrag(row, dropResult);

      const updatedCols = newCol.map((col, colIndex) => {
        return {
          ...col, 
          col: colIndex,
          row: rowIndex,
        }
      });

  
      const updatedRows = rows.map((row, i) => {
        if (rowIndex === i) {
          return updatedCols
        }
        return row
      })
      setRows(updatedRows);

     
    }


  }

  const  handleToggleWidth = (rowIndex, colIndex) => {
            
    const newRows = rows[rowIndex].map((col, i) => {
      const colSize = i === colIndex ? !rows[rowIndex][colIndex].half : rows[rowIndex][colIndex].half;
      return [{
        ...col,
        half: colSize,
      }];
    })
    
    const test = [...rows];
    test.splice(rowIndex, 1, ...newRows)
    setRows(test);
  }


  const Wrapper = (props) => {
    if (props.length === 1) {
      return (
      <div
      style={{
        width: '100%',
      }}>
        {props.children}
      </div>
      )
    } else {
      return (
      <Draggable
        style={{
          width: '50%',
        }}
      >
         {props.children}
      </Draggable>
      )
    }
  }


  const Wrapper2 = (props) => {
    if (props.half === false) {
      return (
      <div {...props}>
        {props.children}
      </div>
      )
    } else {
      return (
      <Draggable
        {...props}
      >
         {props.children}
      </Draggable>
      )
    }
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
        {/* <Button onClick={addNewField}>addNewField test button</Button> */}
          edit field: {editField?.name}      
        <Container
          groupName="row" // contains all draggble rows
          style={{
            background: '#f6f6f6',
            border: '1px dashed black',
          }}
          orientation="vertical"
          onDrop={handleRowDrop}
          getChildPayload={index =>rows[index]}
          // dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}      
        >

          {rows.map((row, rowIndex) => {
            return (
              <Draggable
                length={row.length}
                key={rowIndex}
                style={{
                  border: '1px dashed black'
                }}
              >
                row {rowIndex}
                <Container
                  orientation="horizontal"
                  onDrop={(e) => handleCardDrop(rowIndex, e)}
                  getChildPayload={index =>rows[rowIndex][index]}
                  index={rowIndex}
                  dragClass="card-ghost"

                  // groupName={`col${rowIndex}`} 
                  groupName='col'
                  rowLength={row.length}
                  fooIndex={rowIndex}
            
                  style={{
                    display: 'flex',
                  }}
                  dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'cards-drop-preview'
                  }} 
               
                 shouldAcceptDrop={(sourceContainerOptions, payload) => {
                    // console.log('sourceContainerOptions', sourceContainerOptions)
                 
                 
                    if (sourceContainerOptions.groupName === 'row' || payload.half === false) {
                      return false
                    }  
                    
                    if(row.some(col => col.half === false)){
                      return false
                    } else {
                      if(row.length === 2){
                        // if(row.some(col => col.name === payload.name)) {
                        if(rowIndex === payload.row) {
                          return true // coming from row currently being dragged from
                        }
                        return false // already has 2 columns
                      } else {
                        return true // all
                      }       
                    }                  
                 }}
                >
                  {row.map((col, colIndex) => {
                     return (
        
                      <Wrapper2
                        half={col.half} // only used if comp is Wrapper2
                        style={{
                          // flex: 1,
                          width: col.half ? '50%' : '100%',
                        }}
                      >
                        <Box
                          sx={{
                            border: '1px dashed black',
                            display: 'flex',

                          }}
                        >
                          <button
                            onClick={() => handleToggleWidth(rowIndex, colIndex)}
                          >{col.half ? 'half' : 'full'}</button>

                          {/* <Typography>{col.name}</Typography> */}

                            {console.log(col)}
                            {col.fields.map(field => {
                              return (
                                <Typography>{field.label}</Typography>
                              )
                            })}


                          <button
                            onClick={() => {
                              setEditField(col)
                              console.log(col)
                            }}
                          >edit me</button>
                        </Box>
                      </Wrapper2>
                    )
                  })}
                </Container>
              </Draggable>
            )
          })}     
        </Container> 


        </Box>  
    );
})

export default FormDnDSandbox;

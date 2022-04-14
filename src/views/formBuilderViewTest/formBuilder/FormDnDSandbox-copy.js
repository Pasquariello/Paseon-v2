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
        label: 'First Name',
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
        label: 'First Name',
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
        label: 'First Name',
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
        label: 'First Name',
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
        label: 'First Name',
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
        label: 'First Name',
        value: 'Selina'
      }
    ],    
    row: 4,
    col: 0,
    half: false,
  },
];



const  FormDnDSandbox = React.memo((props) => {

  const [rows, setRows] = useState([]);
  const [myfields, setMyfields] = useState()
  const [cols, setCols] = useState([]);

  // const rowCount = Math.max.apply(Math, myfields.map(function(field) { return field.row; })) + 1;

  const buildRows = (arrayToSort) => {
    // sort by row
    arrayToSort.sort((a, b) => a.row - b.row);

    let rowArray = [];
    arrayToSort.forEach((field, index) => { 
      const col = {
        id: field.id,
        row: field.row,
        col: field.col,
        half: field.half,
      }
      console.log('col', col)
      if (rowArray[field.row]){
        rowArray[field.row] = [...rowArray[field.row], col]
      } 
      else { 
    
        rowArray.push([col]) 

        // rowArray.push([field]) 
      }
    })
    console.log('rowArray', rowArray)
    return rowArray;

  }


  useEffect(() => {
    const structuredRow = buildRows(myfieldsOrig);
    console.log('structuredRow', structuredRow)
    setRows(structuredRow);
    
    const foo = myfieldsOrig.map(fieldSet => {
      return {
        id: fieldSet.id,
        fields: fieldSet.fields
      }
    })

    const obj = myfieldsOrig.reduce((o, key) => ({ ...o, [key.id]: key.fields}), {})
    console.log('obj', obj)

    setMyfields(obj)
    
  }, []);

  const addNewField = () => {
    // const newRow = [
    //   {
    //     fields: [
    //       {
    //         label: 'First Name',
    //         value: 'Test New'
    //       }
    //     ],
    //     half: false,
    //     col: 0,
    //     row: rows.length + 1,
    //   }
    // ]
    const newId = Math.floor(Math.random() * 1000);
    const col = {
      id: newId,
      row: rows.length + 1,
      col: 0,
      half: false,
    }

    const fieldSet = {
      value: 'New',
      label: 'New'
    }

    setRows([...rows, [col]])
    setMyfields({...myfields, [newId]: [fieldSet]})

  }



  const handleRowDrop = (dropResult) => {
    // new stuff
    console.log('dropResult', dropResult)
    const dragResults  = applyDrag(rows, dropResult) 
    console.log('dragResults', dragResults)
    // get rows at removed index

    // get rows at added index


  
   
    // Origninal working stuff
    // const dragResults = dropResult.payload.length ? applyDrag(rows, dropResult) 
    // : applyDrag(rows, {...dropResult, payload: [dropResult.payload], removedIndex: dropResult.payload.row});
    // const dragResults  = applyDrag(rows, dropResult) 
    

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
    
    const rowsCopy = [...rows];
    rowsCopy.splice(rowIndex, 1, ...newRows)
    setRows(rowsCopy);
  }

  const handleEditLabel = (value, rowIndex, colIndex, fieldIndex, id) => {
    console.log(value, rowIndex, colIndex, fieldIndex)
    
    // const copy = {
    //   ...myfields,
    //   [id]: myfields[id].map((field, index) => {
    //     if (index === fieldIndex){
    //       return {
    //         ...field,
    //         label: value
    //       }
    //     }
    //     return field
    //   }) 
    // }
    setMyfields({...myfields,
      [id]: myfields[id].map((field, index) => {
        if (index === fieldIndex){
          return {
            ...field,
            label: value
          }
        }
        return field
      }) 
    })
  
  
    // const copy = myfields.map(col => {
    //   if (col.id === id) {
    //     const newField = col.fields.map((field, fi) => {
    //       if (fi === fieldIndex) {
    //         return {
    //           ...field,
    //           label: value
    //         }
    //       }
    //       return field
    //     })
    //     return {...col, fields: newField }
    //   }
    //   return col
    // })


    
    // rowsCopy = 'yo';
    // // setRows(rowsCopy);
    // console.log('rowsCopy', rowsCopy)
    // console.log('rows', rows)

    // const copy = rows.map((row, ri) => {
    //   if (ri === rowIndex) {
    //     return row.map((col, ci) => {
    //       if (ci === colIndex) {
    //         console.log('COLS', col)
    //         const newField = col.fields.map((field, fi) => {
    //           if (fi === fieldIndex) {
    //             return {
    //               ...field,
    //               label: value
    //             }
    //           }
    //           return field
    //         })
    //         return {...col, fields: newField }
    //       }
    //       return col
    //     })
    //   }
    //   return row
    // })

    // console.log('copy', copy)
    // setRows(copy)

    // data.name = e.target.value;
    // setDatas([...datas]);


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
                  // groupName={`col${row.length}`} 

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
                   console.log('payload', payload.length)
                    // console.log('sourceContainerOptions', sourceContainerOptions)
                    if (sourceContainerOptions.groupName === 'row') {
                      return false; // must come first
                    }
                    if(rowIndex === payload.row) {
                        return true // coming from row currently being dragged from
                    }
                    if (row.length === 0) { 
                      return true // if empty row
                    }
    
                    if (row.length === 1 && row[0].half && rowIndex !== payload.row && payload.half) {
                      return true;
                    }

                    return false // all other cases
                
                 }}
                >
                  {row.map((col, colIndex) => {
                     return (
        
                      <Draggable
                        key={colIndex}
                        style={{
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
                          >{col.half ? 'Expand' : 'Shrink'}</button>
 {col.id}
                          
                          {myfields[col.id].map((field, fieldIndex) => {
                            console.log('col.id', col.id)
                              return (
                           
                              <Box
                                key={fieldIndex}
                                sx={{
                                  width: '100%',
                                }}
                              >
                               
                                <Typography>
                                  <ContentEditable
                                    html={field.label} // innerHTML of the editable div
                                    onChange={(e) => handleEditLabel(e.target.value, rowIndex, colIndex, fieldIndex, col.id)} // handle innerHTML change
                                  />
                                </Typography>
                                <TextField fullWidth id="outlined-basic" label={field.label} variant="outlined" />
                              </Box>
                              )
                            })}


                            {/* {col.fields.map((field, fieldIndex) => {
                              return (
                           
                              <Box
                                key={fieldIndex}
                                sx={{
                                  width: '100%',
                                }}
                              >
                                <Typography>
                                  <ContentEditable
                                    html={field.label} // innerHTML of the editable div
                                    onChange={(e) => handleEditLabel(e.target.value, rowIndex, colIndex, fieldIndex, col.id)} // handle innerHTML change
                                  />
                                </Typography>
                                <TextField fullWidth id="outlined-basic" label={field.label} variant="outlined" />
                              </Box>
                              )
                            })} */}


                          {/* <button
                            onClick={() => {
                              setEditField(col)
                              console.log(col)
                            }}
                          >edit me</button> */}
                        </Box>
                      </Draggable>
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

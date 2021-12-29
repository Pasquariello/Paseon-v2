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

const myfields = [
  {
    name: 'Taylor',
    half: true,
    row: 0,
    col: 0
  }, 
  {
    name: 'Sylvia',
    half: true,
    row: 0,
    col: 1,
  },
  {
    name: 'Huron',
    row: 1,
    col: 0,
    half: false,
  },
  {
    name: 'Barley',
    row: 2,
    col: 0,
    half: true,
  },
  {
    name: 'Bear',
    row: 2,
    col: 1,
    half: true,

  },
  {
    name: 'Gabrielle',
    row: 3,
    col: 0,
    half: false,

  },
  {
    name: 'Selina',
    row: 4,
    col: 0,
    half: false,
  },
];


const  FormDnDSandbox = React.memo((props) => {

  const [formStructure, setFormStructure] = useState(myfields);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const rowCount = Math.max.apply(Math, myfields.map(function(field) { return field.row; })) + 1;
  console.log('rowCount', rowCount)

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

  const addNewField = () => {
    const newRow = [
      {
        name: 'new',
        col: 0,
        row: rows.length + 1,
      }
    ]
    setRows([...rows, newRow])
  }



  const handleRowDrop = (dropResult) => {
    console.log('dropResult', dropResult)

    // if (dropResult.payload.length) {

    // }
    const dragResults = dropResult.payload.length ? applyDrag(rows, dropResult) 
    : applyDrag(rows, {...dropResult, payload: [dropResult.payload], removedIndex: dropResult.payload.row});
    
    console.log('dragResults', dragResults)

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

  const allowDrop = (ev) => {
    ev.preventDefault();
  }
  
  const dragMe = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  const dropMe = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
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


  // const example = [
  //   {full: true, fields: []},
  //   {full: true, fields: []},
  //   {full: true, fields: []}
  // ]

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
        <Container
        // groupName="col"
        // groupName="row container" // contains all draggble rows
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
          // shouldAcceptDrop={(sourceContainerOptions, payload,) => {
          //   console.log('sourceContainerOptions', sourceContainerOptions)
          //   console.log('payload', payload)
          //   if (payload.length === 1) {
          //     return true
          //   }

          // }}     
        >

          {rows.map((row, rowIndex) => {
            const dropAllowed = !row.some(col => col.half === false) || row.length === 2;

            const dropAllow = () => {
              if(row.some(col => col.half === false)){
                return 'nonDroppable'
              } else {
                if(row.length === 2){
                  return `droppableAt${rowIndex}`
                } else {
                  return `droppableAll`
                }              
              }
            }
            

            console.log('dropAllow', dropAllow())
            console.log('ROW', row)
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
                  groupName="col"

                  // groupName={`col${rowIndex}`} 
                  // groupName={`col`} 
                  groupName={dropAllow()}
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
                    console.log('payload', payload)
                    console.log('sourceContainerOptions', sourceContainerOptions)
                    console.log('row', row)
                    if(row.some(col => col.half === false)){
                      return false
                    } else {
                      if(row.length === 2){
                        if(row.some(col => col.name === payload.name)) {
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
                            onClick={() => {
                           
                              const foo = {
                                ...rows[rowIndex][colIndex],
                                half: !rows[rowIndex][colIndex].half
                              };

                              const newRows = rows[rowIndex].map(col => {
                                return [{
                                  ...col,
                                  half: !rows[rowIndex][colIndex].half
                                }];
                              })
                              console.log('newRows', newRows)
                              
                              const test = [...rows];
                              test.splice(rowIndex, 1, ...newRows)
                              console.log('test', test);
                              console.log('rows', rows);

                              // const updatedRows = rows.map((row, i) => {
                              //   if (rowIndex === i) {
                              //     return [...newRows]
                              //     // return row.map((col, j) => {
                              //     //   return [{
                              //     //     ...col,
                              //     //     half: !rows[rowIndex][colIndex].half
                              //     //   }];
                                   
                              //     // })
                              //   }
                              //   return row
                              // })
                              // console.log('updatedRows', updatedRows)
                              setRows(test);
                            }}
                          >{col.half ? 'half' : 'full'}</button>

                          <Typography>{col.name}</Typography>
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

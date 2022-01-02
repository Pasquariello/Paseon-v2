import React, {useEffect, useContext, useState} from 'react';
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container, Draggable } from "react-smooth-dnd";
import {fetchFormData, moveRow, moveCol, clearEmptyRows, incrementRowColCount, decrementRowColCount} from 'src/store/formDetailsSlice';

import {Box, Button, TextField, Typography} from '@mui/material';
import { FormBuilderContext } from 'src/context/FormBuilderContext';


import ContentEditable from 'react-contenteditable'




const Row = React.memo((props) => {
  const {
    row,
    rowIndex,
    handleCardDrop,
    handleEditLabel,
    handleRowDrop,
    handleToggleWidth,
    myfields,
  } = props;
  
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
                  getChildPayload={index => row[index]}
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
                          
                          {myfields[col.id].map((field, fieldIndex) => {
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
    );
})

export default Row;

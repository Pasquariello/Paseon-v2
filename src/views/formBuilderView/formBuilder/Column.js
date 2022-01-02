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
    rowIndex,
    handleEditLabel,
    handleToggleWidth,
    myfields,
    colIndex,
    col
  } = props;
  
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
                        </Box>
                      </Draggable>
    );
})

export default Row;

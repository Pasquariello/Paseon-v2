import React, { useContext } from 'react';
import './form.css'

import { Draggable } from "react-smooth-dnd";

import { FormBuilderContext } from 'src/context/FormBuilderContext';


import ContentEditable from 'react-contenteditable'




const Column = (props) => {
  const {
    rowIndex,
    handleToggleWidth,
    colIndex,
    col,
    handleEditLabel
  } = props;
  const { myfields } = useContext(FormBuilderContext);

  
    return ( 
    

                      <Draggable
                        key={col.id}
                        style={{
                          width: col.half ? '50%' : '100%',
                        }}
                      >
                        <div
                          style={{
                            border: '1px dashed black',
                            display: 'flex',

                          }}
                        >
                          <button
                            onClick={() => handleToggleWidth(rowIndex, colIndex)}
                          >{col.half ? 'Expand' : 'Shrink'}</button>
                          
                          {myfields[col.id].map((field, fieldIndex) => {
                              return (
                                <div key={ fieldIndex }>
                                <ContentEditable
                                  html={field.label} // innerHTML of the editable div
                                  onChange={(e) => handleEditLabel({value: e.target.value, fieldIndex: fieldIndex, colId: col.id, myfields: myfields})} // handle innerHTML change
                                />

                              <input></input>
                              </div>
                              // <Box
                              //   key={fieldIndex}
                              //   sx={{
                              //     width: '100%',
                              //   }}
                              // >
                               
                              //   <Typography>
                              //     <ContentEditable
                              //       html={field.label} // innerHTML of the editable div
                              //       onChange={(e) => handleEditLabel(e.target.value, rowIndex, colIndex, fieldIndex, col.id, myfields)} // handle innerHTML change
                              //     />
                              //   </Typography>
                              //   <TextField fullWidth id="outlined-basic" label={field.label} variant="outlined" />
                              // </Box>
                              )
                            })}
                        </div>
                      </Draggable>
    );
}

export default Column;

import React, {useEffect, useContext, useState} from 'react';
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container, Draggable } from "react-smooth-dnd";

import {Box, Button, TextField, Typography} from '@mui/material';
import { FormBuilderContext } from 'src/context/FormBuilderContext';


import ContentEditable from 'react-contenteditable'
import Column from './Column';



const Row = React.memo((props) => {

  const {
    rowId,
    rowLength,
    rowIndex,
    handleCardDrop,
    handleRowDrop,
    handleToggleWidth,
    myfields,
    row,
  } = props;
  const {addNewRow} = useContext(FormBuilderContext);

  // const row = rows2.find(row => row.rowId === rowId);
  // console.log(row)
    return ( 
    
   
              <Draggable
                // length={row.length}
                key={rowIndex}
                style={{
                  border: '1px dashed black'
                }}
              >
                row {rowIndex}
                <Button onClick={() => addNewRow(rowIndex) }>Above</Button>
                <Button onClick={() => addNewRow(rowIndex + 1) }>Below</Button>
                <Container
                  orientation="horizontal"
                  onDrop={(e) => handleCardDrop(rowIndex, e)}
                  // getChildPayload={index => row[index]}
                  getChildPayload={index => row.columns[index]}
                  index={rowIndex}
                  dragClass="card-ghost"

                  // groupName={`col${rowIndex}`} 
                  groupName='col'
                  // groupName={`col${row.length}`} 

                  rowLength={rowLength}
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
                    if (sourceContainerOptions.groupName === 'row') {
                      return false; // must come first
                    }
                    if(rowIndex === payload.row) {
                        return true // coming from row currently being dragged from
                    }
                    if (rowLength === 0) { 
                      return true // if empty row
                    }
    
                    if (rowLength === 1 && row[0].half && rowIndex !== payload.row && payload.half) {
                      return true;
                    }

                    return false // all other cases
                
                 }}
                >
                  {row.columns.map((col, colIndex) => {
                     return (
        
                      <Column
                        key={col.id}
                        colIndex={colIndex}
                        col={col}
                        row={row}
                        rowIndex={rowIndex}
                        handleCardDrop={handleCardDrop}
                        // handleRowDrop={handleRowDrop}
                        handleToggleWidth={handleToggleWidth}
                        myfields={myfields}
                      />
                    )
                  })}
                </Container>
              </Draggable>
    );
})

export default Row;

import React, { useContext } from 'react';
import './form.css'

import { Container, Draggable } from "react-smooth-dnd";

import { FormBuilderContext } from 'src/context/FormBuilderContext';


import Column from './Column';



const Row = (props) => {

  const {
    rowId,
    rowLength,
    rowIndex,
    handleCardDrop,
    handleToggleWidth,
    row,
    handleEditLabel
  } = props;
  const {addNewRow} = useContext(FormBuilderContext);

    return ( 
    
   
              <Draggable
                key={rowId}
                style={{
                  border: '1px dashed black'
                }}
              >
                row {rowIndex}
                <button onClick={() => addNewRow(rowIndex) }>Above</button>
                <button onClick={() => addNewRow(rowIndex + 1) }>Below</button>
                <Container
                  orientation="horizontal"
                  onDrop={(e) => handleCardDrop(rowIndex, e)}
                  getChildPayload={index => {
                    console.log('row.columns[index]', row.columns[index])
                    return row.columns[index]
                  }
                }
                  index={rowIndex}
                  dragClass="card-ghost"
                  groupName='col'
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
                    console.log("sourceContainerOptions", sourceContainerOptions)
                    console.log("payload", payload)
                    console.log("rowIndex", rowIndex)

                    if (sourceContainerOptions.groupName === 'row') {
                      console.log('FALSE 1')
                      return false; // must come first
                    }
                    // if(rowIndex === payload.row) {
                    if(rowIndex === sourceContainerOptions.index) {
                        return true // coming from row currently being dragged from
                    }
                    if (rowLength === 0) { 
                      return true // if empty row
                    }
    
                    if (rowLength === 1 && row?.columns[0]?.half && rowIndex !== sourceContainerOptions.index && payload?.half) {
                      return true;
                    }
                    console.log('FALSE 2')
                    return false // all other cases
                
                 }}
                >
                  {row.columns.map((col, colIndex) => {
                     return (
        
                      <Column
                        handleEditLabel={handleEditLabel}
                        key={col.id}
                        colIndex={colIndex}
                        col={col}
                        row={row}
                        rowIndex={rowIndex}
                        handleCardDrop={handleCardDrop}
                        handleToggleWidth={handleToggleWidth}
                      />
                    )
                  })}
                </Container>
              </Draggable>
    );
}

export default Row;

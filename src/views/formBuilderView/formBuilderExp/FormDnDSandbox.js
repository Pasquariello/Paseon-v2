import React, {useEffect, useContext, useState} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container, Draggable} from "react-smooth-dnd";
import {fetchFormData, moveRow, moveCol, clearEmptyRows, incrementRowColCount, decrementRowColCount} from 'src/store/formDetailsSlice';

import {Box, Button, TextField} from '@mui/material';
import {List} from 'react-virtualized';
import { FormBuilderContext } from 'src/context/FormBuilderContext';


// todo move to util file and delete
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];

  let itemToAdd = payload.body;

  if (removedIndex !== null) {

    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {

    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

const  FormDnDSandbox = React.memo((props) => {
  const dispatch = useDispatch() 
  const { currentView } = useContext(FormBuilderContext);

  const rowsArray = useSelector(state => state.formDetails.rows);


  const {columns} =  useSelector(state => state.formDetails);

  const [moveCount, setMoveCount] = useState(0);
    
  // useEffect(() => {
  //   if (moveCount >= 2) {
  //     // dispatch(clearEmptyRows())
  //     setMoveCount(0)
  //   }
  // }, [moveCount, dispatch])
 

    const onRowDrop = (dropResult) => {
      const updatedRows = applyDrag(rowsArray, dropResult);
      const data = updatedRows.map((row, index) => {
        return {
        ...row,
        position: index,
      }
    });

      dispatch(moveRow(data));
    }

    const handleIncrement = (id, currentColumnCount) => {
      if (currentColumnCount < 3) {
        dispatch(incrementRowColCount(id));

      }
    }

    const handleDecrement = (id, currentRowColumnCountSettings, currentColumnCount) => {

      if (currentRowColumnCountSettings > 1 && currentColumnCount < currentRowColumnCountSettings) {
        dispatch(decrementRowColCount(id));
      }
    }

    return ( 
      <Box
      style={{
        overflow: 'auto',
        border: '1px dashed',
        overflowY: "auto",
        width: '50%',
      }}
      
    >

        <Container
        // TAYLOR - DO I NEED TO REMOVE!?
        // groupName="col"
        // style={{background: '#f6f6f6'}}
        style={{
          background: '#f6f6f6', 
          display: 'flex',  
          flex: 1, 
          flexDirection: 'row',
          flexWrap: 'wrap', 
          // justifyContent: 'space-between', 
          width: '100%',  
          // border: '1px solid red'
        }}

          orientation="vertical"
          onDrop={onRowDrop}
          getChildPayload={index =>rowsArray[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
        >
        
        
        {columns.map((col, colIndex) => {
         

          return (
            <Draggable 
              className="column-drag-handle"
              key={col.id} 
              // style={{
              //     flex: 1
              // }}
              style={{
                display: 'flex',  
                // flex: 1, 
                flexWrap: 'wrap', 
                justifyContent: 'space-between',
                width: col.fullWidth ? "100%" : '50%',
                border: '1px solid red'
              }}
            > 
      <div>

        
      {
        col.fullWidth ? 
            col.fields.map(field => {

              return (
             

                  <div 
                  style={{
                      // display: 'flex',  
                      // flex: !field.fullWidth && 1,
                      flexWrap: 'wrap',
                      width: field.fullWidth ? "100%" : '50%'
                  }}
                  >
                  <div style={{padding: 8}}>
                  <TextField 
                      margin='normal'
                      label={field.label}
                      fullWidth={field.fullWidth}
                      style={{ width: !field.fullWidth && '100%' }}
                  />
                  </div>
               </div>
              )
                }) :  (

                  <Container
                    orientation="horizontal"
                    // onDrop={(e) => onCardDrop(rowIndex, e)}
                    // onDrop={handleOnCardDrop}
                    getChildPayload={(index) =>{
                        return {
                            id: columns[index].id,
                            body: columns[index],
                            type: 'col',
                        }                   
                    }}
                    dragClass="card-ghost"
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
               
                    
                
                    style={{
                        // flex: 1,
                        minHeight: '100px',
                        padding: 0,
                        display: 'flex',
                        border: '1px dashed',
                    }}
                >   
                <Draggable 
                      // key={id} 
                      style={{
                          flex: 1
          
                      }}
          
                  > 
                {
                  col.fields.map(field => {

                    return (
                   
                      
                        <div 
                        style={{
                            // display: 'flex',  
                            // flex: !field.fullWidth && 1,
                            flexWrap: 'wrap',
                            width: field.fullWidth ? "100%" : '50%'
                        }}
                        >
                        <div style={{padding: 8}}>
                        <TextField 
                            margin='normal'
                            label={field.label}
                            fullWidth={field.fullWidth}
                            style={{ width: !field.fullWidth && '100%' }}
                        />
                        </div>
                     </div>
                   
                    )
                      })
                }   
                  </Draggable>
                    </Container>

                )


              }

              </div>
               </Draggable>
          )
            
         


        })}
        {/* <Draggable 
            key={id} 
            style={{
                flex: 1
            }}
        >

        </Draggable> */}

        </Container> 
        </Box>  
    );
})

export default FormDnDSandbox;

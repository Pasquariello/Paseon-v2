import React, {useEffect, useMemo} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container } from "react-smooth-dnd";
import {selectAllRows, moveCol, moveRow, addRow} from 'src/store/rowsSlice';
import {addField, fetchFormData, selectFormById} from 'src/store/formsSlice'
import {Button } from '@material-ui/core';



const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];

  let itemToAdd = payload.id || shortid.generate();

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
    const rowsArray = useSelector((state) => selectAllRows(state));
    const rowEntities  = useSelector(state => state.rows.entities);


    // useEffect(() => {
    //   if(!form || !form?.rows.length){
    //     //todo - update here
    //     // addNewField({name: '', label: '', })
    //     dispatch(addNewField({id: shortid.generate(), position: 0, columns: []}));
    //   }
    // },[])


    // Gets run twice - for the row the card left and for the row the card is dropped
    const onCardDrop = (rowId, dropResult)  => {
      console.log('rowId', rowId)

      console.log('dropResult', dropResult)
      // if (!dropResult.addedIndex && !dropResult.removedIndex){
      //   return
      // }
    
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

        const row = rowEntities[rowId];
        const dropResultCopy = {...dropResult}
        //new 
        const newCol = applyDrag(row.columns, dropResultCopy);
        const updatedRow = {...row, columns: newCol};

        const updatedRowsNew = [{
          id: rowId,
          changes: updatedRow.columns
        }]

        const data = {
          updatedRows: {...rowEntities, [rowId]: updatedRow}, //rowsCopy,
          newColumn: dropResult.payload.body,
          updatedRowsNew: updatedRowsNew,
          newTest: updatedRow.columns.map((column, index) => {
            // DEPENDING ON HOW PASSING COLUMN!
            // if (column === dropResultCopy.payload.id) {
              if (column.id === dropResultCopy.payload.id) {
              return {
                id: dropResultCopy.payload.id,
                ...dropResultCopy.payload.body,
                position: index
              }
            } else {
              return {
                // DEPENDING ON HOW PASSING COLUMN!
                // id: column,
                id: column.id,
                position: index
              }
            }
            
          }),
          updatedColumns: updatedRow.columns.map((column, index) => ({
            id: column,
            changes: {
              ...dropResult.payload.body,
              position: index
            },
          })),
        };

        dispatch(moveCol(data));
      }
     
    }

    const onRowDrop = (dropResult) => {
      console.log('onRowDrop', dropResult) 
  // TAYLOR - flexhing out idea to drop card in row
  // if (dropResult.payload.type === 'col') {
  //   // return
  //   const newRow = {
  //       id: 'row1',
  //       position: dropResult.addedIndex,
  //       formId: 'form1',
  //       columns: [dropResult.payload.id]
  //   }
  //   dispatch(addRow(newRow))
  //   //ADD NEW ROW
    

  // }
      const updatedFormRows = applyDrag(rowsArray, dropResult);
      const data = updatedFormRows.map((row, index) => ({
        ...row,
        position: index,
      }));
      dispatch(moveRow(data));
    }

       {/* <Button onClick={() => {
            dispatch(fetchFormData())
          }}>Test Get Form</Button> */}
    return ( 
        <Container
        // TAYLOR - DO I NEED TO REMOVE!?
        // groupName="col"
        // style={{background: '#f6f6f6'}}
          orientation="vertical"
          onDrop={onRowDrop}
          getChildPayload={index =>rowsArray[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
        >
          {/* DO NOT ADD ANY ELEMS AS CHILDREN THIS WILL BREAK ROW DND */}
          {/* ! Important Comment button below out when not in use! */}
          {/* <Button onClick={() => {
            dispatch(fetchFormData())
          }}>Test Get Form</Button> */}
            {rowsArray ? rowsArray.map((row, rowIndex) => {
              
                return (
                    <Row  
                        rowIndex={rowIndex}
                        key={row.id}
                        rowId={row.id}
                        onCardDrop={onCardDrop}
                        addNewField={props.addNewField}
                    />    
            );
          }) : ''}
        </Container>   
    );
})

export default FormDnDSandbox;

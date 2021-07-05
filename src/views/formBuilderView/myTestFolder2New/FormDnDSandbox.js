import React, {useEffect} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container } from "react-smooth-dnd";
import { addNewField, selectRowIds, selectAllRows, moveCol, moveRow} from 'src/store/rowsSlice';
import {addField, selectFormById} from 'src/store/formsSlice'


const applyDrag = (arr, dragResult) => {
 

  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];


  let itemToAdd = payload.payload || shortid.generate();

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {

    result.splice(addedIndex, 0, itemToAdd);
  }


  return result;
};

const  FormDnDSandbox =  React.memo((props) => {
    const dispatch = useDispatch()
    const { 
        // currentIsDragging,
    } = props;

    const rows = useSelector((state) => selectAllRows(state));


    // useEffect(() => {
    //   if(!form || !form?.rows.length){
    //     //todo - update here
    //     // addNewField({name: '', label: '', })
    //     dispatch(addNewField({id: shortid.generate(), position: 0, columns: []}));
    //   }
    // },[])


    // Gets run twice - for the row the card left and for the row the card is dropped
    const onCardDrop = (rowId, dropResult)  => {

      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

        const rowsCopy = [...rows];

        const row = rowsCopy.filter(row => row.id === rowId)[0];
        const rowIndex = rowsCopy.indexOf(row);

        const newRow = Object.assign({}, row);
        const dropResultCopy = {...dropResult, payload: {...dropResult, row: rowIndex}}
        newRow.columns = applyDrag(newRow.columns, dropResultCopy);
        rowsCopy.splice(rowIndex, 1, newRow);
        
        const data = {
          updatedRows: rowsCopy,
          updatedColumns: newRow.columns.map((column, index) => ({
            id: column,
            changes: {position: index},
          })),
        };

        dispatch(moveCol(data));
      }
     
    }

    const onRowDrop = (dropResult) => {
      // const scene = Object.assign({}, obj);
      const rowsCopy = [...rows];
      const updatedFormRows = applyDrag(rowsCopy, dropResult);
      const data = updatedFormRows.map((row, index) => ({
          ...row,
          position: index,
      }));
      
      dispatch(moveRow(data));
    }

    return (  
        <Container
          orientation="vertical"
          onDrop={onRowDrop}
          getChildPayload={index => {
              return rows[index]
          }}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
       
        >
            {rows ? rows.map((row, rowIndex) => {
                return (
                    <Row  
                        rowIndex={rowIndex}
                        key={row.id}
                        rowId={row.id}
                        onCardDrop={onCardDrop}
                    />    
            );
          }) : ''}
        </Container>
    );
})

export default FormDnDSandbox;

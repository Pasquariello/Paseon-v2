import React, {useEffect, useMemo} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container } from "react-smooth-dnd";
import {fetchFormData, moveRow, moveCol, incrementRowColCount, decrementRowColCount} from 'src/store/formDetailsSlice';

import {Button } from '@mui/material';
import {List} from 'react-virtualized';


// todo move to util file and delete
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

    const {rowEntities} = useSelector(state => state.formDetails);

    const rowsArray = useSelector(state => state.formDetails.rows);

  
    // Gets run twice - for the row the card left and for the row the card is dropped
    const onCardDrop = (rowIndex, dropResult)  => {
      // console.log('rowId', rowId)

      // console.log('dropResult', dropResult)
      // if (!dropResult.addedIndex && !dropResult.removedIndex){
      //   return
      // }
    
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

        // const row = rowEntities[rowId];
        const row = rowsArray[rowIndex];
        const dropResultCopy = {...dropResult}
        //new 
        const newCol = applyDrag(row.columns, dropResultCopy);
        const updatedCols = newCol.map(col =>( {...col, row: rowIndex} ));
        const updatedRow = {...row, columns: updatedCols}
        console.log('updatedRow', updatedRow)

        const updatedColumns = updatedRow.columns.map((column, index) => ({
          id: column,
          changes: {
            col: index,
            row: updatedRow.position,
          }
        }));


        const data = {
          updatedRow,
          updatedColumns,
          rowIndex
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
      const updatedRow = applyDrag(rowsArray, dropResult);

      const data = updatedRow.map((row, index) => ({
        ...row,
        position: index,
      }));
      console.log('updatedRow', updatedRow)
      // const updatedColumns = updatedRow.columns.map((column, index) => ({
      //   id: column,
      //   changes: {
      //     col: index,
      //     row: updatedRow.position,
      //   }
      // }));
      // 
      // console.log('updatedColumns', updatedColumns)

      dispatch(moveRow(data));
    }

    const handleIncrement = (id, currentColumnCount) => {
      if (currentColumnCount < 3) {
        dispatch(incrementRowColCount(id));

      }
    }

    const handleDecrement = (id, currentRowColumnCountSettings, currentColumnCount) => {
      console.log('currentColumnCount',currentColumnCount)
      console.log('currentRowColumnCountSettings', currentRowColumnCountSettings)

      if (currentRowColumnCountSettings > 1 && currentColumnCount < currentRowColumnCountSettings) {
        dispatch(decrementRowColCount(id));
      }
    }

    const renderRow = (row, rowIndex) => {
      console.log(row)
      return (

              <Row  
                rowIndex={row.index}
                key={row.index}
                rowId={row.index}
                onCardDrop={onCardDrop}
              />    
      );

    }

    return ( 
        <Container
        // TAYLOR - DO I NEED TO REMOVE!?
        // groupName="col"
        style={{background: '#f6f6f6'}}
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
                      {/* {rowsArray ? rowsArray.map((row, rowIndex) => {
return (
          <List
    width={300}
    height={300}
    rowCount={rowsArray.length}
    rowHeight={100}
    rowRenderer={renderRow}
  />
  );
}) : ''} */}
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
                        // addNewField={props.addNewField}
                        // handleIncrement={handleIncrement}
                        // handleDecrement={handleDecrement}
                    />    
            );
          }) : ''}
        </Container>   
    );
})

export default FormDnDSandbox;

import React, {useEffect, useMemo, useState} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container } from "react-smooth-dnd";
import {fetchFormData, moveRow, moveCol, clearEmptyRows, incrementRowColCount, decrementRowColCount} from 'src/store/formDetailsSlice';

import {Button } from '@mui/material';
import {List} from 'react-virtualized';


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

    const {rowEntities} = useSelector(state => state.formDetails);

    const rowsArray = useSelector(state => state.formDetails.rows);
  const [moveCount, setMoveCount] = useState(0);
    
  useEffect(() => {
    if (moveCount >= 2) {
      dispatch(clearEmptyRows())
      setMoveCount(0)
    }
  }, [moveCount, dispatch])
    // Gets run twice - for the row the card left and for the row the card is dropped
    const onCardDrop = (rowIndex, dropResult)  => {

      console.log('dropResult', dropResult)
      console.log('rowIndex', rowIndex)

      // if (!dropResult.addedIndex && !dropResult.removedIndex){
      //   return
      // }
    

      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const row = rowsArray[rowIndex];
        const dropResultCopy = {...dropResult}

        //new 
        const newCol = applyDrag(row.columns, dropResultCopy);
        console.log('newCol', newCol)

        const updatedCols = newCol.map((col, colIndex) => {
          return {
            ...col, 
            position: colIndex,
            // taylor
            // rowPosition: rowIndex,
          }
        });

        const updatedRowColumns = newCol.map((col, index)=> ({id: col.id, position: index}));
        const updatedRow = {...row, columns: updatedRowColumns}

        const updatedColumns = updatedRow.columns.map((column, index) => ({
          id: column.id,
          changes: {
            position: index,
            // rowPosition: updatedRow.position,
          }
        }));

        const data = {
          updatedRow,
          updatedColumns,
          rowIndex
        };
        dispatch(moveCol(data));
      }
      setMoveCount(moveCount + 1)
    }

    const onRowDrop = (dropResult) => {
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
      const updatedRows = applyDrag(rowsArray, dropResult);
      const data = updatedRows.map((row, index) => {
        return {
        ...row,
        position: index,
      }
    });

  
  
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

      if (currentRowColumnCountSettings > 1 && currentColumnCount < currentRowColumnCountSettings) {
        dispatch(decrementRowColCount(id));
      }
    }

    const renderRow = (row, rowIndex) => {
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
          }) : (
            <Row  
            rowIndex={0}
            key={0}
            rowId={shortid.generate()}
            onCardDrop={onCardDrop}
            // addNewField={props.addNewField}
            // handleIncrement={handleIncrement}
            // handleDecrement={handleDecrement}
        /> 
          )}
        </Container>   
    );
})

export default FormDnDSandbox;

import React, {useEffect} from 'react';
import Row from "./Row";
import './form.css'
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container } from "react-smooth-dnd";
import { addNewField, selectRowIds, selectAllRows, moveCol} from 'src/store/rowsSlice';
import {addField, selectFormById, updateForm} from 'src/store/formsSlice'


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

const  MyList =  React.memo((props) => {
    const dispatch = useDispatch()
    const {
        dataList, 
        currentIsDragging,

        onRowDrop,
        // onCardDrop,
        getCardPayload
        // addNewField
    } = props;

    const form = useSelector((state) => selectFormById(state));
    const rows = useSelector((state) => selectAllRows(state));


    useEffect(() => {
      if(!form || !form?.rows.length){
        //todo - update here
        // addNewField({name: '', label: '', })
        dispatch(addNewField({id: shortid.generate(), position: 0, columns: []}));
      }
    },[])


    const onCardDrop = (rowId, dropResult)  => {
     
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    
        const rowsCopy = [...rows];

        // const column = scene.dataList.filter(p => p.id === rowId)[0];
        const column = rowsCopy.filter(row => row.id === rowId)[0];

        const rowIndex = rowsCopy.indexOf(column);

        const newColumn = Object.assign({}, column);

        const dropResultCopy = {...dropResult, payload: {...dropResult, row: rowIndex}}
        newColumn.columns = applyDrag(newColumn.columns, dropResultCopy);

        rowsCopy.splice(rowIndex, 1, newColumn);
        dispatch(moveCol(rowsCopy))
      }
     
    }

    return (  
        <Container
          orientation="vertical"
          onDrop={onRowDrop}
          // getChildPayload={index => {
          //     return dataList[index]
          // }}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
       
        >
            {rows ? rows.map((key, rowIndex) => {
                return (
                    <Row  
                        rowIndex={rowIndex}
                        key={key.id}
                        rowId={key.id}
                        onCardDrop={onCardDrop}
                    />    
            );
          }) : ''}
        </Container>
    );
})

export default MyList;

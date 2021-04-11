import React, {useCallback, useState } from 'react';
import Row from "./Row";
import './form.css'

import { useDispatch } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction} from 'src/actions/formActions';

import { Container, Draggable } from "react-smooth-dnd";

const  MyList =  React.memo((props) => {
    const dispatch = useDispatch()
    const {
        dataList, 
        currentIsDragging,

        onRowDrop,
        onCardDrop,
        getCardPayload,

        drop,
    } = props;

    // start
    const addNewRow = (indexToAdd) => {
        console.log('indexToAdd', indexToAdd)
        const tempArray = dataList
        tempArray.splice(indexToAdd , 0, {subItems: []})
        
        const newDataList = tempArray.map((el, tempIndex) => { 
                return {...el, id: `${tempIndex}`}
        })

        
        dispatch(addNewFieldAction(newDataList))
                         
      }
    // end

   

    return (  
        
        <div className="card-scene" style={{width: `100%`}}>
       
          {/* {this.state.scene.children.map(column => { */}
            {dataList.map((row, rowIndex) => {
                console.log('ROW', row)
                return (
                    
                    <Row  
                        rowIndex={rowIndex}
                        // key={row.id}
                        rowId={row.id}
                        getCardPayload={getCardPayload}
                        // row={row}
                        onCardDrop={onCardDrop}
                        // currentIsDragging={currentIsDragging}
                        // subItemIds={row.subItems.map(col => col.id)}
                        // start new props
                        // parentDrag={{...provided.dragHandleProps}}
                        // Start New
                        addNewRow={addNewRow}
                        drop={drop}
                    />
                    
            );
          })}
      </div>
     
        
        //     <Droppable 
        //         droppableId="droppable" 
        //         type="droppableItem"
        //     >
        //         {(provided, snapshot) => (
        //             <div
        //                 ref={provided.innerRef}
        //             >
        //                 {dataList.map((row, rowIndex) => {
        //                     // console.log(row)
        //                     return (
        //                         <Row  
        //                             rowIndex={rowIndex}
        //                             key={row.id}
        //                             rowId={row.id}
        //                             currentIsDragging={currentIsDragging}
        //                             // subItemIds={row.subItems.map(col => col.id)}
        //                             // start new props
        //                             parentDrag={{...provided.dragHandleProps}}
        //                         />
        //                     )
        //                 })}
        //                 {provided.placeholder} 
        //             </div>
        //         )}
        //     </Droppable>
                
        // // </DragDropContext>
    );
})

export default MyList;

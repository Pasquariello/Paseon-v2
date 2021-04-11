import React, {useCallback, useState } from 'react';
import Row from "./Row";

import { useDispatch } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction} from 'src/actions/formActions';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
  
    const [removed] = result.splice(startIndex, 1);
  
    result.splice(endIndex, 0, removed);
  
    const foo = result.map((el, index) => {
        return {...el, col:  index}
    });
  
    return foo;
  };

const  MyList =  React.memo((props) => {
    const dispatch = useDispatch()
    const {
        dataList, 
        currentIsDragging,
    } = props;

    // const [ currentIsDragging, setCurrentIsDragging ] = useState(false);


    // const onDragEnd = (result) => {
    //     setCurrentIsDragging()
    //   if (!result.destination) {
    //     return;
    //   }
    //   const sourceIndex = result.source.index;
    //   const destIndex = result.destination.index;
      
    //   if (result.type === "droppableItem") {
    //       const items = reorder(dataList, sourceIndex, destIndex);
    //     //   setDataList(items)
    //     dispatch(addNewFieldAction(items))

    //       // setDrop(drop + 1)
    //       // org(items)
  
    //   } else if (result.type === "droppableSubItem") {
    //     const itemSubItemMap = dataList.reduce((acc, item) => {
    //       acc[item.id] = item.subItems;
    //       return acc;
    //     }, {});
  
    //     const sourceParentId = result.source.droppableId;
    //     const destParentId = result.destination.droppableId;
  
    //     const sourceSubItems = itemSubItemMap[sourceParentId];
  
    //     const destSubItems = itemSubItemMap[destParentId];
  
    //     let newItems = [...dataList];
  
    //     /** In this case subItems are reOrdered inside same Parent */
    //     if (sourceParentId === destParentId) {
    //       const reorderedSubItems = reorder(
    //         sourceSubItems,
    //         sourceIndex,
    //         destIndex
    //       );
  
    //       newItems = newItems.map(item => {
    //         if (item.id === sourceParentId) {
    //           item.subItems = reorderedSubItems;
    //         }
    //         return item;
    //       });
    //     //   setDataList(newItems);
    //     dispatch(addNewFieldAction(newItems))

    //       // setDrop(drop + 1)
    //     } else {
    //       let newSourceSubItems = [...sourceSubItems];
    //       const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
  
    //       let newDestSubItems = [...destSubItems];
    //       newDestSubItems.splice(destIndex, 0, draggedItem);
    //       newItems = newItems.map(item => {
    //         if (item.id === sourceParentId) {
    //           item.subItems = newSourceSubItems;
    //         } else if (item.id === destParentId) {
    //           item.subItems = newDestSubItems;
    //         }
    //         return item;
    //       });
  
    //       result.type = 'droppableItem';
    //     //   if (this.state.selected.length > 4) {
    //     //     this.setState({
    //     //       isUnlocked: true
    //     //     });
    //     //   } else {
    //     //     this.setState({
    //     //       isUnlocked: false
    //     //     });
    //     //   }
    //       // Clear out blank rows
    //       // setDataList(newItems.filter(row => row.subItems.length));
    //       // setDrop(drop + 1)
    //     //   dispatch(addNewFieldAction(newItems.filter(row => row.subItems.length)))

    //     }
    //   }
    // }


    // console.log('DATALIST', dataList)

    return (    
        // <DragDropContext 
        //     onDragEnd={onDragEnd}  
        //     onBeforeCapture={(e) => {
        //         console.log('HI', e)
        //         setCurrentIsDragging(e.draggableId)
        //         // setElemWidth(e.draggableId)
        //     }}
        // >
        
            <Droppable 
                droppableId="droppable" 
                type="droppableItem"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                    >
                        {dataList.map((row, rowIndex) => {
                            // console.log(row)
                            return (
                                <Row  
                                    rowIndex={rowIndex}
                                    key={row.id}
                                    rowId={row.id}
                                    currentIsDragging={currentIsDragging}
                                    // subItemIds={row.subItems.map(col => col.id)}
                                    // start new props
                                    parentDrag={{...provided.dragHandleProps}}
                                />
                            )
                        })}
                        {provided.placeholder} 
                    </div>
                )}
            </Droppable>
                
        // </DragDropContext>
    );
})

export default MyList;

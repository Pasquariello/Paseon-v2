import React, { useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Row from "./Row";



const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    const foo = result.map((el, index) => {
        return {...el, col:  index}
    });

    return foo;
  };


function RowList(props) {
    const {
        dataList, 
        setDataList,
        setIsEdit,
        elemWidth,
        setElemWidth,

        // onDragEnd
    } = props;
    
  let resultsRef = useRef();


  const onDragEnd = (result) => {
    // dropped outside the list
    setElemWidth(false)
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    
    if (result.type === "droppableItem") {
        const items = reorder(dataList, sourceIndex, destIndex);
        setDataList(items)
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = dataList.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});
;
      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;

      const sourceSubItems = itemSubItemMap[sourceParentId];

      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...dataList];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );

        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.subItems = reorderedSubItems;
          }
          return item;
        });
        setDataList(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });

        result.type = 'droppableItem';
        // Clear out blank rows
        // setDataList(newItems.filter(row => row.subItems.length));
      }
    }
  }



  const addNewRow = (indexToAdd) => {
    const tempArray = dataList
    tempArray.splice(indexToAdd , 0, {subItems: []})
    setDataList(
        tempArray.map((el, tempIndex) => { 
            return {...el, id: `${tempIndex}`}
        })
    );                 
  }

  return (    
        /* FORM DROP ZONE START */    
        <DragDropContext onDragEnd={onDragEnd}  
            onBeforeCapture={(e) => {
                setElemWidth(e.draggableId)
            }}
        >
            <Droppable droppableId="droppable" type="droppableItem">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{border: '2px solid green !important'}} 

                    >

                        {dataList.map((row, index) => {
                            return (
                            <div   
                                key={row.id}
                                ref={resultsRef}
                                style={{border: '2px solid green'}} 
                            >
                                <Draggable draggableId={row.id} index={index}> 
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps}>
                                            <Row
                                                parentDrag={{...provided.dragHandleProps}}
                                                elemWidth={elemWidth}
                                                rowIndex={index}
                                                addNewRow={(increment) => addNewRow(index + increment)}
                                                subItems={row.subItems}
                                                type={row.id}
                                                setIsEdit={setIsEdit}
                                                remove={(removeItemId, removeRowId) => {
                                                const newSubList = row.subItems.filter(item => item.id !== removeItemId)
                                                const newDataList = dataList.map(row => {
                                                    if (row.id === removeRowId) {
                                                    return  {...row, subItems: newSubList}
                                                    }
                                                    return row
                                                })
                                                setDataList(newDataList);
                                                }}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        )})}
                        {provided.placeholder} 
                    </div>
                )}
            </Droppable>
        </DragDropContext>
  );
}

export default RowList;

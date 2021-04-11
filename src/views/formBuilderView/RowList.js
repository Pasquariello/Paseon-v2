import React, { useState, useRef, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Row from "./Row";

import AddBoxIcon from '@material-ui/icons/AddBox';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useSelector, useDispatch} from 'react-redux';
import { changeField, } from 'src/actions/formActions';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    const foo = result.map((el, index) => {
        return {...el, col:  index}
    });

    return foo;
  };


const  RowList =  React.memo((props) => {
  // console.log('ran')
  const dispatch = useDispatch();
    const {
        dataList, 
        setDataList,
        setIsEdit,
        elemWidth,
        setElemWidth,

        setSelectedField,
        selectedField,

        onDragEnd
    } = props;

    useEffect(() => {
      // console.log('ran')

    }, [dataList])
    
  let resultsRef = useRef();

  // const [drop, setDrop] = useState(0)



  const org = () => {
    // console.log('TAYLOR ')
    const destructuredFormFields = [];
    dataList.forEach((row, rowIndex) => {
            row.subItems.forEach((formField, formFieldIndex) => {
            const { label, name, type, id } = formField
            destructuredFormFields.push(
                {
                id, 
                label,
                name,
                type,
                col: formFieldIndex,
                row: rowIndex,
                }
            )
        })
        
    });

    dispatch(changeField(destructuredFormFields))
  }

  useEffect(() => {
    // console.log('TaYLOR ==== ')

  }, [selectedField])

  // useEffect(() => {
  //   console.log('DROP', drop)
  //   org()
  // }, [drop])


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
                console.log('e.draggableId========', e.draggableId)
                setElemWidth(e.draggableId)
            }}
        >
            <Droppable 
                droppableId="droppable" 
                type="droppableItem"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                    >

                        {dataList.map((row, index) => {
                          console.log('jojo ', row)
                            return (
                            <div   
                                key={row.id}
                                ref={resultsRef}
                            >
                                <Draggable draggableId={row.id} index={index}> 
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps}>
        
                                           <Row
                                                setSelectedField={ setSelectedField }
                                                selectedField = {selectedField}
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
})

export default RowList;

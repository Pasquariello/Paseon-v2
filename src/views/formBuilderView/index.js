import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {getSingleForm} from 'src/actions/formActions';

import { Box, TextField } from '@material-ui/core';


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormEditRow from "./FormEditRow";
import FieldOptions from './FieldOptions'

import shortid from 'shortid';
import { Edit } from '@material-ui/icons';
import EditField from './EditField';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    const foo = result.map((el, index) => {
        return {...el, col:  index}
    });

    return foo;
  };


function FormBuilderView({ className, onSubmitSuccess, ...rest }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  
const [dataList, setDataList] = useState([]);
const [ isEdit, setIsEdit ] = useState(null);


  useEffect(() => {
    if (formElementsList.length) {
        buildArrayMatrix(formElementsList);
    }
  }, [formElementsList]);

  useEffect(() => {
    if (id) {
        dispatch(getSingleForm(id))
    }
  }, [dispatch, id])

  const buildArrayMatrix = (array) => {
    let tempArray = [];
    const arrayCopy = array;

    // Build Matrix from array list based on element row
    arrayCopy.map((el, index) => {
        if (tempArray[el.row]){
            tempArray[el.row].splice(el.col, 0, el)
            return el

        } else {
            tempArray.push([el])
            return {...el, row: tempArray.length - 1 }
        }
    });

 
    // transform above matrix into array of rows
    // update column index to be sequential and set row to correct index
    const formModel = tempArray.map((row, rowIndex) => {
        return {
            // id: `${rowIndex}`,
            id: shortid.generate(),
            subItems: row.map((col, colIndex) => {
                console.log('COL', col)
                return {
                    ...col, 
                    id: col._id.$oid,
                    col: colIndex, 
                    row: rowIndex
                }
            })
        }
    }) 

    setDataList(formModel)

    // Rebuild function
    // const arr = []
    // bar.map(row => {
    //     return row.subItems.map(col => {
    //         arr.push(col)
    //         return col
    //     })
    // })
    
    // return tempArray
  }




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

      //   const sourceParentId = parseInt(result.source.droppableId);
      //   const destParentId = parseInt(result.destination.droppableId);
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
        setDataList(newItems.filter(row => row.subItems.length));
      }
    }
  }


  let resultsRef = useRef();

  const addNewField = (name, type) => {
    console.log('name', name)
    const tempArray = dataList;
    const newTempArray = [
        ...tempArray, 
        {
            //id: `${dataList.length}`, 
            id: shortid.generate(), 
            subItems: [
                {
                    id: shortid.generate(), 
                    name,
                    row: dataList.length, 
                    col: 0, 
                    type, 
                }
            ] 
        }
    ]
    setDataList(newTempArray);
    
    scrollToRef();

  }

  const scrollToRef = () => {
    // Need to wait for DOM to update after elem has been added to list
    setTimeout(function(){ 
        resultsRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }, 100);
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

  const [elemWidth, setElemWidth] = useState(false)

  return (
    <Box display="flex" height="100%" width="100%" style={{border: '1px solid red'}}>
      {/* Panel Start */}
      <Box style={{ width: '33%', border: '1px solid red', maxHeight: '100vh', position: 'relative'}}>
        <Box 
          style={{
              // position: 'absolute',
              top: '0',
              left: 0,
              // right: 0,
              margin: '0 auto',
              textAlign: 'center',
              // width: 'calc(33% - 4.25rem',
              // padding: '24px',
              whiteSpace: 'nowrap',
          }}
        >
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="form-title"
              label="Form Title"
              name="title"
              autoFocus
              // value={customField.name}
              // onChange={(e) => setCustomField({ ...customField, name: e.target.value})}
          />
          {
            isEdit 
            ? <EditField setIsEdit={setIsEdit} /> 
            : (
              <FieldOptions
                addNewField={ addNewField }
                isEdit={isEdit}
              />
            )   
          }
        </Box>
      </Box>
      {/* Panel End */}
 
     

        {/* FORM DROP ZONE START */}
        <Box style={{border: '1px solid purple'}} width="50%">  {/* 67% */}
            <DragDropContext onDragEnd={onDragEnd}  
                onBeforeCapture={(e) => {
                    setElemWidth(e.draggableId)
                }}
            >
                <Droppable droppableId="droppable" type="droppableItem">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                        >
                            <button onClick={() => {addNewRow(0)}}>
                                Add First Row
                            </button>

                            {dataList.map((row, index) => (
                                <div   
                                    key={row.id}
                                    ref={resultsRef} 
                                >
                                    {console.log('dataList', dataList)}
                                    <Draggable draggableId={row.id} index={index}> 
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                {console.log('= = provided', provided)}
                                                {console.log('= = snapshot', snapshot)}
                                                <FormEditRow
                                                    parentDrag={{...provided.dragHandleProps}}
                                                    elemWidth={elemWidth}
                                                    rowIndex={index}
                                                    addNewRow={(increment) => addNewRow(index + increment)}

                                                    // addNewRow={(insertIndex) => addNewRow(index +insertIndex)}
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
                            ))}
                            {provided.placeholder} 
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <button
                onClick={() => {
                    // this will re clean the array row and col values
                    // array will need to be the value to 'save'/post back to the DB
                    const arr = [];

                    dataList.map((row, rowIndex) => {
                        return row.subItems.map((col, colIndex) => {
                            arr.push({...col, col: colIndex, row: rowIndex})
                            return col
                        })
                    });
                }}
            >
                Save
            </button>
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
  );
}

export default FormBuilderView;

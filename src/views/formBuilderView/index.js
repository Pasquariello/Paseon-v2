import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {getSingleForm, createForm, deleteForm} from 'src/actions/formActions';
import { Box, Button, TextField } from '@material-ui/core';
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
  const formData = useSelector(state => state.forms.selected)
  // const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  
  const [dataList, setDataList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [elemWidth, setElemWidth] = useState(false);
  const [formTitle, setFormTitle] = useState('');

  
  let resultsRef = useRef();


  useEffect(() => {
    const formElementsList = formData ? formData.fields : [];
    const title = formData ? formData.name : '';
    setFormTitle(title);
    if (formElementsList.length) {
        buildArrayMatrix(formElementsList);
    }
  }, [formData]);

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

    setDataList(formModel(tempArray))
  }


    // transform above matrix into array of rows
    // update column index to be sequential and set row to correct index
    const formModel = (arr) => {
      return arr.map((row, rowIndex) => {
        return {
          // id: `${rowIndex}`,
          id: shortid.generate(),
          subItems: row.map((formField, formFieldIndex) => {
              console.log('formField', formField)
              const { label, name, type } = formField
              return {
                  id: shortid.generate(),
                  label,
                  name,
                  type,
                  col: formFieldIndex, 
                  row: rowIndex
              }
          })
        }
      }) 
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

  const addNewField = (newField) => {
    const { name, type, label } = newField;
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
                    label,
                    type, 
                    row: dataList.length, 
                    col: 0, 
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

  return (
    <Box display="flex" height="100%" width="100%">
      {/* Panel Start */}
      <Box p={2} style={{ width: '33%', maxHeight: '100vh', position: 'relative'}}>
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
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
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
        <Box m={2} p={2} style={{border: '2px dashed #eee'}} width="50%">
          <Button
                onClick={() => {
                    // this will re clean the array row and col values
                    // array will need to be the value to 'save'/post back to the DB
                    const destructuredFormFields = [];
                    dataList.forEach((row, rowIndex) => {
                          row.subItems.forEach((formField, formFieldIndex) => {
                            const { label, name, type } = formField
                            destructuredFormFields.push(
                              {
                                label,
                                name,
                                type,
                                col: formFieldIndex,
                                row: rowIndex,
                              }
                            )
                        })
                       
                    });

                    dispatch(createForm({
                      name: 'Test',
                      user_id: '5fe978e8cc7faa326371ff65',
                      fields: destructuredFormFields
                    }))
                }}
            >
              Save
          </Button>

          {formData?._id.$oid
            ? (
              <Button
              onClick={() => { dispatch(deleteForm(formData?._id.$oid)) }}
              >
                Delete
              </Button>
            ) 
            : ''
          }

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

                            {dataList.map((row, index) => {
                              return (
                                <div   
                                    key={row.id}
                                    ref={resultsRef} 
                                >
                                    <Draggable draggableId={row.id} index={index}> 
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps}>
                                              <FormEditRow
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
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
  );
}

export default FormBuilderView;

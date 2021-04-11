import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch, connect } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction} from 'src/actions/formActions';
import { Box, Button } from '@material-ui/core';
import MyList from "./MyList";
import shortid from 'shortid';
import PanelControls from "./PanelControls/";
import ActionControls from './ActionControls';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {commonFields } from 'src/utils/commonFields';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  const foo = result.map((el, index) => {
      return {...el, col:  index}
  });

  return foo;
};


const copy = (source, destination, droppableSource, droppableDestination) => {
  // console.log('==> dest', destination);
  // console.log('==> dest source', source);
  const foo = destination.find(row => {
    return row.id === droppableDestination.droppableId
  })
  // console.log('FOO', foo )
  const sourceClone = Array.from(source);
  const destClone = Array.from(foo.subItems);
  const item = sourceClone[droppableSource.index];
  // console.log('item', item)
  // console.log('destClone', destClone)
  // console.log('sourceClone', sourceClone)

  // new sub items list
  destClone.splice(droppableDestination.index, 0, { ...item,  id: shortid.generate() });
  // console.log('droppableDestination', droppableDestination)

  const destinationCopy = [ ...destination ]

  foo.subItems = destClone

  return destinationCopy.map(row => {
    if (row.id === droppableDestination.droppableId) {
      return foo
    }
    return row
  })

  // console.log('destClone', destClone)
  // return destClone;

  // find row in dataList where row ID mataches destination ID 
  // at r w set destClone = to row subItem
  // perform destClone splice with item 
  // return new row subItem list 
  // update dataList where row id is equal to destination ID 

};

// TODO  list of common fields with IDs into sep file, import into here set source for copy call


const FormBuilderView = React.memo( ({formData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.forms.structuredForm)
  // const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  
  const [ fieldList, setFieldList ] = useState(formData?.fields)
  // const [dataList, setDataList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [elemWidth, setElemWidth] = useState(false);
  const [formTitle, setFormTitle] = useState('');


  // useEffect(() => {

  //   const formElementsList = formData ? formData.fields : [];
  //   setFieldList(formData?.fields)
  //   const title = formData ? formData.name : '';
  //   setFormTitle(title);
  //   if (formElementsList.length) {
  //       buildArrayMatrix(formElementsList);
  //   }
  // }, [formData.fields]);

  // useEffect(() => {
  //   if (id) {
  //       dispatch(getSingleForm(id))
  //   }
  // }, [dispatch, id])



  // const buildArrayMatrix = useCallback( (array) => {
  //   let tempArray = [];
  //   const arrayCopy = array;

  //   // Build Matrix from array list based on element row
  //   arrayCopy.map((el, index) => {
  //       if (tempArray[el.row]){
  //           tempArray[el.row].splice(el.col, 0, el)
  //           return el

  //       } else {
  //           tempArray.push([el])
  //           return {...el, row: tempArray.length - 1 }
  //       }
  //   });


  //   setDataList(formModel(tempArray))
  // }, [])


    // transform above matrix into array of rows
    // update column index to be sequential and set row to correct index
    // const formModel = (arr) => {

    //   return arr.map((row, rowIndex) => {
    //     console.log('ROW', row)
    //     return {
    //       // id: `${rowIndex}`,
    //       id: row[rowIndex]?.id ? row[rowIndex].id  : shortid.generate(),
    //       subItems: row.map((formField, formFieldIndex) => {
    //           const { label, name, type, _id } = formField
      
    //           return {
    //               id: _id?.$oid ? _id?.$oid : formField.id, //shortid.generate(),
    //               label,
    //               name,
    //               type,
    //               col: formFieldIndex, 
    //               row: rowIndex
    //           }
    //       })
    //     }
    //   }) 
    // }
  

  const onDragEnd = (result) => {

    if (!result.destination) {
       return; 
    }

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

  
    //if dragging from selection panel 
    if (result.source.droppableId === "ITEMS") {
      const newArr = copy(
        commonFields,
        dataList,
        result.source,
        result.destination,
      );

      dispatch(addNewFieldAction(newArr));
    }
    // if moving entire row
    else if (result.type === "droppableItem") {
      const items = reorder(dataList, sourceIndex, destIndex);
      dispatch(addNewFieldAction(items))
    
    // if dragging coloumn- this has two sub categories described below
    } else if (result.type === "DEFAULT") { // "droppableSubItem") {
      const itemSubItemMap = dataList.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});


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

      dispatch(addNewFieldAction(newItems))
      // moving to new row
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
//do i nees this?
        // result.type = 'droppableItem';

      }
    }
  }

    const addNewField = (newField) => {
      const { name, type, label } = newField;
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
      dispatch(addNewFieldAction(newTempArray))
    }

  useEffect(() => {
    if (!dataList.length){
      console.log("ITS EMPTY")
      dispatch(addNewFieldAction( [{id:shortid.generate(), subItems: [] }] ))
    }
  }, [dataList])




  return (
    <DragDropContext 
      onDragEnd={onDragEnd}  
      // onBeforeCapture={(e) => {
      //     console.log('HI', e)
      //     setCurrentIsDragging(e.draggableId)
      //     // setElemWidth(e.draggableId)
      // }}
  >
    <Box display="flex" height="100%" width="100%">

      {/* <Draggable 
        key={'r'}
        draggableId="r" 
        index={0}
      >
        <div>
          Hello
        </div>
      </Draggable> */}
  
      {/* Panel Start */}
        <PanelControls
            addNewField={addNewField}
            fieldList={fieldList}
            setFieldList={setFieldList}

            isEdit={isEdit}
            setIsEdit={setIsEdit}
            formTitle={formTitle}
            setFormTitle={setFormTitle}

            commonFields={commonFields}

        />
      {/* Panel End */}
 
        {/* FORM DROP ZONE START */}
        <Box m={2} p={2} style={{minWidth: 600}} width="50%">

        <ActionControls 
            formTitle={formTitle}
            dataList={dataList}
        />

        <MyList
            dataList={dataList.length ? dataList : []}
        />

    
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
    </DragDropContext>
  );
});

function mapStateToProps(state) {
  const { forms } = state
  return { formData: forms.selected }
}

export default connect(mapStateToProps)(FormBuilderView)









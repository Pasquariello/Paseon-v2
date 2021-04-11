import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch, connect } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction} from 'src/actions/formActions';
import { Box, Button } from '@material-ui/core';
import MyList from "./MyList";
import shortid from 'shortid';
import PanelControls from "./PanelControls";
import ActionControls from './ActionControls';



import { Container, Draggable } from "react-smooth-dnd";

import {commonFields } from 'src/utils/commonFields';

const applyDrag = (arr, dragResult) => {
  // console.log('ARR', arr)
  // const { removedIndex, addedIndex, payload } = dragResult;
  // if (removedIndex === null && addedIndex === null) return arr;
  // console.log('payload', payload)
  const result = [...arr];
  console.log('result1', result)

  let itemToAdd = {...dragResult, id: shortid.generate(), };
  // console.log('itemToAdd', itemToAdd)
  // if (removedIndex !== null) {
    // itemToAdd = result.splice(0, 1)[0];
  // }
  console.log('itemToAdd', itemToAdd)
  // if (addedIndex !== null) {
    result.splice(0, 0, itemToAdd);
  // }
  console.log('result', result)

  return result;
};

const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};


const FormBuilderView = React.memo( ({formData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.forms.structuredForm)
  // const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  
  // const [ fieldList, setFieldList ] = useState(formData?.fields)
  // const [dataList, setDataList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [elemWidth, setElemWidth] = useState(false);
  const [formTitle, setFormTitle] = useState('');



    // getCardPayload(columnId, index) {
    //   return this.state.scene.children.filter(p => p.id === columnId)[0].children[
    //     index
    //   ];
    // }
  const obj = {
      type: "container",
      props: {
        orientation: "vertical"
      },
      dataList
    //   dataList:  [
    //     {id: '1', subItems: [{id: '11', name: 'name'}, {id: '12', name: 'phone'}]},
    //     {id: '2', subItems: [{id: '21', name: 'email'}, {id: '22', name: 'address'}]}
    // ]
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
  
  
    const onRowDrop = (dropResult) => {
      // console.log('in onRowDrop', dropResult)
      const scene = Object.assign({}, obj);
      // console.log('scene', scene)
      // Work shopping creating a new row if not dropped into row - make sure to reset mylist group back to col
      // if (dropResult.payload) {
      //   // scene.dataList[dropResult.addedIndex]['subItems'] = [dropResult.payload]
      //   // console.log('scene', scene)
      //   onCardDrop(dropResult.addedIndex, 1  )
        
      //   scene.dataList = applyDrag(scene.dataList, dropResult);

      // }
   
        scene.dataList = applyDrag(scene.dataList, dropResult);
        // console.log('SCENE', scene)
        dispatch(addNewFieldAction(scene.dataList))

    

    
      // this.setState({
      //   scene
      // });
    }
  
    
       const getCardPayload = (rowId, index) => {
        // console.log('ROW ---', row)
        // return row.subItems[index]
        // console.log('INDEX', index)
        const foo = obj.dataList.filter(p => p.id === rowId)[0].subItems[
          index - 1
        ];
        console.log('foo', foo)

        return obj.dataList.filter(p => p.id === rowId)[0].subItems[
          index -1
        ];
      }

    const onCardDrop = (rowId, dropResult)  => {
      // console.log('in onCardDrop', rowId)
     
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, obj);
        
        const column = scene.dataList.filter(p => p.id === rowId)[0];
        const columnIndex = scene.dataList.indexOf(column);
  
        const newColumn = Object.assign({}, column);
        // console.log('newColumn', newColumn)
        newColumn.subItems = applyDrag(newColumn.subItems, dropResult);
        scene.dataList.splice(columnIndex, 1, newColumn);
        dispatch(addNewFieldAction(scene.dataList))

        // this.setState({
        //   scene
        // });
      }
    }
  

    const [commonFieldsState, setCommonFieldsState] = useState(commonFields)

const [ draggingField, setDraggingField ] = useState()
    function allowDrop(ev) {
      ev.preventDefault();
    }
    
    function drag(ev, field) {
      console.log('ev', ev, field)
      setDraggingField(field)

      // ev.dataTransfer.setData("text", ev.target.id);
    }
    
    function drop(ev, rowId) {
      ev.preventDefault();
      console.log('drop', ev)

      const scene = [...dataList]
      
        
      const column = scene.find(p => p.id === rowId);
      const columnIndex = scene.indexOf(column);
      console.log('column', column)
      console.log('columnIndex', columnIndex)

      const newColumn = Object.assign({}, column);
      console.log('newColumn', newColumn)
      newColumn.subItems = applyDrag(newColumn.subItems, draggingField);
      scene.splice(columnIndex, 1, newColumn);
      console.log('draggingField', draggingField)

      console.log('newColumn', newColumn)
      console.log('scene', scene)

      dispatch(addNewFieldAction(scene))
    // console.log('thing', thing)
     
    }

  return (
 
    <Box display="flex" height="100%" width="100%">

      {/* Panel Start */}
      <PanelControls
            addNewField={addNewField}
            fieldList={dataList}

            isEdit={isEdit}
            setIsEdit={setIsEdit}
            formTitle={formTitle}
            setFormTitle={setFormTitle}

            commonFields={commonFieldsState}

            handleOnDrop={e => {
              // console.log('DROP PANEL')
              return setCommonFieldsState( applyDrag(commonFieldsState, e) )
            } }

            drag={drag}

      />  
      {/* Panel End */}
 
        {/* FORM DROP ZONE START */}
        <Box m={2} p={2} style={{minWidth: 600}} width="50%">

        <ActionControls 
            formTitle={formTitle}
            dataList={obj.dataList}
        />

        <MyList
            onRowDrop={onRowDrop}
            onCardDrop={onCardDrop}
            getCardPayload={getCardPayload}
            dataList={obj.dataList.length ? obj.dataList : []}

            drop={drop}
        />

    
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
  );
});

function mapStateToProps(state) {
  const { forms } = state
  return { formData: forms.selected }
}

export default connect(mapStateToProps)(FormBuilderView);
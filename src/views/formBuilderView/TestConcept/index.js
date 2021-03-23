import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {getSingleForm, createForm, deleteForm} from 'src/actions/formActions';
import { Box, Button } from '@material-ui/core';
import RowList from "./RowList";
import shortid from 'shortid';
import PanelControls from "./PanelControls/";
import ActionControls from './ActionControls';


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
  

  return (
    <Box display="flex" height="100%" width="100%">
      {/* Panel Start */}
        <PanelControls
            dataList={dataList}
            setDataList={setDataList}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            formTitle={formTitle}
            setFormTitle={setFormTitle}

        />
      {/* Panel End */}
 
        {/* FORM DROP ZONE START */}
        {/* border: '2px dashed #eee' */}
        <Box m={2} p={2} style={{minWidth: 600}} width="50%">
        
        <ActionControls 
            formTitle={formTitle}
            dataList={dataList}
        />

        <RowList
            dataList={dataList}
            setDataList={setDataList}
            setIsEdit={setIsEdit}
            elemWidth={elemWidth}
            setElemWidth={setElemWidth}
        />
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
  );
}

export default FormBuilderView;

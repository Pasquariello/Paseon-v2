import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Draggable } from "react-smooth-dnd";
import {useDispatch, useSelector} from 'react-redux';
import { selectRowById, addNewField } from 'src/store/rowsSlice';
import {addField, selectFormById} from 'src/store/formsSlice'

import shortid from 'shortid';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FieldEdit from './EditField';
import CustomFieldAdd from '../AddCustomField';

// import { commonFields } from 'src/utils/commonFields';
const List = styled.div`
    border: 1px
        ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
`;

const Item = styled.div`
    color: pink;
    display: flex;
    user-select: none;
    // padding: 0.5rem;
    // margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    min-height: 
    border: 1px
        ${(props) => {
            return (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')}
        }
`;


const FieldOptions = (props) => {
    const dispatch = useDispatch();
    const {
        addNewField,
        isEdit,

        setFieldList,
        selectedField,
        fieldList,

        commonFields,
        dataList,

        editField,
    } = props

    const [ customField, setCustomField ] = useState({
        name: '',
        type: '',
        default: '',
        options: {
            values: [],
            defaults: [],
            required: false,
            columnCount: 1, // TODO - add ability to set num columns
        },
    })

    return (
     
        <Container 
            groupName="col" 
            behaviour="copy" 
            onDragStart={(e) => {
                console.log('e', e)
                // setIsDragging('col');
                // addNewField(e.payload.body)
                // console.log('dude')
                // const formFoo = {
                //     id: shortid.generate()|| formId,
                //     title:  form?.title || '',
                //     rows: [ ...rows, newRow.id],
                //     row: newRow,
                //     column: item
                //   }
                //   dispatch(
                //     addField(formFoo)
                //   ) 
                // dispatch(
                //     addNewField({id:1, position: 0, })
                // )
            }}
            getChildPayload={i => ({id: commonFields[i].id, body: commonFields[i], type: 'col' })} 
            onDrop={(e) => {
                console.log('FILED OPTIONS ON DROP', e)
                // addNewField(commonFields[i])
            }}
        >
        {
          commonFields.map((field, i) => {
            return (
              <Draggable key={i}>
                <div 
                    onClick={() => addNewField(field)}
                    className="draggable-item" 
                    style={{
                        border: '1px solid #eee',
                        borderRadius: 5,
                        width: 200,
                        margin: 4,
                        padding: 8,
                        cursor: 'pointer',
                        background: '#fff '
                    }}>
                    <div></div>
                    {field.label}
                </div>
              </Draggable>
            );
          })
        }
      </Container>     
    )
}

export default FieldOptions

{/* <CustomFieldAdd 
editField={editField}
addNewField={addNewField} 
customField={customField} 
setCustomField={setCustomField} 
selectedField={selectedField} 
fieldList={fieldList} 
setFieldList={setFieldList} 
/> */}
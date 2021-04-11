import React, { useState, useRef } from 'react';
import { Container, Draggable } from "react-smooth-dnd";
import './form.css';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import {useSelector, useDispatch} from 'react-redux';

import {selectField} from 'src/actions/formActions';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { Box, Typography,  TextField, Button, Menu, MenuItem } from '@material-ui/core';

import CheckboxInput from 'src/components/formBuilderInputControls/checkboxInput';
import SelectInput from 'src/components/formBuilderInputControls/selectInput';
import TextAreaInput from 'src/components/formBuilderInputControls/textAreaInput';
import TextInput from 'src/components/formBuilderInputControls/textInput';
import RadioInput from 'src/components/formBuilderInputControls/radioInput';
import './form.css';
const grid = 8;

const Column = React.memo( (props) => {
    const {
        colWidth,
        isDragging
    } = props
    // console.log('colWidth', colWidth)
const dispatch = useDispatch()

    const {
        fieldId,
        colIndex,
        label,
        rowId,
        type,
        currentIsDragging,
        rowSnapshotIsDraggingOver,
        rowLength

    } = props;

    // console.log('rowLength', rowLength)
    const renderInput = (type) => {
     const obj = {
         text: <TextInput />,
         textArea: <TextAreaInput/>,
         checkbox: <CheckboxInput />,
         radio: <RadioInput />,
         select: <SelectInput />,
     }
     return obj[type]
    }

    const widthSettings = colWidth ? 80 / (rowLength + 1) : 80 / rowLength;
    // console.log('widthSettings', widthSettings)
    return (
        <div key={fieldId} 
        style={{
            // border: '1px solid blue',  
            width: `100%`,
        }}

        >
            <div 

                style={{
                    border: '1px solid red',
                    // width: `200px`,
 
                    // minWidth: `${widthSettings}%`,
                    // // maxWidth: `${widthSettings}%`,
                    // width: `${widthSettings}%`,
                    // width: `calc(100 / ${rowLength})%`,  
                    // minWidth: `calc(100 / (${rowLength} + 1 ))%`  
                }}>
                {colIndex}
            <p>{label}</p>
            </div>
        </div>
     
    );
})

export default Column

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344

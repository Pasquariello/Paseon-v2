import React, { useState, useRef } from 'react';
import { 
    Droppable, 
    Draggable, 
} from 'react-beautiful-dnd';

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


const getItemStyle = (isDragging, draggableStyle, rowLength, isDraggingOver, itemId, currentIsDragging ) => {

    const division1 = isDraggingOver ? `calc((${100 / (rowLength )}%) - (${200 / (rowLength )}px)` :  `${100 / (rowLength )}%`;
    return ({
        // some basic styles to make the items look a bit nicer
        // border: '1px solid',
        userSelect: 'none',
        display: 'flex',
        padding: grid * 2,
        // background: isDragging ? 'rgba(71, 174, 115, 0.5)' : '#fff',
        // border:  isDragging ? '1px solid rgba(95, 161, 224, 1)' : '',
        border:  isDragging ? '1px solid red' : '',

        borderRadius: 5,
        // borderColor : isDragging ? 'rgba(95, 161, 224, 1)' : '#eee',
        ...draggableStyle,
        // MINWIDTH MUSHT BE SAME AS FIRST IF PART OF TERNARY
        // width :  currentIsDragging === itemId ? 200 : division1,
        // minWidth: currentIsDragging === itemId ? 200  : division1,
      })
}

const Column = React.memo( (props) => {
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


    return (
        <Draggable  
            key={fieldId}
            draggableId={fieldId} 
            index={colIndex}
        >
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={
                    getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style, 
                        rowLength,
                        rowSnapshotIsDraggingOver,
                        fieldId,
                        currentIsDragging
                    )
                }
            >
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <DragIndicatorIcon style={{color: 'rgb(221, 221, 221)'}}/>
                </div>
                {rowLength}
                <Box 
                //style={{width: '100%'}}
                >
                    <Typography
                        className="test"
                        onClick={() => dispatch(selectField(rowId, fieldId))}
                        // contentEditable='true'
                        onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                    >
                        {label} 
                    </Typography>
                    { renderInput(type) } 
                </Box>
            </div>
        )}
        </Draggable>
    );
})

export default Column

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344

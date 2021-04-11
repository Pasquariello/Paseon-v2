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


const Column = React.memo( (props) => {
const dispatch = useDispatch()

    const {
        subItem,
        colIndex,
        rowSnapshotIsDraggingOver,
        rowLength,
        elemWidth,

        setSelectedField,
        selectedField,
    } = props;

    const getItemStyle = (isDragging, draggableStyle, rowLength, isDraggingOver, itemId ) => {

        const division1 = isDraggingOver ? `calc((${100 / (rowLength )}%) - (${200 / (rowLength )}px)` :  `${100 / (rowLength )}%`;

        return ({
            // some basic styles to make the items look a bit nicer
            // border: '1px solid',
            userSelect: 'none',
            display: 'flex',
            padding: grid * 2,
            // background: isDragging ? 'rgba(71, 174, 115, 0.5)' : '#fff',
            border:  isDragging ? '1px solid rgba(95, 161, 224, 1)' : '',
            borderRadius: 5,
            // borderColor : isDragging ? 'rgba(95, 161, 224, 1)' : '#eee',
            ...draggableStyle,
            // MINWIDTH MUSHT BE SAME AS FIRST IF PART OF TERNARY
            width :  elemWidth === itemId ? 200 : division1,
            minWidth: elemWidth === itemId ? 200  : division1,
          })
    }

    const renderInput = (item) => {
     const obj = {
         text: <TextInput />,
         textArea: <TextAreaInput/>,
         checkbox: <CheckboxInput />,
         radio: <RadioInput />,
         select: <SelectInput />,
     }
     return obj[item.type]
    }

    console.log(subItem.id)

    return (
        <Draggable  
            key={subItem.id}
            draggableId={subItem.id} 
            index={colIndex}
        >
            {(provided2, snapshot2) => (
                <div
                    onClick={() => dispatch(selectField(subItem))}

                    ref={provided2.innerRef}
                    {...provided2.draggableProps}
                    // const getItemStyle = (isDragging, draggableStyle, rowLength, isDraggingOver, itemId ) => {

                    style={
                        getItemStyle(
                            snapshot2.isDragging,
                            provided2.draggableProps.style, 
                            rowLength,
                            rowSnapshotIsDraggingOver,
                            subItem.id,
                        )
                    }
                > 
                    {/* <div 
                        style={{display: 'flex', placeContent: 'center'}}
                    > */}
                        <div {...provided2.dragHandleProps} style={{ display: 'flex', alignItems: 'center'}}>
                            <DragIndicatorIcon style={{color: 'rgb(221, 221, 221)'}}/>
                        </div>

                        <Box  style={{width: '100%'}}>
                            {/* INPUT TYPE */}
                            <Typography
                                className="test"
                                // contentEditable='true'
                                onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                            >
                                {subItem.label} 
                            </Typography>
                            { renderInput(subItem) }
                        </Box>
                    {/* </div> */}
                    {/* <button
                        onClick={() => props.setIsEdit(subItem)}
                    >Edit</button> */}
                </div>
            )}
        </Draggable>
    );
})

export default Column

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344

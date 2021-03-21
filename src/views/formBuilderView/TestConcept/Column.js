import React, { useState, useRef } from 'react';
import { 
    Droppable, 
    Draggable, 
} from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { Box, TextField, Button, Menu, MenuItem } from '@material-ui/core';

import CheckboxInput from 'src/components/formBuilderInputControls/checkboxInput';
import SelectInput from 'src/components/formBuilderInputControls/selectInput';
import TextAreaInput from 'src/components/formBuilderInputControls/textAreaInput';
import TextInput from 'src/components/formBuilderInputControls/textInput';
import RadioInput from 'src/components/formBuilderInputControls/radioInput';

const grid = 8;


const Column = (props) => {


    const {
        subItem,
        colIndex,
        rowSnapshotIsDraggingOver,
        rowLength,
        elemWidth
    } = props;

    const getItemStyle = (isDragging, draggableStyle, rowLength, isDraggingOver, itemId ) => {

        const division1 = isDraggingOver ? `calc((${100 / (rowLength )}%) - (${200 / (rowLength )}px)` :  `${100 / (rowLength )}%`;

        return ({
            // some basic styles to make the items look a bit nicer
            userSelect: 'none',
            display: 'flex',
            padding: grid * 2,
            background: isDragging ? 'lightgreen' : 'grey',
            border: '1px solid  red',
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



    return (
        <Draggable  
            key={subItem.id}
            draggableId={subItem.id} 
            index={colIndex}
        >
            {(provided2, snapshot2) => (
                <div
                    ref={provided2.innerRef}
                    {...provided2.draggableProps}
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
                    <span {...provided2.dragHandleProps}>
                        <FontAwesomeIcon
                            icon={faArrowsAlt}
                            style={{ float: "left" }}
                        />
                    </span>

                    <Box  style={{width: '100%'}}>
                        {/* INPUT TYPE */}
                        { renderInput(subItem) }
                    </Box>
                    <button
                        onClick={() => props.setIsEdit(subItem)}
                    >Edit</button>
                </div>
            )}
        </Draggable>
    );
}

export default Column

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
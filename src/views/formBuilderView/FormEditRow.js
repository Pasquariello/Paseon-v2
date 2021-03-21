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


const getListStyle = isDraggingOver => ({
  background: isDraggingOver && 'lightblue',
  padding: grid,
  border: '1px solid #eee',
  borderRadius: 5,
  margin: 10,
  position: 'relative',
  width: isDraggingOver ? `calc(100% + 200px)` : '100%'

//   width: '80%'
//   overflowX: 'auto',

});

const getListContainerStyle = isDraggingOver => ({
    display: 'flex',
    flexDirection: 'row',
    margin: 15,
    // justifyContent: 'center',
    // border:'4px solid blue',
    // width: '80%',
    // width: isDraggingOver ? `calc(100% - 200px)` : 'inherit'
  //   overflowX: 'auto',
  
  });


const FormEditRow = (props) => {
    const ref = useRef(null)
    const [colCount, setColCount ] = useState(props.subItems.length);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (increment) => {

       const insertIndex = props.rowIndex + increment <= 0 ? 0 : increment
       props.addNewRow(insertIndex)
       setAnchorEl(null);
    };

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
            width :  props.elemWidth === itemId ? 200 : division1,
            minWidth:  props.elemWidth === itemId ? 200  : division1,
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

  

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  // <Droppable droppableId="droppable" direction="horizontal">

    return (
        <>
            <Droppable droppableId={props.type} type={`droppableSubItem`} direction="horizontal" 
              
            // isDropDisabled={ props.subItems.length > 2 && props.type !== hoverRow ? true : false }
            >
            {(provided, snapshot) => (
                <div 
                    style={{
                        padding: 10,
                        minHeight: 100,
                        minWidth: 100,
                        border: '2px solid pink'
                    }}
                >
 
                {/* wrapper drag */}
                <div {...props.parentDrag} style={{marginRight: 10}}>
                    <FontAwesomeIcon
                    icon={faArrowsAlt}
                    style={{ float: "left" }}
                    />
                </div> 
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >

                        <div>
                            <div 
                                style={{
                                    // width: 100,
                                    height: 50,
                                    // background: 'purple',
                                    position: 'absolute',
                                    top: -25,
                                    right: 10,
                                    zIndex: 99,
                                    display: 'flex',
                                    border: '1px solid #eee'
                                }}
                            >
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    New Row {props.rowIndex}
                                </Button>
                                <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                >
                                <MenuItem onClick={() => handleClose(-1)}>Insert Above</MenuItem>
                                <MenuItem onClick={() => handleClose(1)}>Insert Below</MenuItem>
                                </Menu> 
                            </div>

                            <div
                                // ref={ref}
                                style={getListContainerStyle(snapshot.isDraggingOver)}

                            > 
                                {props.subItems.map((subItem, index) =>{
                                 return (
                                    <Draggable  
                                    key={subItem.id}
                                    draggableId={subItem.id} 
                                    index={index}>
                                        {(provided2, snapshot2) => (
                                            <div
                                                ref={provided2.innerRef}
                                                {...provided2.draggableProps}
                                                style={
                                                    getItemStyle(
                                                        snapshot2.isDragging,
                                                        provided2.draggableProps.style, 
                                                        props.subItems.length,
                                                        snapshot.isDraggingOver,
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
                                                {/* <button
                                                    onClick={() => props.remove(item.id, props.type)}
                                                >Delete</button> */}
                                                {/* {item.name} */}
                                            </div>
                                        )}
                                    </Draggable>
                                    
                            
                                )})
                                }
                                {provided.placeholder} 
                            </div>
                        </div>
                    </div>
                            
                </div>
            )}
            </Droppable>
        </>
    );
}

export default FormEditRow

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
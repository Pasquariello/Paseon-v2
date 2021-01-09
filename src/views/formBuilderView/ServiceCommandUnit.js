import React, { useState } from 'react';
import { 
    // DragDropContext, 
    Droppable, 
    Draggable, 
    onDragStart 
} from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { Box, TextField } from '@material-ui/core';


const grid = 8;


const getListStyle = isDraggingOver => ({
  background: isDraggingOver && 'lightblue',
  padding: grid,
  border: '1px solid #eee',
  borderRadius: 5,
  margin: 10,
  position: 'relative',
//   overflowX: 'auto',

});
const ServiceCommandUnit = (props) => {


    const getItemStyle = (isDragging, draggableStyle, rowLength, isDraggingOver) => {
        console.log(isDraggingOver)

        return ({
            // some basic styles to make the items look a bit nicer
            //userSelect: 'none',
            display: 'flex',
            padding: grid * 2,
            // margin: `0 ${grid}px 0 0`,
            border: '1px solid red',
            // change background colour if dragging
            background: isDragging ? 'lightgreen' : 'grey',
    
          
            // styles we need to apply on draggables
            ...draggableStyle,
            // width : isDragging ? '25px' : '100%',

            // width: props.elemWidth === '5feab443b53b2be8cef8406f'  ? `100px` : '100%',
            // width: isOver ? `${100 / rowLength}%` : '200px'
            width: isDraggingOver ? `${100 / rowLength}%`  : '20px'

            // width: `${100 / rowLength}%`,
            // maxWidth: '421.5px'

          })
    }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  // <Droppable droppableId="droppable" direction="horizontal">

    return (
        <>
            <Droppable onDragStart={() => console.log('dragging')} droppableId={props.type} type={`droppableSubItem`} direction="horizontal" isDropDisabled={ props.subItems.length > 3 ? true : false }>
            {(provided, snapshot) => (
                <div 
                    style={{
                        border: '1px solid green',
                        padding: 10,
                    }}
                >
                {/* wrapper drag */}
                <div {...props.parentDrag} style={{marginRight: 10}}>
                    <FontAwesomeIcon
                    icon={faGripVertical}
                    style={{ float: "left" }}
                    />
                </div> 
                    

                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >

                        <div 
                            style={{
                                overflowY: 'visible',
                                overflowX: 'auto',
                            }}
                        >
                            <div 
                                style={{
                                    width: 50,
                                    height: 25,
                                    background: 'purple',
                                    position: 'absolute',
                                    top: -12.5,
                                    right: 10,
                                    zIndex: 99,
                                }}
                            >

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    margin: 15,
                                    border:'4px solid red',
                                }}
                            > 
                                {/* <button 
                                    onClick={addNewRow}
                                    //   onClick={() => {addNewRow(index + 1)}}
                                >
                                    Insert Row below
                                </button> */}


                                {props.subItems.map((item, index) => (
                                
                                <>
                                    <Draggable  
                                    key={item.id}
                                    draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <>
                
                                    {/* <div
                                        key={item.id} 
                                        onMouseDown={(e)=> {console.log('e',e)}}
                                        style={{
                                            background: 'pink',
                                            margin: 5,
                                            // width: `100%`,
                                            // width: `${100 / props.subItems.length}%`,
                                            display: 'flex',
                                        }}
                                    > */}
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style, 
                                                        props.subItems.length,
                                                        snapshot.isDraggingOver
                                                    )}
                                                >
                                                    <span
                                                    {...provided.dragHandleProps}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faGripVertical}
                                                            style={{ float: "left" }}
                                                        />
                                                   </span>
                                                   
                                                    <Box style={{width: '100%'}}>
                                                        <TextField 
                                                            label={item.name}
                                                            variant="outlined" 
                                                            size="small"
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </Box>
                                                    {/* {item.name} */}
                                                </div>
                                    {/* </div> */}
                                            </>
                                        )}
                                    </Draggable>
                                    
                                </>
                                ))}
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

export default ServiceCommandUnit

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
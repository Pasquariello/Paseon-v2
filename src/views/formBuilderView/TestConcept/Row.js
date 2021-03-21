import React, { useState, useRef } from 'react';
import { 
    Droppable, 
} from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, Menu, MenuItem } from '@material-ui/core';
import Column from './Column';

const grid = 8;


const getListStyle = isDraggingOver => ({
  background: isDraggingOver && 'lightblue',
  padding: grid,
  border: '1px solid #eee',
  borderRadius: 5,
  margin: 10,
  position: 'relative',
  width: isDraggingOver ? `calc(100% + 200px)` : '100%'
});

const getListContainerStyle = isDraggingOver => ({
    display: 'flex',
    flexDirection: 'row',
    margin: 15,  
  });


const Row = (props) => {
    const ref = useRef(null)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (increment) => {

       const insertIndex = props.rowIndex + increment <= 0 ? 0 : increment
       props.addNewRow(insertIndex)
       setAnchorEl(null);
    };


  

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  // <Droppable droppableId="droppable" direction="horizontal">

    return (
        <Droppable droppableId={props.type} type={`droppableSubItem`} direction="horizontal">
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
                                    height: 50,
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
                                    <Column 
                                        colIndex={index}
                                        subItem={subItem}
                                        rowSnapshotIsDraggingOver={snapshot.isDraggingOver || false }
                                        rowLength={props.subItems.length || 0}
                                        elemWidth={props.elemWidth}
                                    />
                                
                                )
                            })
                                }
                                {provided.placeholder} 
                            </div>
                        </div>
                    </div>
                            
                </div>
            )}
        </Droppable>
 
    );
}

export default Row

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
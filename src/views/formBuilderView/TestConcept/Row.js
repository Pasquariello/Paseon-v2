import React, { useState, useRef } from 'react';
import { 
    Droppable, 
} from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddBoxIcon from '@material-ui/icons/AddBox';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { faGripVertical, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, Menu, MenuItem } from '@material-ui/core';
import Column from './Column';

const grid = 8;


const getListStyle = isDraggingOver => ({
  padding: grid,
  border: '1px solid #eee',
  minHeight: 100,
  borderRadius: 5,
  borderColor : isDraggingOver ? 'rgba(95, 161, 224, 1)' : '#eee',
  margin: 10,
  padding: 15,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: isDraggingOver ? `calc(100% + 200px)` : '100%'
});

const getListContainerStyle = isDraggingOver => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
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
                <div style={{display: 'flex', alignItems: 'center'}}>


                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div {...props.parentDrag} style={{marginRight: 10}}>

                            <DragIndicatorIcon/>
                        </div> 
                        <AddBoxIcon
                            onClick={handleClick}
                        />
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
                        <DeleteOutlineIcon
                            // onClick={handleClick}
                        />
                    </div>
            
                    <div 
                        style={{
                            minHeight: 100,
                            width: '100%',  
                            
                        }}
                    >
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >


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
                                    })}
                                    {provided.placeholder} 
                                </div>
                            {/* </div> */}
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
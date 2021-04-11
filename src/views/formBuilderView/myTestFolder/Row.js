import React, { useState, useRef, useEffect } from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { Droppable, Draggable } from "react-beautiful-dnd";

import Column from './Column';

import AddBoxIcon from '@material-ui/icons/AddBox';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { Button, Menu, MenuItem } from '@material-ui/core';


const getListStyle = isDraggingOver => ({
    // padding: 8,
    border: '1px solid #eee',
    minHeight: 100,
    borderRadius: 5,
    borderColor : isDraggingOver ? 'rgba(95, 161, 224, 1)' : '#eee',
    margin: 10,
    // padding: 15,
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


const Row = React.memo( (props) => {
    
    const { rowId, rowIndex, currentIsDragging } = props
    const dispatch = useDispatch();
    const row = useSelector(state => state.forms.structuredForm.find(row => row.id === rowId))
    console.log('ROW', row)
    return (
        <Draggable draggableId={rowId} index={rowIndex}> 
            {(dragProvided, snapshot) => (
                <div ref={dragProvided.innerRef} {...dragProvided.dragHandleProps} {...dragProvided.draggableProps}>
                    <Droppable 
                        droppableId={rowId} 
                        direction="horizontal"
                        // type={`droppableSubItem`}
                    >
                        {(dropProvided, dropSnapshot) => (
                        <div style={{display: 'flex'}}>
                            {/* {row.id} */}
                            {/* width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' */}
                                {/* Start Row Controls */}
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <AddBoxIcon
                                    // onClick={handleClick}
                                />
                                {/* <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    >
                                    <MenuItem onClick={() => handleClose(-1)}>Insert Above</MenuItem>
                                    <MenuItem onClick={() => handleClose(1)}>Insert Below</MenuItem>
                                </Menu> */}
                                <DeleteOutlineIcon
                                    // onClick={handleClick}
                                />
                            </div>
                            {/* End Row Controls */}
                            
                            <div 
                                style={{
                                    width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'
                                }}
                            >
                                <div style={{width: '100%', height: '100%', display:'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <DragIndicatorIcon style={{transform: 'rotate(90deg)'}}/>
                                </div>
                                <div
                                    ref={dropProvided.innerRef}
                                    style={getListStyle(dropSnapshot.isDraggingOver)}
                                    {...dropProvided.droppableProps}
                                >
                                    <div
                                        style={getListContainerStyle(dropSnapshot.isDraggingOver)}
                                    > 
                                        {row?.subItems?.length ? row.subItems.map((subItem, colIndex) =>{
                                            return (
                                                <Column 
                                                    currentIsDragging={currentIsDragging}
                                                    key={subItem.id}
                                                    fieldId={subItem.id}
                                                    colIndex={colIndex}
                                                    rowId={rowId}
                                                    label={subItem.label}
                                                    type={subItem.type}
                                                    rowLength={row.subItems?.length || 0} 
                                                    rowSnapshotIsDraggingOver={snapshot.isDraggingOver || false }
                                                />
                                                
                                            )
                                        }): ''}
                                            {dropProvided.placeholder} 
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
})


// const ListItem = connect(
//     ({ subItems }, { selectedField }) => ({ isSelected: subItems.find(field => field.id === selectedField.id) })
//   )(Row);

export default Row

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
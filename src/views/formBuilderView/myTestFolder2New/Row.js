import React, { useState, useRef, useEffect } from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { Container, Draggable } from "react-smooth-dnd";

import Column from './Column';

import './form.css';

import AddBoxIcon from '@material-ui/icons/AddBox';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { Button, Menu, MenuItem } from '@material-ui/core';

import { selectRowById } from 'src/store/rowsSlice';
import shortid from 'shortid';
import {addNewField} from 'src/store/rowsSlice';

const Row = React.memo( (props) => {
    const dispatch = useDispatch();
  

    
    const { rowId, rowIndex, onCardDrop} = props
    // const row = useSelector(state => state.forms.structuredForm.find(row => row.id === rowId))
    const row = useSelector((state) => selectRowById(state, rowId));



        // const row = props.row;

// Start
// const [anchorEl, setAnchorEl] = useState(null);

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (increment) => {
  

     const insertIndex = rowIndex + increment <= 0 ? 0 : rowIndex + increment
    
     props.addNewRow(insertIndex)
     setAnchorEl(null);
  };
// end

    const [anchorEl, setAnchorEl] = useState(null);
    
    const [ colWidth, setColWidth ] = useState(false);
    const [ isDragging, setIsDragging ] = useState(false)
    const [ isDisabled, setIsDisabled] = useState(false)
    // const rowLength = Object.keys(row?.columns).length //row.subItems?.length 


    return (
        <Draggable key={rowId}  className="column-drag-handle">
            {/* <Button onClick={() => {
                dispatch(addNewField({id: 1, position: 1}))
            }}>add</Button> */}
            <div 
                style={{position: 'relative', border: '1px solid #eee', display: 'flex', margin: 10, padding: 20,  overflowX: 'auto',
                }}
            >

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{marginRight: 10}}>

                        <DragIndicatorIcon />
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
                        <DeleteOutlineIcon/>
                </div>

              <Container
                    groupName="col"
                    orientation="horizontal"
                     // onDragStart={e => {
                    //     console.log("drag started", e)
                    //     console.log('start row id', rowId)
                    // }}
                    // onDragEnd={e => console.log("drag end", e)}
                    onDrop={e => {
                        setColWidth(false)
                        setIsDragging(false)
                        return onCardDrop(rowId, e)
                    }}
                    getChildPayload={index =>{
                        return row.columns[index]
                        // Object.entries(row.columns)[index]
                      //  getCardPayload(index)


                    }}
                    dragClass="card-ghost"
                    onDragEnter={() => {

                        // // setColWidth(true)
                        // if (rowLength  >= 2) setIsDisabled(true);
                        // else setIsDisabled(false);
                    }}
                    onDragLeave={() => {
                        // setColWidth(false)

                    }}
                    // onDropReady={p => console.log('Drop ready: ', p)}
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'drop-preview' 
                    }}
                    onDragStart={() => {
                        // setIsDragging(rowId)
                        // console.log('HIT')
                    }}
                    dropPlaceholderAnimationDuration={200}
                    // shouldAcceptDrop={(a, b, c) => {
                    //     const widthSum = row.subItems.reduce((a, b) => a + (b['width'] || 0), 0);
                    //     const foo = row.subItems.filter(col => col.id === b.id)
                    //     if (widthSum >= 100 && !foo.length || a.groupName !== 'col' ) return false
                    //     return true;
                    // }}
                    index={rowIndex}
                
                    style={{
                     
                        width: '100%', 

                        minHeight: '100px',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                    }}
                >
                    {row?.columns?.length ? row.columns.map((columnId) => {
                        return (
                             <Column 
                                key={columnId}
                                columnId={columnId}
                                // subItem={subItem}
                                // key={subItem.id}
                                // label={subItem.label}
                                // rowId={rowId}

                                // colWidth={colWidth}
                                // // isDragging={isDragging}
                                // subItem={subItem}

                                // fieldId={subItem.id}
                                // colIndex={colIndex}
                                // type={subItem.type}
                                // rowLength={row.subItems?.length || 0} 
                            />
                        )
                    }) : ''}
                    
                    </Container>
            </div>
            </Draggable>
   
    );
})


// const ListItem = connect(
//     ({ subItems }, { selectedField }) => ({ isSelected: subItems.find(field => field.id === selectedField.id) })
//   )(Row);

export default Row

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
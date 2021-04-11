import React, { useState, useRef, useEffect } from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { Container, Draggable } from "react-smooth-dnd";

import Column from './Column';

import './form.css';

import AddBoxIcon from '@material-ui/icons/AddBox';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { HeightTwoTone } from '@material-ui/icons';



const Row = React.memo( (props) => {
    
    
    const { rowId, rowIndex, currentIsDragging, onCardDrop, drop  } = props
    const dispatch = useDispatch();
    const row = useSelector(state => state.forms.structuredForm.find(row => row.id === rowId))

// Start
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = (increment) => {
        console.log('increment', increment)
        console.log('rowIndex', rowIndex)

         const insertIndex = rowIndex + increment <= 0 ? 0 : rowIndex + increment
        
         props.addNewRow(insertIndex)
         setAnchorEl(null);
      };
// end


    const getCardPayload = (index) => {
        // console.log('ROW ---', row)
        // return row.subItems[index]
        console.log('INDEX', index)
        const foo = row.subItems[
          index
        ];
        console.log('foo', foo)

        return row.subItems[
          index
        ];
      }

      const [ colWidth, setColWidth ] = useState(false);
      const [ isDragging, setIsDragging ] = useState(false)
      const [ isDisabled, setIsDisabled] = useState(false)
      console.log(colWidth)
      const rowLength = row.subItems?.length 
      const widthSettings = colWidth ? 80 / (rowLength + 1) : 80 / rowLength;

    return (

        <div key={rowId}>
            <div style={{width: '100%',  height: '100px', border: '1px solid #eee', display: 'flex'}}>
            {/* <span className="column-drag-handle">&#x2630;</span> */}

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{marginRight: 10}}>

                        <DragIndicatorIcon
                            className="column-drag-handle"
                        />
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
                style={{width: '100%', height: '100%', border: '1px solid green'}}
                 onDrop={(event) => drop(event, rowId)} 
                 onDragOver={(event) => {
                 
                     event.preventDefault()
                 }} 
                >
                    
                    {row?.subItems?.length ? row.subItems.map((subItem, colIndex) =>{
                        return (
                            <Column 
                                currentIsDragging={currentIsDragging}
                                onDragOver={onDragOver}
                                key={subItem.id}
                                fieldId={subItem.id}
                                colIndex={colIndex}
                                rowId={rowId}
                                label={subItem.label}
                                type={subItem.type}
                                rowLength={row.subItems?.length || 0} 
                                colWidth={colWidth}
                                isDragging={isDragging}
                                // rowSnapshotIsDraggingOver={snapshot.isDraggingOver || false }
                            />

                        )
                    }): ''}
                    
              
                </div>
            </div>
        </div>
        
    );
})


// const ListItem = connect(
//     ({ subItems }, { selectedField }) => ({ isSelected: subItems.find(field => field.id === selectedField.id) })
//   )(Row);

export default Row

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
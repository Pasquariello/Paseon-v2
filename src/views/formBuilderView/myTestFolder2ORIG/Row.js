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
    
    
    const { rowId, rowIndex, currentIsDragging, onCardDrop,  } = props
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

        <Draggable key={rowId}>
            <div style={{position: 'relative', border: '1px solid #eee', display: 'flex', margin: 10, }}>
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

                <Container
                    groupName="col"
                    orientation="horizontal"

                    // onDragStart={e => {
                    //     console.log("drag started", e)
                    //     console.log('start row id', rowId)
                    // }}
                    // onDragEnd={e => console.log("drag end", e)}
                    onDrop={e => {
                        // console.log('dropped', e)
                        setColWidth(false)
                        setIsDragging(false)
                        return onCardDrop(rowId, e)
                    }}
                    // getChildPayload={() => row}
                    getChildPayload={index =>
                        getCardPayload(index)
                    }
                    dragClass="card-ghost"
                    // dropClass="card-ghost-drop"
                    onDragEnter={() => {

                        setColWidth(true)
                        if (rowLength  >= 2) setIsDisabled(true);
                        else setIsDisabled(false);
                        // console.log("drag enter:", rowIndex, rowLength);
                    }}
                    onDragLeave={() => {
                        setColWidth(false)

                        // console.log("drag leave:", rowId);
                    }}
                    onDropReady={p => console.log('Drop ready: ', p)}
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'drop-preview' 
                    }}
                    onDragStart={() => {
                    console.log('start row id', rowId)
                    setIsDragging(rowId)
                    }}
                    dropPlaceholderAnimationDuration={200}
                    index={rowIndex}
                
                    style={{
                        // width: isDragging === rowId ? '100%' : '200%', // colWidth ? `calc(100 / ${(rowLength + 1)})%` : `100%`,
                        // border: '1px solid green', 
                        // width: '300px', 
                        width: '100%', 

                        // // minWidth: '400px', 
                        // // maxWidth: '400px',
                        // // height: '100%',
                        // // marginLeft: 35,
                        height: '100px',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                    }}
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
                                colWidth={colWidth}
                                isDragging={isDragging}
                                // rowSnapshotIsDraggingOver={snapshot.isDraggingOver || false }
                            />

                        )
                    }): ''}
                    
                {/* {column.children.map(card => {
                    return (
                    <Draggable key={card.id}>
                        <div {...card.props}>
                        <p>{card.data}</p>
                        </div>
                    </Draggable>
                    );
                })} */}
                </Container>
            </div>
        </Draggable>
        // <Draggable draggableId={rowId} index={rowIndex}> 
        //     {(dragProvided, snapshot) => (
        //         <div ref={dragProvided.innerRef} {...dragProvided.dragHandleProps} {...dragProvided.draggableProps}>
        //             <Droppable 
        //                 droppableId={rowId} 
        //                 direction="horizontal"
        //                 // type={`droppableSubItem`}
        //             >
        //                 {(dropProvided, dropSnapshot) => (
        //                 <div style={{display: 'flex'}}>
        //                     {/* {row.id} */}
        //                     {/* width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' */}
        //                         {/* Start Row Controls */}
        //                     <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        //                         <AddBoxIcon
        //                             // onClick={handleClick}
        //                         />
        //                         {/* <Menu
        //                             id="simple-menu"
        //                             anchorEl={anchorEl}
        //                             keepMounted
        //                             open={Boolean(anchorEl)}
        //                             onClose={() => setAnchorEl(null)}
        //                             >
        //                             <MenuItem onClick={() => handleClose(-1)}>Insert Above</MenuItem>
        //                             <MenuItem onClick={() => handleClose(1)}>Insert Below</MenuItem>
        //                         </Menu> */}
        //                         <DeleteOutlineIcon
        //                             // onClick={handleClick}
        //                         />
        //                     </div>
        //                     {/* End Row Controls */}
                            
        //                     <div 
        //                         style={{
        //                             width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'
        //                         }}
        //                     >
        //                         <div style={{width: '100%', height: '100%', display:'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        //                             <DragIndicatorIcon style={{transform: 'rotate(90deg)'}}/>
        //                         </div>
        //                         <div
        //                             ref={dropProvided.innerRef}
        //                             style={getListStyle(dropSnapshot.isDraggingOver)}
        //                             {...dropProvided.droppableProps}
        //                         >
        //                             <div
        //                                 style={getListContainerStyle(dropSnapshot.isDraggingOver)}
        //                             > 
        //                                 {row?.subItems?.length ? row.subItems.map((subItem, colIndex) =>{
        //                                     return (
        //                                         <Column 
        //                                             currentIsDragging={currentIsDragging}
        //                                             key={subItem.id}
        //                                             fieldId={subItem.id}
        //                                             colIndex={colIndex}
        //                                             rowId={rowId}
        //                                             label={subItem.label}
        //                                             type={subItem.type}
        //                                             rowLength={row.subItems?.length || 0} 
        //                                             rowSnapshotIsDraggingOver={snapshot.isDraggingOver || false }
        //                                         />
                                                
        //                                     )
        //                                 }): ''}
        //                                     {dropProvided.placeholder} 
        //                             </div>
        //                         </div>
                              
        //                     </div>
        //                 </div>
        //                 )}
        //             </Droppable>
        //         </div>
        //     )}
        // </Draggable>
    );
})


// const ListItem = connect(
//     ({ subItems }, { selectedField }) => ({ isSelected: subItems.find(field => field.id === selectedField.id) })
//   )(Row);

export default Row

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
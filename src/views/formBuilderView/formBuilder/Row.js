import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { Container, Draggable } from "react-smooth-dnd";

import Column from './Column';

import './form.css';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import { IconButton, Typography, Menu, MenuItem,  ButtonGroup } from '@mui/material';
import shortid from 'shortid';

import RowSettingsModal from './rowSettingsModal';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {incrementRowColCount, decrementRowColCount, moveCol} from 'src/store/formDetailsSlice';


// todo move to util file and delete
const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
    const result = [...arr];
  
    let itemToAdd = payload.id || shortid.generate();
  
    if (removedIndex !== null) {
  
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
  
      result.splice(addedIndex, 0, itemToAdd);
    }
  
    return result;
  };


const Row = React.memo( (props) => {
    const { 
        rowId, 
        rowIndex, 
        onCardDrop,
        // handleIncrement,
        // handleDecrement,
    } = props
    // const row = useSelector(state => state.forms.structuredForm.find(row => row.id === rowId))
    // const row = useSelector((state) => selectRowById(state, rowId));
    // const columns = row?.columns ? row.columns : [];

    const dispatch = useDispatch();
    // const row = useSelector((state) => state.formDetails.rowEntities[rowId]);
    const row = useSelector((state) => state.formDetails.rows[rowIndex]);

    const columns = row?.columns ? row.columns : [];

    const rowColumnCount = row?.colCount || 1;

    // const [rowColumnCount, setRowColumnCount] = useState(row?.colCount || 1);
    

    const handleIncrement =  useCallback(() => {
        if (rowColumnCount < 3) {
          dispatch(incrementRowColCount(rowIndex));
        // setRowColumnCount(rowColumnCount + 1)

  
        }
      }, [dispatch, rowColumnCount, rowIndex]);

      const handleDecrement = useCallback( () => {  
        if (rowColumnCount > 1 && row.columns.length < rowColumnCount) {
          dispatch(decrementRowColCount(rowIndex));
        //   setRowColumnCount(rowColumnCount - 1)
        }
      }, [dispatch, row.columns.length, rowColumnCount, rowIndex])

      const handleOnCardDrop = useCallback( (e) => {  
        onCardDrop(rowIndex, e)
      }, [onCardDrop, rowIndex])


    //   const onCardDrop = (dropResult)  => {
    //     // console.log('rowId', rowId)
  
    //     // console.log('dropResult', dropResult)
    //     // if (!dropResult.addedIndex && !dropResult.removedIndex){
    //     //   return
    //     // }
      
    //     if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
  
    //     //   const row = rowEntities[rowId];
    //       const dropResultCopy = {...dropResult}
    //       //new 
    //       const newCol = applyDrag(row.columns, dropResultCopy);
    //       const updatedRow = {...row, columns: newCol}
    //       const updatedColumns = updatedRow.columns.map((column, index) => ({
    //         id: column,
    //         changes: {
    //           ...dropResult.payload.body,
    //           position: index
    //         }
    //       }));
  
  
    //       const data = {
    //         updatedRow,
    //         updatedColumns,
    //       };
  
  
    //       dispatch(moveCol(data));
    //     }
       
    //   }

    // const handleChange = useCallback(() => props.callback(props.id), [props.id]);
   
    return (
        <>
        {/* <RowSettingsModal 
            open={settingsModalOpen} 
            handleClose={() => setSettingsModalOpen(false)}
            rowId={rowId}
        /> */}
        <Draggable key={rowId}  className="column-drag-handle">
            {/* <Button onClick={() => {
                dispatch(addNewField({id: 1, position: 1}))
            }}>add</Button> */}
            <div 
                style={{
                    position: 'relative', 
                    background: 'white', 
                    border: '1px solid #eee', 
                    display: 'flex',
                     margin: 10, 
                     padding: 20, 
                    overflowX: 'auto',
                }}
            >

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{marginRight: 10}}>
                    {/* TEMPORARY */}
                    {/* POSITION: {row.position} */}
                    {/* <br></br> */}
                    {/* ID: {row.id} */}
                        <DragIndicatorIcon />
                        </div> 
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
                        {/* <SettingsIcon onClick={() => handleToggleRowSettingsModal()}/>  */}
                        <DeleteOutlineIcon/>
                </div>
                
              <div style={{flex: 1}}>
             
                <Typography style={{ fontSize: 10 }}>Column Count</Typography>
                <div>
                    <IconButton size="small" 
                    onClick={handleDecrement}
                    ><RemoveIcon style={{ fontSize: 16 }}/></IconButton>
                        <Typography variant="caption" style={{ fontSize: 12 }}>{rowColumnCount}</Typography>
                    <IconButton size="small" 
                        onClick={handleIncrement}
                    ><AddIcon style={{ fontSize: 16 }}/></IconButton>
                </div>
          

                        
              <Container
                    groupName="rowContainer"
                    orientation="horizontal"
                    // onDrop={(e) => onCardDrop(rowIndex, e)}
                    onDrop={handleOnCardDrop}
                    getChildPayload={(index) =>{
                        return {
                            id: columns[index],
                            type: 'col',
                        }                   
                    }}
                    dragClass="card-ghost"
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
               
                    shouldAcceptDrop={(sourceContainerOptions, payload) => { 
                        if (row.columns.includes(payload.id)) {
                            return true;
                        }

                        if (row.colCount <= row.columns.length && !row.columns.includes(payload.id)) {
                            return false;
                        } 
                        return payload?.type === 'col'
                        // const widthSum = row.columns.reduce((a, b) => a + (b['width'] || 0), 0);
                        // const foo = row.columns.filter(col => col.id === b.id)
                        // console.log('widthSum', widthSum)
                        // if (widthSum >= 100 && !foo.length || a.groupName !== 'col' ) return false
                        // return true;
                    }}
                    index={rowIndex}
                
                    style={{
                        // flex: 1,
                        minHeight: '100px',
                        padding: 0,
                        display: 'flex',
                        border: '1px dashed',
                    }}
                >

                    {/* {
                       [...Array(rowColumnCount)].map((e, i) => {
                           return (
                                
                                    columns[i] ? (
                                        <Column 
                                            key={columns[i]}
                                            columnId={columns[i]}
                                            width={100 / row?.colCount || 1}
                                        />
                                    ): (
                                    //     <div 
                                    //     style={{
                                    //         flex: 1,
                                    //         border: '1px dashed'
                                    //     }}
                                    // >
            
                                    // </div>
                                    // )
                                    // (
                                       
                                    <Container    
                                        groupName="col"
                                        onDrop={e => onCardDrop(rowId, e)}
                                        getChildPayload={(index) =>{
                                            return {
                                                id: columns[index],
                                                type: 'col',
                                            }                   
                                        }}
                                        dragClass="card-ghost"
                                        dropPlaceholder={{                      
                                            animationDuration: 150,
                                            showOnTop: false,
                                            className: 'drop-preview-2' 
                                        }}
                                        dropPlaceholderAnimationDuration={200}
                                        style={{
                                            flex: 1,
                                            border: '1px dashed'
                                        }}
                                        shouldAcceptDrop={(sourceContainerOptions, payload) => {
                 
                                            if (row.columns.includes(payload.id)) {
                                                return true;
                                            }
                    
                                            if (row.colCount <= row.columns.length && !row.columns.includes(payload.id)) {
                                                return false;
                                            } 
                                    
                                        
                                            return payload?.type === 'col'
                                            // const widthSum = row.columns.reduce((a, b) => a + (b['width'] || 0), 0);
                                            // const foo = row.columns.filter(col => col.id === b.id)
                                            // console.log('widthSum', widthSum)
                                            // if (widthSum >= 100 && !foo.length || a.groupName !== 'col' ) return false
                                            // return true;
                                        }}
                                    ></Container>
                                    )
                                
                           )
                       })
                    } */}

                    
                      
                    
               
                    
                    {/* // DEPENDING ON HOW PASSING COLUMN! */}
                    {/* {columns?.length ? columns.map((columnId) => { */}
                    {/* // console.log('columnId', columnId) */}
                    {
                        columns?.length ? columns.map((column, index) => {      
                            console.log('column', column)
                            return (
                        
                                <Column 
                                    key={column.id}
                                    columnId={column.id}
                                    rowIndex={rowIndex || 0}
                                    colIndex={index}
                                    width={100 / row?.columns.length || 1}
                                />
                            )
                        }) : null
                    }                    
                    </Container>
                    </div>
            </div>
            </Draggable>
            </>
   
    );
})


// const ListItem = connect(
//     ({ subItems }, { selectedField }) => ({ isSelected: subItems.find(field => field.id === selectedField.id) })
//   )(Row);

export default Row

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
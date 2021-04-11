import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CheckboxControls from './InputTypes/Checkbox/CheckboxControls';


import {useSelector, useDispatch} from 'react-redux';
import {getSingleForm, createForm, deleteForm, addFormField, changeField} from 'src/actions/formActions';

const AddCustomField = (props) => {
    const selectedField = useSelector(state => state.forms.selectedField)
    const dataList = useSelector(state => state.forms.structuredForm)

    console.log('selectedField=====', selectedField)
    const dispatch = useDispatch()
    const {
        addNewField,
        customField,
        setCustomField,
        
    } = props

    // console.log('===== HERE ',
    // dataList.find(row => {
    //     console.log('row ===== ', row)
    //     console.log('selectedField =====', selectedField)
    //     return row.id === selectedField?.rowId
    // }).subItems?.filter(col => {
    //         console.log('COL =====', col)
    //         console.log('selectedField =====', selectedField)
    //          return col.id == selectedField?.colId
    //     }
    //     ) 
    // )


    // find row 
    const foo = dataList.find(row => row.id === selectedField?.rowId);

    // find col 
    const bar = foo?.subItems.find(col => col.id === selectedField?.colId);


    return (
        <Box style={{width: '100%', maxHeight: '100vh', position: 'relative'}}>
            <Box 
            style={{
                top: '0',
                left: 0,
                margin: '0 auto',
                textAlign: 'center',
                whiteSpace: 'nowrap',
            }}
            >
                <Box 
                    style={{ 
                        marginTop: 50,
                    }}
                > 

                    <Typography>
                        Custom
                    </Typography>

                    <Box display="flex" justifyContent="space-around" width="100%" style={{flexWrap: 'wrap'}}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="label"
                            label="Label"
                            name="label"
                            value={
                                bar?.label || ''
                            }
                            onChange={(e) => {
                                if ( selectedField ) {
                                
                                const newArray = dataList.map((row, rowIndex) => {
                                    const newSubItems = row.subItems.map((col, colIndex) => {
                                        if (col.id === selectedField.colId) {
                                            return {...col, ['label']:  e.target.value}
                                        }
                                        return col
                                    })
                                    return {...row, subItems: newSubItems}
                                })
                                dispatch(changeField(newArray))
                                // console.log(items); // ["B", "M", "X"]
                                console.log('newArray', newArray); //  ["B", "J", "X"]
                                
                                } else {
                                    setCustomField({ ...customField, name: e.target.value})
                                }
                            }}
                        />


                        <FormControl 
                            variant="outlined" 
                            fullWidth
                            required
                            // className={classes.formControl}
                        >
                            <InputLabel id="field-type-label">Field Type</InputLabel>
                            <Select
                            labelId="field-type-label"
                            id="field-type"
                            // value={age}
                            // onChange={handleChange}
                            value={customField.type}
                            onChange={(e) => setCustomField({ ...customField, type: e.target.value})}
                            label="Field Type"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="input">Input</MenuItem>
                                <MenuItem value="textArea">Text Area</MenuItem>
                                <MenuItem value="checkbox">Checkbox</MenuItem>
                                <MenuItem value="radio">Radio Button</MenuItem>
                                <MenuItem value="select">Select / Dropdown</MenuItem>
                            </Select>
                        </FormControl>

                        {/* TESTING NEW COMPONENT CONTROLS */}

                        <CheckboxControls 
                            // handleChangeTextField={handleChangeTextField}
                            // handleChangeOptions={handleChangeOptions}
                            // handleChangeDefault={handleChangeDefault}
                        />

                        {/* END */}

                        <Button
                            onClick={() => {
                                addNewField(customField)
                            }} 
                        >
                            Add
                        </Button>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddCustomField
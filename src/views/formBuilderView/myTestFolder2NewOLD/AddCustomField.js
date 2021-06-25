import React from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CheckboxControls from './InputTypes/Checkbox/CheckboxControls';


import {useSelector, useDispatch} from 'react-redux';
import {changeField} from 'src/actions/formActions';

const AddCustomField = (props) => {
    const selectedField = useSelector(state => state.forms.selectedField)
    const dataList = useSelector(state => state.forms.structuredForm)

    const dispatch = useDispatch()
    
    const {
        addNewField,
        customField,
        setCustomField,

        editField,
    } = props

    console.log(editField)

    // find row 
    const foo = dataList.find(row => row.id === selectedField?.rowId);

    // find col 
    const bar = foo?.subItems.find(col => col.id === selectedField?.colId);

    

    const handleChangeOptions = (event) => {
        const { value } = event.target;
        console.log('value', value)
        setCustomField({ ...customField, options: {...customField.options, values: value.split('\n')} })
    }

    const handleChangeDefault = (event) => {
        const { value } = event.target;
        setCustomField({ ...customField, options: {...customField.options, defaults: value } })

    }


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
                                bar?.label || 
                                customField.name
                            }
                            onChange={(e) => {
                                if ( selectedField ) {
                                    console.log('YO')
                                    //  editField(e)

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
                                <MenuItem value="text">Input</MenuItem>
                                <MenuItem value="textArea">Text Area</MenuItem>
                                <MenuItem value="checkbox">Checkbox</MenuItem>
                                <MenuItem value="radio">Radio Button</MenuItem>
                                <MenuItem value="select">Select / Dropdown</MenuItem>
                            </Select>
                        </FormControl>

                        {/* TESTING NEW COMPONENT CONTROLS */}

                        <CheckboxControls 
                            // handleChangeTextField={handleChangeTextField}
                            handleChangeOptions={handleChangeOptions}
                            options={customField.options || []}
                            handleChangeDefault={handleChangeDefault}
                        />

                        {/* END */}

                        <Button
                            onClick={() => {
                                console.log('Add New Field', customField)
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
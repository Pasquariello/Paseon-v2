import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CheckboxControls from './InputTypes/Checkbox/CheckboxControls';


import {useSelector, useDispatch} from 'react-redux';
import {getSingleForm, createForm, deleteForm, addFormField, changeField} from 'src/actions/formActions';

const AddCustomField = (props) => {
    const formData = useSelector(state => state.forms.selected)
    const dispatch = useDispatch()
    const {
        addNewField,
        customField,
        setCustomField,

        selectedField,
        fieldList,
        setFieldList,
        dataList,
        setDataList
    } = props

    console.log('FD', formData)
    console.log('selectedField', selectedField)

    // useEffect(() => {
    //     org();
    // }, [formData.fields])

    const org = () => {
        console.log('TAYLOR ')
        const destructuredFormFields = [];
        dataList.forEach((row, rowIndex) => {
                row.subItems.forEach((formField, formFieldIndex) => {
                const { label, name, type, id } = formField
                destructuredFormFields.push(
                    {
                    id, 
                    label,
                    name,
                    type,
                    col: formFieldIndex,
                    row: rowIndex,
                    }
                )
            })
            
        });
    
        dispatch(changeField(destructuredFormFields))
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

                    {
                    formData && selectedField ? console.log('k', formData.fields.find(field => field.id === selectedField.id)) : ''

                    }

                    <Box display="flex" justifyContent="space-around" width="100%" style={{flexWrap: 'wrap'}}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="label"
                            label="Label"
                            name="label"

                            // value={
                            //     formData && selectedField ? formData.fields.find(field => field.id === selectedField.id).label : ''
                            // }
                            // value={customField.name}
                            value={dataList[selectedField?.row]?.subItems[selectedField?.col].label || ''}
                            onChange={(e) => {
                                if ( selectedField ) {

                              
                                // const newList = fieldList.map(field => {
                                //     if (field.id === selectedField.id) {
                                //         return {...field, ['label']:  e.target.value}
                                //     }
                                //     return field
                                // })
                                // console.log('dataList', dataList)
                             
                                
                                const newArray = dataList.map((row, rowIndex) => {
                                    const newSubItems = row.subItems.map((col, colIndex) => {
                                        if (col.id === selectedField.id) {
                                            return {...col, ['label']:  e.target.value}
                                        }
                                        return col
                                    })
                                    return {...row, subItems: newSubItems}
                                })
                                // console.log(items); // ["B", "M", "X"]
                                console.log('newArray', newArray); //  ["B", "J", "X"]
                                setDataList(newArray)
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
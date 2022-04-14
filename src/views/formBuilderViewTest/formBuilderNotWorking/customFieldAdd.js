import React from 'react';

import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CheckboxControls from './InputTypes/Checkbox/CheckboxControls';

import { updateFieldDetails} from 'src/store/formDetailsSlice';



import {useSelector, useDispatch} from 'react-redux';
import {changeField} from 'src/actions/formActions';

const CustomFieldAdd = (props) => {
    const {selectedField} = useSelector(state => state.formDetails);
    const column = useSelector(state => state.formDetails.columns.find(col => col.id === selectedField));
    // const column = selectedField;

    const dispatch = useDispatch()
    
    const {
        addNewField,
        customField,
        setCustomField,

    } = props


    const handleChangeOptions = (event) => {
        const { value } = event.target;
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
                <Box> 

                    <Typography>
                        Custom
                    </Typography>

                    <Box display="flex" justifyContent="space-around" flexDirection="column">
                        <TextField
                            size="small"
                            variant="outlined"
                            required
                            margin="dense"
                            fullWidth
                            id="label"
                            label="Label"
                            name="label"
                            value={column?.label || ''}
                            onChange={(e) => {
                                if (column) { 
                                    dispatch(
                                        updateFieldDetails({id: column.id, field: 'label', value: e.target.value})
                                    )
                                }
                            }}
                        />


                        <FormControl 
                            variant="outlined" 
                            fullWidth
                            required
                            margin="dense"
                            size="small"

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

export default CustomFieldAdd
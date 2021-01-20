import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const AddCustomField = (props) => {
    const {
        addNewField,
        customField,
        setCustomField,
    } = props

    console.log('customField', customField)
    return (
        <Box style={{width: '33%', border: '1px solid red', maxHeight: '100vh', 
        position: 'relative'
        }}>
            <Box 
            style={{
                // position: 'absolute',
                top: '0',
                left: 0,
                // right: 0,
                margin: '0 auto',
                textAlign: 'center',
                // width: 'calc(33% - 4.25rem',
                // padding: '24px',
                whiteSpace: 'nowrap',
            }}
            >


              
                <Box 
                    style={{ 
                        marginTop: 50,
                        // width: '100%',
                        border: '1px solid blue', 
                        // margin: 24
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
                            autoFocus
                            value={customField.name}
                            onChange={(e) => setCustomField({ ...customField, name: e.target.value})}
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

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="default-value"
                            label="Default Value"
                            name="defaultValue"
                            autoFocus
                            value={customField.default}
                            onChange={(e) => setCustomField({ ...customField, default: e.target.value})}
                        />

                        <Button
                            onClick={() => {
                                addNewField(customField.name, customField.type)
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
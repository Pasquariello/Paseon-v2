import React, { useState } from 'react';

import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Input, ListItemText, Checkbox, Button, IconButton, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const CheckboxControls = (props) => {
    const {
        item,
        setIsEdit,
    } = props

    const [ options, setOptions ] = useState({
        defaults: [],
        values: [],
        required: false,
    })


    const handleChangeTextField = (event) => {
        const { name, value } = event.target;
        setOptions({...options, [name]: value })
    }

    const handleChangeOptions = (event) => {
        const { value } = event.target;

        setOptions({...options, values: value.split('\n') });
    }

    const handleChangeDefault = (event) => {
        const { value } = event.target;

        setOptions({...options, defaults: value });
    }


    return (
        <Box display="flex" flexDirection="column" width="100%">
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Options"
                helperText="Separate each option on a new line."
                multiline
                rows={4}
                value={options.values.join('\n')}
                onChange={handleChangeOptions}
            />
            <FormControl margin="dense" variant="outlined" >
                <InputLabel id="demo-simple-select-filled-label">Select Default</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={options.defaults}
                renderValue={(selected) => selected.join(', ')}
                onChange={handleChangeDefault}
                label="Select Default"
                multiple
                >
                    {
                        options.values.length 
                            ? (
                            options.values.filter(val => val).map(optionValue => (
                                <MenuItem key={optionValue} value={optionValue || ''} >
                                    <Checkbox checked={options.defaults.indexOf(optionValue) > -1} />
                                    <ListItemText primary={optionValue} />
                                </MenuItem>
                            ))
                            ) 
                            : (
                                <MenuItem value={''}>
                                    <em>Please Add Options</em>
                                </MenuItem>
                            )
                    }
                </Select>
            </FormControl>

        </Box>
    )
}

export default CheckboxControls
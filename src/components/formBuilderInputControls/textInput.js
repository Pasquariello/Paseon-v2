import React from 'react'
import {  TextField } from '@material-ui/core';

const TextInput = () => {

    return (
        <TextField 
            label="LABEL"
            variant="outlined" 
            size="small"
            fullWidth
            disabled
        />
    )
}

export default TextInput
import React from 'react'
import {  TextField } from '@material-ui/core';

const TextInput = () => {

    return (
        <TextField 
            // label="LABEL"
            variant="outlined" 
            size="small"
            fullWidth
            disabled
            style={{background: '#fff'}}
        />
    )
}

export default TextInput
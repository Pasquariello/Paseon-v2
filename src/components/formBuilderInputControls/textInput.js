import React from 'react'
import {  TextField } from '@material-ui/core';

const TextInput = React.memo( (props) => {
    const { fieldData } = props;
    return (
        <TextField 
            // label="LABEL"
            // label={fieldData.label}
            variant="outlined" 
            size="small"
            fullWidth
            disabled
            style={{background: '#fff'}}
        />
    )
})

export default TextInput
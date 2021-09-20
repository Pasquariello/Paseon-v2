import React from 'react'
import {  TextField } from '@material-ui/core';

const TextInput = React.memo( (props) => {
    const { label } = props;
    return (
        <TextField 
            // label="LABEL"
            label={label || ''}
            variant="outlined" 
            size="small"
            fullWidth
            disabled
            // style={{background: 'blue'}}
        />
    )
})

export default TextInput
import React from 'react'
import {  TextField } from '@mui/material';

const TextInput = React.memo( (props) => {
    const { label } = props;
    return (
        <div>
            {label}
        <TextField 
            // label="LABEL"
            label={label || ''}
            variant="outlined" 
            size="small"
            fullWidth
            disabled
            // style={{background: 'blue'}}
        />
        </div>
    )
})

export default TextInput
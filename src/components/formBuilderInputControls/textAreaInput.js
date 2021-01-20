import React from 'react'
import {  TextField } from '@material-ui/core';

const TextAreaInput = () => {

    return (
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
          fullWidth
        />
    )
}

export default TextAreaInput
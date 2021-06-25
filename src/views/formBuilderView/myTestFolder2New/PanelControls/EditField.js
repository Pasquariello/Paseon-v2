import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { set } from 'nprogress';
import CloseIcon from '@material-ui/icons/Close';


const EditField = (props) => {
    const {
        item,
        setIsEdit,
    } = props

    const [ customField, setCustomField ] = useState({
        name: '',
        type: '',
        default: '',
    })


    return (
        <Box style={{width: '33%', border: '1px solid red', maxHeight: '100vh', position: 'relative'}}>
            <IconButton aria-label="close" onClick={() => setIsEdit()}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}

export default EditField
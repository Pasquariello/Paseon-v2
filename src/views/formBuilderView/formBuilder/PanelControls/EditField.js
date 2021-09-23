import React, { useState } from 'react';

import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { set } from 'nprogress';
import CloseIcon from '@mui/icons-material/Close';


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
        <Box style={{width: '33%', border: '1px solid', maxHeight: '100vh', position: 'relative'}}>
            <IconButton aria-label="close" onClick={() => setIsEdit()} size="large">
                <CloseIcon />
            </IconButton>
        </Box>
    );
}

export default EditField
import React from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {IconButton, Paper, Typography} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';


function DetailsPanelHeader({ className, onSubmitSuccess, ...rest }) {

  return (
    
    <Paper elevation={1} style={{zIndex: 999, padding: 10}} square>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">
            Form Title
        </Typography>
        <IconButton>
            <AddIcon/>
        </IconButton>
        </Box>
    </Paper>
  );
}

export default DetailsPanelHeader;
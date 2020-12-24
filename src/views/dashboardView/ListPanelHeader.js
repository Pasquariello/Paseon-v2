import React from 'react';
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { IconButton, Paper, Typography} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

function ListPanelHeader({ className, onSubmitSuccess, ...rest }) {
  const history = useHistory();


  return (
    
    <Paper elevation={1} style={{zIndex: 999, padding: 10}} square>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
            select all
        </Typography>
        <IconButton
            onClick={() => history.push('/app/form-builder')}
        >
            <AddIcon/>
        </IconButton>
        </Box>
    </Paper>
  );
}

export default ListPanelHeader;
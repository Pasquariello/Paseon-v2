import React from 'react';

import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {IconButton, Paper, Typography} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';


function DetailsPanelHeader({ className, onSubmitSuccess, ...rest }) {

  return (
      <Paper elevation={1} style={{zIndex: 999, padding: 10}} square>
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
              Form Title
          </Typography>
          <IconButton size="large">
              <AddIcon/>
          </IconButton>
          </Box>
      </Paper>
  );
}

export default DetailsPanelHeader;
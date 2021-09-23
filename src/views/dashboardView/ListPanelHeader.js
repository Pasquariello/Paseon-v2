import React from 'react';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { IconButton, Paper, Typography} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

function ListPanelHeader({ className, onSubmitSuccess, ...rest }) {
  const history = useHistory();


  return (
      <Paper elevation={1} style={{zIndex: 999, padding: 10}} square>
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
              select all
          </Typography>
          <IconButton onClick={() => history.push('/app/form-builder')} size="large">
              <AddIcon/>
          </IconButton>
          </Box>
      </Paper>
  );
}

export default ListPanelHeader;
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Card, IconButton, Paper, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AddIcon from '@material-ui/icons/Add';

import { useDispatch } from 'react-redux';

function DetailsPanelHeader({ className, onSubmitSuccess, ...rest }) {
  const dispatch = useDispatch();


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
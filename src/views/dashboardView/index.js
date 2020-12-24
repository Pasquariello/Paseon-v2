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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ListPanel from './ListPanel';
import ListPanelHeader from './ListPanelHeader';
import DetailsPanel from './DetailsPanel';
import DetailsPanelHeader from './DetailsPanelHeader';


import { useDispatch } from 'react-redux';

function DashboardView({ className, onSubmitSuccess, ...rest }) {
  const dispatch = useDispatch();


  return (
    <Box display="flex" >
        <Box width="33%">
            <ListPanelHeader />
            <ListPanel />
        </Box>
        <Box width="77%">
            <DetailsPanelHeader />

            <DetailsPanel/>
        </Box>

    </Box>
  );
}

export default DashboardView;
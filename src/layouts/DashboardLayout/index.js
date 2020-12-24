import React from 'react';
import TopBar from './TopBar';
import {Box} from '@material-ui/core';
import Container from '@material-ui/core/Container';

const DashboardLayout = ({children}) => {
    
    return (
        <div style={{height: "100%"}}>
            <TopBar/>

            <Box
             //mb={8}
            >
            {children}
            </Box>
        </div>
    )
}

export default DashboardLayout;
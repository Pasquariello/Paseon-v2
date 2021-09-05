import React from 'react';
import TopBar from './TopBar';
import Navigation from './navigation';
import {Box} from '@material-ui/core';

// import Container from '@material-ui/core/Container';

const DashboardLayout = ({children}) => {
    
    return (
        <div style={{ minHeight: "100"}}>
            <Navigation />

            <Box style={{ marginLeft: '4.25rem', height: '100%' }}>
                {children}
            </Box>
        </div>
    )
}

export default DashboardLayout;
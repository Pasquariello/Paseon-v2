import React from 'react';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ListPanel from './ListPanel';
import ListPanelHeader from './ListPanelHeader';
import DetailsPanel from './DetailsPanel';
import DetailsPanelHeader from './DetailsPanelHeader';

function DashboardView({ className, onSubmitSuccess, ...rest }) {

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
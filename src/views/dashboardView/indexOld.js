import React, { useState } from 'react';
import {Box, IconButton} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ListPanel from './ListPanel';
import ListPanelHeader from './ListPanelHeader';
import DetailsPanel from './DetailsPanel';
import DetailsPanelHeader from './DetailsPanelHeader';

import Drawer from 'src/components/Drawer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Collapse from '@mui/material/Collapse';


function DashboardView({ className, onSubmitSuccess, ...rest }) {


  const OPEN_WIDTH = 33;
  const CLOSED_WIDTH = 0;

  const [ listWidth, setListWidth ] = useState(OPEN_WIDTH)
  const fullWidth = 100 - listWidth

  return <>
   {/* <Drawer/> */}
  <Box display="flex" >
      <Box width={`${listWidth}%`}>
        {/* <Collapse in={listWidth !== OPEN_WIDTH}> */}

          <ListPanelHeader />
          <ListPanel />
        {/* </Collapse> */}

          <Box
            style={{
              zIndex: 999,
              position: 'fixed',
              left: 0,
              width: `${listWidth}%`,
              // bottom: 95,
            }}
          >
            <Box
              boxShadow={4}
              style={{
                borderRadius: 45,
                float: 'right',
                position: 'absolute',
                right: -20,
                background: '#F4F6F8',
              }}
            >
              <IconButton
                onClick={() => {
                  if (listWidth === OPEN_WIDTH) {
                    setListWidth(CLOSED_WIDTH);
                  } else {
                    setListWidth(OPEN_WIDTH);
                  }
                }}
                size="large">

              { listWidth === OPEN_WIDTH ? <ArrowBackIosIcon  width="16px" fontSize="small" /> : <ArrowForwardIosIcon fontSize="inherit" /> }

                {/* <img
                  width="16px"
                  alt="Logo"
                  src="/static/code.svg"
                /> */}
              </IconButton>
            </Box>
          </Box>
      </Box>
      <Box width={`${fullWidth}%`}>
          <DetailsPanelHeader />

          <DetailsPanel/>
      </Box>

  </Box>
  </>;
}

export default DashboardView;
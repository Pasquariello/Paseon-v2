import React, { useState } from 'react';
import {Box, IconButton, Card, Paper, CardContent, Typography, Grid, CardActions, Button} from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ListPanel from './ListPanel';
import ListPanelHeader from './ListPanelHeader';
import DetailsPanel from './DetailsPanel';
import DetailsPanelHeader from './DetailsPanelHeader';

import Drawer from 'src/components/Drawer';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Collapse from '@material-ui/core/Collapse';

import { VictoryPie } from "victory";
import { Link } from '@material-ui/core';



function DashboardView({ className, onSubmitSuccess, ...rest }) {


  const OPEN_WIDTH = 33;
  const CLOSED_WIDTH = 0;

  const [ listWidth, setListWidth ] = useState(OPEN_WIDTH)
  const fullWidth = 100 - listWidth

  return (
    <Box style={{display: 'flex', flexDirection:'column', width: '100%', height: '100vh'}} p={4}>
        <Box item my={2}>
          <Typography variant="h6">Quick Statistics</Typography>
        </Box>
        <div style={{flex: '1 1 auto'}}>
          <Grid container spacing={4}>
            <Grid item sm={4} style={{height: 200, width: '100%'}}>
              <Card style={{height: '100%'}}>
                <CardContent style={{height: '100%'}}>
                  <Box height="100%" display="flex" alignItems="center">
                    <Typography variant="h4">
                      3 Forms
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item sm={4} style={{height: 200, width: '100%'}}>
              <Card style={{height: '100%'}}>
                <CardContent style={{height: '100%'}}>
                  <Box height="100%" display="flex" alignItems="center">
                    <Typography variant="h4">
                      420 Submissions
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item sm={4} style={{height: 200, width: '100%'}}>
              <Card style={{height: '100%'}}>
                <CardContent style={{height: '100%'}}>
                  <Box height="100%" display="flex" alignItems="center">
                    <Typography variant="h4">
                      Add
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>

      <div style={{display: 'flex', alignItems:'flex-end', flex: '1 1 auto'}}>
        <Grid container spacing={8}>
          <Grid item lg={6} style={{width: '100%'}}>
            <Box item my={2}>
              <Typography variant="h6">Usage</Typography>
            </Box>
            <Card style={{height: '464px'}}>
              <CardContent>
                <Typography>
                  view submissions per form
                </Typography>
                <div 
                  style={{    
                    height: '400px',
                    maxHeight:'100%',
                    width: 'auto'
                  }}
                >
                  <VictoryPie 
                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>


          <Grid item lg={6} style={{width: '100%'}}>
            <Box item my={2} display="flex" justifyContent="space-between">
              <Typography variant="h6">Form List</Typography>
              
              <Link href="/app/form-builder" color="inherit">
                <Typography variant="h6">Add New</Typography>
              </Link>
              
            </Box>
            <Card style={{height: '464px'}}>
              <CardContent>
                <Box p={2} style={{height: '400px', overflowY: "scroll"}}>
                <ListPanel/>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Box>

  );
}

export default DashboardView;
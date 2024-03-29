import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import AnalyticsTable from './analytics';

import { VictoryPie, VictoryChart, VictoryHistogram, VictoryBar, VictoryLabel} from "victory";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
        {value === index && (
            <Container>
                <Box> 
                    {children}
                </Box>
            </Container>
        )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    zInde: -1,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function ChartToggle({chartData}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const barChartData = chartData.map(obj => {
      const {label, ...newObj} = obj
      return newObj
  })


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0} style={{zIndex: 0}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Pie Chart" {...a11yProps(0)} />
          <Tab label="Bar Chart" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} component={'div'}>
        <div 
            style={{    
            height: '350px',
            maxHeight:'100%',
            width: 'auto'
            }}
        >
            <VictoryPie 
                sortKey="y"
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                data={chartData}
            />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} component={'div'}>
      <div 
            style={{    
            height: '350px',
            maxHeight:'100%',
            width: 'auto'
            }}
        >
        <VictoryChart
            domainPadding={{ x: 25 }}        
        >
        <VictoryBar
            barWidth={({ index }) => index * 2 + 40}
            sortKey="y"
            data={barChartData}
            labels={({ datum }) => datum.y}
            style={{ 
                labels: { fill: "#fff" },
                data: { fill: "#6B0772" } 
            }}
            labelComponent={<VictoryLabel dy={30}/>}

        />
        </VictoryChart>
        </div>
      </TabPanel>
    </div>
  );
}

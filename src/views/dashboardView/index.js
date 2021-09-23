import React, { useState, useEffect } from 'react';
import {Box, IconButton, Card, Paper, CardContent, Typography, Grid, CardActions, Button, Menu, MenuItem} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ListPanel from './ListPanel';
import ListPanelHeader from './ListPanelHeader';
import DetailsPanel from './DetailsPanel';
import DetailsPanelHeader from './DetailsPanelHeader';

import Drawer from 'src/components/Drawer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Collapse from '@mui/material/Collapse';

import { VictoryPie } from "victory";
import { Link } from '@mui/material';

import {useSelector, useDispatch} from 'react-redux';
import { getForms } from 'src/actions/formActions';
import { getFormSubmissionCount } from 'src/actions/submissionActions';
import ChartToggle from './ChartToggle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHistory } from 'react-router-dom';
import largeTriangles from './largeTriangles.svg';


// NEW 
import {selectAllForms, fetchForms} from 'src/store/formsSlice'

function DashboardView({ className, onSubmitSuccess, ...rest }) {

  const dispatch = useDispatch();
  // const formList = useSelector(state => state.forms.list)
  // const formList = useSelector(selectAllForms(state));
  const formList = useSelector((state) => selectAllForms(state));
  console.log('formList', formList)
  const formSubmissionCount = useSelector(state => state.submissions.form_submission_count)
  const history = useHistory();

  const OPEN_WIDTH = 33;
  const CLOSED_WIDTH = 0;

  const [ listWidth, setListWidth ] = useState(OPEN_WIDTH);
  const [chartDataList, setCharDataList] = useState([]);
  const [chartData, setChartData ] = useState([]);
  const [formListMenuOpen, setFormListMenuOpen] = useState(null);
  const [checked, setChecked] = useState([]);

  const fullWidth = 100 - listWidth


  useEffect(() => {
    dispatch(fetchForms());
    dispatch(getFormSubmissionCount());
  }, [dispatch]);


  useEffect(() => {
    if (formSubmissionCount && formList) {
      const temp = checked.map(form => {
        const submissionData = formSubmissionCount.find(submissions => form.id === submissions._id.$oid);
        const total = submissionData ? submissionData.total :  0;
        return  { x: form.name, y: total, label: `${form.name}: ${total}` }
      })
      setChartData(temp)
    }
  }, [formList, formSubmissionCount, checked])


  useEffect(() => {
    setChecked(formList.map(form => ({name: form.name, id: form._id.$oid})))
  }, [formList])

  const handleOpenFormList = (event) => {
    setFormListMenuOpen(event.currentTarget);
  };

  return (
    <Box style={{display: 'flex', flexDirection:'column', width: '100%', minHeight: '100vh', height: '100%', background: '#e0e0e0',}} p={4}>
        <Box my={2}>
          <Typography variant="h6">Quick Statistics</Typography>
        </Box>
        <div style={{flex: '1 1 auto'}}>
          <Grid container spacing={4}>
            <Grid item md={4} style={{height: 200, width: '100%'}}>
              <Card style={{height: '100%'}}>
                <CardContent>
                  <Box height="100%" display="flex" alignItems="center">
                    <Typography variant="h4">
                      { formList.length } {formList.length > 1 ? `forms` : `form`}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    aria-controls="Form Menu" 
                    aria-haspopup="true" 
                    onClick={handleOpenFormList}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    View
                  </Button>
                  <Menu
                    id="Form Menu"
                    anchorEl={formListMenuOpen}
                    keepMounted
                    open={Boolean(formListMenuOpen)}
                    onClose={() => setFormListMenuOpen(null)}
                  >
                    {
                      formList.map(form => (
                        <MenuItem 
                          key={form._id.$oid}
                          onClick={() => history.push(`/app/form-builder/details/${form._id.$oid}`)}>
                            {form.name}
                        </MenuItem>
                      ))
                    }
      
                  </Menu>
                </CardActions>
              </Card>
            </Grid>

            <Grid item md={4} style={{height: 200, width: '100%'}}>
              <Card style={{height: '100%'}}>
                <CardContent style={{height: '100%'}}>
                  <Box height="100%" display="flex" alignItems="center">
                    <Typography variant="h4">
                       3 Submissions
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={4} style={{height: 200, width: '100%'}}>
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
            <Box my={2}>
              <Typography variant="h6">Usage</Typography>
            </Box>
            <Card style={{height: '464px'}}>
              <CardContent>
                <ChartToggle
                  chartData={chartData}
                />
              </CardContent>
            </Card>
          </Grid>


          <Grid item lg={6} style={{width: '100%'}}>
            <Box my={2} display="flex" justifyContent="space-between">
              <Typography variant="h6">Form List</Typography>
              
              <Link onClick={() => history.push("/app/form-builder")} color="inherit">
                <Typography variant="h6">Add New</Typography>
              </Link>
              
            </Box>
            <Card style={{height: '464px'}}>
              <CardContent>
                <Box p={2} style={{height: '400px', overflowY: "scroll"}}>
                <ListPanel
                  checked={checked}
                  setChecked={setChecked}
                  // handleCheckboxSelect={() => setCharDataList([...chartDataList, ])}
                  formList={formList}
                />
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
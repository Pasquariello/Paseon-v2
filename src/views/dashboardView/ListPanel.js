import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getForms } from 'src/actions/formActions';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Checkbox, Divider, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import { deleteForm } from 'src/actions/formActions';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
}));


function ListPanel({ formList, checked, setChecked }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [openConfirmation, setOpenConfirmation] = useState();

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  const handleToggleChecked = (value) => () => {
    const currentIndex = checked.findIndex(checkedItem => checkedItem.id === value.id);
    
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
        {formList.map((form, index) => (
            <div 
            // key={form._id.$oid}
            >
              <ListItem >
                <Checkbox
                  // onClick={handleToggleChecked({name: form.name, id:form._id.$oid})}
                  // checked={checked.findIndex(checkedItem => checkedItem.id === form._id.$oid) !== -1 }
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                  <ListItemText primary={form.name} secondary={form.date} />
                  
                  <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Box mx={1}>
                      {/* <Link component="button" onClick={()=> history.push(`/app/form-builder/details/${form._id.$oid}`)}><Typography style={{fontSize: 12, }}>Details</Typography></Link> */}
                    </Box>
                    <Box mx={1}>
                      <Link component="button"><Typography style={{fontSize: 12}}>Submissions</Typography></Link>
                    </Box>
                    <Box mx={1}>
                      {/* <Link component="button" onClick={()=> history.push(`/app/form-builder/edit/${form._id.$oid}`)}><Typography style={{fontSize: 12}}>Edit</Typography></Link> */}
                    </Box>
                    <Box mx={1}>
                      {/* <Link onClick={() => setOpenConfirmation(form._id.$oid)} component="button"><Typography style={{fontSize: 12}}>Delete</Typography></Link> */}
                    </Box>
                    
                  </div>
              </ListItem>

              {(index + 1) !== formList.length ? <Divider component="li" /> : '' }
              
            </div>
        ))}

      <ConfirmationDialog 
        open={!!openConfirmation}
        setOpen={setOpenConfirmation}
        contentText={`
          ${openConfirmation}
          By deleting this form you will also be losing all associated submission data.  
          Make sure to export any information you would like to save.
          Are you sure you would like to continue?
        `}
        titleText="Confrim Delete Form?"
        confirmationAction={()=> dispatch(deleteForm(openConfirmation)) }
      />
    </List>
  );
}

export default ListPanel;
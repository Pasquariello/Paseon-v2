import React, { useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getForms } from '../../actions/formActions';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { IconButton } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Checkbox } from '@material-ui/core';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    // zIndex: -1,
    // border: '1px solid red',
  },
}));

const formList = [
    {
        name: 'Contact Form',
        date: 'Aug 4, 2018',
    },
    {
        name: 'Party RSVP',
        date: 'Apr 29, 1991',
    },
    {
        name: 'Checkout Form',
        date: 'Jan 17, 1993',
    },
    {
      name: 'Checkout Form',
      date: 'Jan 17, 1993',
  },
  {
    name: 'Checkout Form',
    date: 'Jan 17, 1993',
},
{
  name: 'Checkout Form',
  date: 'Jan 17, 1993',
},
{
  name: 'Checkout Form',
  date: 'Jan 17, 1993',
},
{
  name: 'Checkout Form',
  date: 'Jan 17, 1993',
},


]


function ListPanel({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const formList = useSelector(state => state.forms.list)

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);


  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  console.log('formList', formList)
  return (
    <List className={classes.root}>
        {formList.map((form, index) => (
            <div key={form._id}>
              <ListItem>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                  <ListItemText primary={form.name} secondary={form.date} />
                  <IconButton 
                    ref={anchorRef}
                    aria-label="delete" 
                    className={classes.margin}
                    onClick={handleToggle}
                  >
                      <MoreVertIcon  />
                  </IconButton>


                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

              </ListItem>

              {(index + 1) !== formList.length ? <Divider component="li" /> : '' }
              
            </div>
        ))}
    </List>
  );
}

export default ListPanel;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import { IconButton } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: -1,
    // border: '1px solid red',
  },
}));

const listItems = [
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

]


function ListPanel({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        {listItems.map(item => (
            <>
            <ListItem>
                <ListItemText primary={item.name} secondary={item.date} />
                <IconButton aria-label="delete" className={classes.margin}>
                    <MoreVertIcon  />
                </IconButton>
            </ListItem>
            <Divider component="li" />
            </>
        ))}
    </List>
  );
}

export default ListPanel;
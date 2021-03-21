import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationDialog(props) {
  const { contentText, titleText, open, setOpen, confirmationAction } = props;
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen();
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {titleText ? titleText : ''}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {contentText ? contentText : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button 
            onClick={() => {
            handleClose();
            confirmationAction();
            }} 
            color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}
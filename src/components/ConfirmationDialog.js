import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function ConfirmationDialog(props) {
  const { contentText, titleText, open, setOpen, confirmationAction, content, cancelText} = props;
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
        {titleText ? titleText: ''}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {contentText ? contentText : ''}
              <br/><br/>
              {content ? content : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelText}
          </Button>
          {
            confirmationAction ? (
              <Button 
                onClick={() => {
                handleClose();
                confirmationAction();
                }} 
                color="primary" autoFocus>
                Agree
              </Button>
            ) : null
          }
          
        </DialogActions>
      </Dialog>
  );
}
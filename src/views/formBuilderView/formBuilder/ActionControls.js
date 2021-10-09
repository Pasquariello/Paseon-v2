import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createForm, deleteForm} from 'src/actions/formActions';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import {addForm} from 'src/store/formDetailsSlice';
// import {user} from 'src/store/accountSlice';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import Highlight from 'react-highlight'

function ActionControls({ formTitle, dataList }) {
  const dispatch = useDispatch();
  const selectedFormData = useSelector(state => state.forms.selected)
  const user = useSelector(state => state.account.user)

  const form = useSelector(state => state.forms)
  const formDetails = useSelector(state => state.formDetails)

  const [open, setOpen] = useState(false);

  const renderDetailsBody = () => {
    return (
        <>
        <Typography variant="body1">Embed: </Typography>
        <Highlight language='html'>
        {`
        <script src="https://google.com"/>
        <PaseonForms id="FOO_ID"/>
        `}     
        </Highlight>
        <br/>
        <Typography variant="body1">Link: </Typography>
        <Typography variant="body2">https://paseon-forms/form/FOO_ID</Typography>

        </>
    )
  }

  const [isLoading, setIsLoading] = useState(false);
    return (
        <Box>
            <Button
                onClick={ async () => {
                    console.log('formDetails', formDetails) 
                    console.log('userId', user)
                    const userId = user.id;
                    dispatch(addForm({formDetails, userId}))
                }}
            >
                Save
                {isLoading ? <CircularProgress /> : ''}
            </Button>

            {/* {selectedFormData?._id?.$oid
                ? (
                    <Button
                    onClick={() => { dispatch(deleteForm(selectedFormData?._id.$oid)) }}
                    >
                    Delete
                    </Button>
                ) 
                : ''
            } */}

            <Button>
                Preview
            </Button>

            <Button onClick={() => setOpen(true)}>
                Details
            </Button>

            <ConfirmationDialog
                content={renderDetailsBody()} 
                titleText={'Share Options'}
                cancelText={'Close'}
                contentText={'choose to either embed your new awesome form within an existing site or share it using this unique link'}
                open={open} 
                setOpen={() => setOpen(!open)}
            />


        </Box>
    );
}

export default ActionControls;

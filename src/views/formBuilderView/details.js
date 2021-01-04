import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import {useSelector, useDispatch} from 'react-redux';
import { getSingleForm } from '../../actions/formActions';
import { useParams } from "react-router-dom";



function Details({ className, onSubmitSuccess, ...rest }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleForm(id))
  }, [dispatch, id])

  return (
    <Box display="flex" height="100%" width="100%" style={{border: '1px solid red'}}>
        details
    </Box>
  );
}

export default Details;

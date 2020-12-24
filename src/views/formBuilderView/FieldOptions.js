import React from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Card, CardContent, Container, Paper, TextField, FormGroup} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';


const FieldOptions = (props) => {
    const {
        addNewField
    } = props

    const commonFields = [
        {
            name: 'First Name',
            type: 'text',
        },
        {
            name: 'Last Name',
            type: 'text',
        },
        {
            name: 'Phone',
            type: 'text',
        },
        {
            name: 'Email',
            type: 'text',
        },
        {
            name: 'State',
            type: 'select',
        },
        {
            name: 'Zip Code',
            type: 'text',
        },

    ]

    return (
        <Box style={{width: '33%', border: '1px solid red'}}>
        <Box style={{width:'inherit', position: 'fixed'}}>
            <Box style={{ border: '1px solid blue', padding: 24}}>
                <Typography>
                    Common
                </Typography>

                <Box display="flex" justifyContent="space-around" width="100%" style={{flexWrap: 'wrap'}}>
                {commonFields.map((field, i) => {
                    return (
                        <Box key={field.name} style ={{width: '33.33%', border: '1px solid red'}}>
                            <Box>
                                <Paper
                                    onClick={() => {
                                        addNewField(field.name, field.type)
                                    }} 
                                    style={{width: '100%', border: '1px solid blue', backgroundColor: '#ddd', cursor: 'pointer', padding: 10}}
                                >
                                    <Typography>
                                        {field.name}
                                    </Typography>
                                </Paper>
                            </Box>
                         </Box>
                    )
                })}
                </Box>
            </Box>
        </Box>
        </Box>
    )
}

export default FieldOptions
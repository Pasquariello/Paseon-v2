import React from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';


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
        <Box style={{width: '33%', border: '1px solid red', maxHeight: '100vh', 
        position: 'relative'
        }}>
            <Box 
            style={{
                position: 'absolute',
                top: '0',
                left: 0,
                // right: 0,
                margin: '0 auto',
                textAlign: 'center',
                // width: 'calc(33% - 4.25rem',
                // padding: '24px',
                whiteSpace: 'nowrap',
            }}
            >
                <Box 
                style={{ 
                    // width: '100%',
                    border: '1px solid blue', 
                // margin: 24
            }}
                >
                    <Typography>
                        Common
                    </Typography>

                    <Box display="flex" justifyContent="space-around" width="100%" style={{flexWrap: 'wrap'}}>
                    {commonFields.map((field, i) => {
                        return (
                            <Box 
                                key={field.name}
                                style ={{width: '33.33%', border: '1px solid red'}}
                            >
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
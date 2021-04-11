import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FieldEdit from './EditField';
import CustomFieldAdd from '../AddCustomField';


const FieldOptions = (props) => {
    const {
        addNewField,
        isEdit,

        setFieldList,
        selectedField,
        fieldList,

        dataList,
        setDataList,
    } = props

    const [ customField, setCustomField ] = useState({
        name: '',
        type: '',
        default: '',
    })

    const commonFields = [
        {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
        },
        {
            name: 'lastName',
            type: 'text',
            label: 'Last Name',

        },
        {
            name: 'Phone',
            type: 'text',
            label: 'phone',

        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',

        },
        {
            name: 'state',
            type: 'select',
            label: 'State',

        },
        {
            name: 'zipCode',
            type: 'text',
            label: 'Zip Code',

        },

    ]

    return (
     <>
                <Box>
                    <Typography>
                        Common
                    </Typography>

                    <Box display="flex" justifyContent="space-around" width="100%" style={{flexWrap: 'wrap'}}>
                    {commonFields.map((field, i) => {
                        return (
                            <Box 
                                p={1}
                                key={field.name}
                                style ={{width: '33.33%'}}
                            >
                                    <Paper
                                        onClick={() => {
                                            addNewField(field)
                                        }} 
                                        style={{width: '100%', backgroundColor: '#ddd', cursor: 'pointer', padding: 10}}
                                    >
                                        <Typography>
                                            {field.label}
                                        </Typography>
                                    </Paper>
                            </Box>
                        )
                    })}
                    </Box>
                </Box>
                <CustomFieldAdd addNewField={addNewField} customField={customField} setCustomField={setCustomField} 
                selectedField={selectedField} fieldList={fieldList} setFieldList={setFieldList} dataList={dataList} setDataList={setDataList}/>

        </>
    )
}

export default FieldOptions
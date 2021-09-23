import shortid from 'shortid';
import React from 'react';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

export const commonFields = [
    {
        id: shortid.generate(),
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        width: 50,
        variant: 'common',
    },
    {
        id: shortid.generate(),
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        width: 50,
        variant: 'common',
    },
    {
        id: shortid.generate(),
        name: 'Phone',
        type: 'text',
        label: 'phone',
        width: 50,
        variant: 'common',
    },
    {
        id: shortid.generate(),
        name: 'email',
        type: 'text',
        label: 'Email',
        width: 50,
        variant: 'common',
    },
    {
        id: shortid.generate(),
        name: 'state',
        type: 'select',
        label: 'State',
        width: 50,
        variant: 'common',
    },
    {
        id: shortid.generate(),
        name: 'zipCode',
        type: 'text',
        label: 'Zip Code',
        width: 50,
        variant: 'common',
    },

]

export const basicFields = [
    {
        id: shortid.generate(),
        name: 'basicTextField',
        type: 'text',
        label: 'Text Field',
        width: 50,
        variant: 'basic',
        icon: <TextFieldsIcon />,
    },
    {
        id: shortid.generate(),
        name: 'basicTextArea',
        type: 'text',
        label: 'Text Area',
        width: 50,
        variant: 'basic',
        icon: <ViewHeadlineIcon/>,
    },
    {
        id: shortid.generate(),
        name: 'basicCheckbox',
        type: 'checkbox',
        label: 'Simple Checkbox',
        width: 50,
        variant: 'basic',
        icon: <CheckBoxIcon/>,
    },
]


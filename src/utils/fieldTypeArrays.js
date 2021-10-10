import shortid from 'shortid';
import React from 'react';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

// TODO - 
// move all fields to their own objects which can then be added to thier own common field layouts

const firstName = {
    id: shortid.generate(),
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    width: 50,
    variant: 'common',
}

const lastName = {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    width: 50,
    variant: 'common',
}

const addressLine1 = {
    name: 'addressLine1',
    type: 'text',
    label: 'Address Line 1',
    width: 50,
    variant: 'common',
}

const addressLine2 = {
    name: 'addressLine2',
    type: 'text',
    label: 'Address Line 2',
    width: 50,
    variant: 'common',
}

const city = {
    name: 'city',
    type: 'text',
    label: 'City',
    width: 50,
    variant: 'common',
}

const state = {
    name: 'state',
    type: 'text',
    label: 'State',
    width: 50,
    variant: 'common',
}

const zipCode = {
    name: 'zipCode',
    type: 'text',
    label: 'Zip Code',
    width: 50,
    variant: 'common',
}


export const commonFoo = [
    {
        id: shortid.generate(),
        label: 'First Name',
        name: 'firstname',
        properties: [firstName]
    },
    {
        id: shortid.generate(),
        label: 'Last Name',
        name: 'lastname',
        properties: [lastName],
    },
    {
        id: shortid.generate(),
        label: 'Full Name',
        name: 'fullname',
        properties: [ firstName, lastName]
    },
    {
        id: shortid.generate(),
        label: 'Address',
        name: 'fullname',
        properties: [
            {...addressLine1, fullWidth: true},
            {...addressLine2, fullWidth: true},
            city,
            state,
            zipCode,

        ]
    },
]

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


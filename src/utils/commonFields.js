import shortid from 'shortid';

export const commonFields = [
    {
        id: shortid.generate(),
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        width: '50%'
    },
    {
        id: shortid.generate(),
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        width: '50%'


    },
    {
        id: shortid.generate(),
        name: 'Phone',
        type: 'text',
        label: 'phone',
        width: '50%'


    },
    {
        id: shortid.generate(),
        name: 'email',
        type: 'text',
        label: 'Email',
        width: '50%'


    },
    {
        id: shortid.generate(),
        name: 'state',
        type: 'select',
        label: 'State',
        width: '50%'


    },
    {
        id: shortid.generate(),
        name: 'zipCode',
        type: 'text',
        label: 'Zip Code',
        width: '50%'


    },

]
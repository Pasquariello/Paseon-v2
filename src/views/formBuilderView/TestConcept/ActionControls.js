import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createForm, deleteForm} from 'src/actions/formActions';
import { Button } from '@material-ui/core';



function ActionControls({ formTitle, dataList }) {
  const dispatch = useDispatch();
  const selectedFormData = useSelector(state => state.forms.selected)
  
    return (
        <>
            <Button
                onClick={() => {
                    // this will re clean the array row and col values
                    // array will need to be the value to 'save'/post back to the DB
                    const destructuredFormFields = [];
                    dataList.forEach((row, rowIndex) => {
                            row.subItems.forEach((formField, formFieldIndex) => {
                            const { label, name, type } = formField
                            destructuredFormFields.push(
                                {
                                label,
                                name,
                                type,
                                col: formFieldIndex,
                                row: rowIndex,
                                }
                            )
                        })
                        
                    });

                    dispatch(createForm({
                        name: formTitle || '',
                        user_id: '5fe978e8cc7faa326371ff65',
                        fields: destructuredFormFields
                    }))
                }}
            >
                Save
            </Button>

            {selectedFormData?._id.$oid
                ? (
                    <Button
                    onClick={() => { dispatch(deleteForm(selectedFormData?._id.$oid)) }}
                    >
                    Delete
                    </Button>
                ) 
                : ''
            }

        </>
    );
}

export default ActionControls;

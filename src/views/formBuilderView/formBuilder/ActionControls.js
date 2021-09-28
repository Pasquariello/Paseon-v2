import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createForm, deleteForm} from 'src/actions/formActions';
import { Button, CircularProgress } from '@mui/material';



function ActionControls({ formTitle, dataList }) {
  const dispatch = useDispatch();
  const selectedFormData = useSelector(state => state.forms.selected)

  const form = useSelector(state => state.forms)
  const formDetails = useSelector(state => state.formDetails)

  const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <Button
                onClick={ async () => {
             
                    return
                    setIsLoading(true)
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

                    await dispatch(createForm({
                        name: formTitle || '',
                        fields: destructuredFormFields
                    }))

                    setIsLoading(false);
                }}
            >
                Save
                {isLoading ? <CircularProgress /> : ''}
            </Button>

            {selectedFormData?._id?.$oid
                ? (
                    <Button
                    onClick={() => { dispatch(deleteForm(selectedFormData?._id.$oid)) }}
                    >
                    Delete
                    </Button>
                ) 
                : ''
            }

            <Button>
                Preview
            </Button>

        </>
    );
}

export default ActionControls;

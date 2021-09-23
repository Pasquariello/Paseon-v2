import React from 'react'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const CheckboxInput = (props) => {
    const { fieldData } = props;

    return (
        <FormControl 
            component="fieldset" 
            // className={classes.formControl}
        >

            {/* <FormLabel component="legend">{fieldData.name}</FormLabel> */}
            <FormGroup>
            {fieldData.options.values.map((optionVal, index) => {
                return (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox 
                                checked={fieldData.options.defaults.includes(optionVal)} 
                                name={optionVal} 
                            />
                        }
                        label={optionVal}
                    />
                )
            })}
            
           
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxInput
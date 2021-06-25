import React from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
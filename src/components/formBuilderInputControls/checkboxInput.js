import React from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxInput = () => {

    return (
        <FormControl 
            component="fieldset" 
            // className={classes.formControl}
        >

            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox 
                        // checked={gilad} 
                        // onChange={handleChange} 
                        name="gilad" 
                    />
                }
                label="Gilad Gray"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        // checked={gilad} 
                        // onChange={handleChange} 
                        name="gilad" 
                    />
                }
                label="Gilad Gray"
            />
             <FormControlLabel
                control={
                    <Checkbox 
                        // checked={gilad} 
                        // onChange={handleChange} 
                        name="gilad" 
                    />
                }
                label="Gilad Gray"
            />
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxInput
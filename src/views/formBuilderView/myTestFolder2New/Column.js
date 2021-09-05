import React from 'react';
import { Draggable } from "react-smooth-dnd";
import './form.css';

import {useSelector, useDispatch} from 'react-redux';

import TuneIcon from '@material-ui/icons/Tune';
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {selectField} from 'src/store/formsSlice';
import { selectColumnById, updateFieldDetails } from 'src/store/columnsSlice';

import CheckboxInput from 'src/components/formBuilderInputControls/checkboxInput';
import SelectInput from 'src/components/formBuilderInputControls/selectInput';
import TextAreaInput from 'src/components/formBuilderInputControls/textAreaInput';
import TextInput from 'src/components/formBuilderInputControls/textInput';
import RadioInput from 'src/components/formBuilderInputControls/radioInput';
import './form.css';


const Column = React.memo( (props) => {
    const {
        colWidth,
    } = props
const dispatch = useDispatch()

    const {
        columnId
        // fieldId,
        // label,
        // rowId,
        // rowLength,
        // //new
        // subItem

    } = props;
    const column = useSelector((state) => selectColumnById(state, columnId));

    const {id, label, type} = column || {id: '', label: '', type: 'text'};
    // const widthSettings = colWidth ? 100 / (rowLength + 1) : 100 / rowLength;
    

    const renderInput = () => {
        const obj = {
            text: <TextInput fieldData={column}/>,
            textArea: <TextAreaInput fieldData={column}/>,
            checkbox: <CheckboxInput fieldData={column} />,
            radio: <RadioInput fieldData={column} />,
            // select: <SelectInput fieldData={column} />,
        }
        return obj[type]
    }

    return (
        <Draggable 
            key={id} 
            style={{
            
            }}

        >
        <div
            className="draggable-item-horizontal"
            style={{
                border: '1px solid red',
                // width: '300px',
                display: "flex",
                flex: 1,
                justifyContent: 'space-between'
            }}
        >
            <div>
            <button  onClick={() => dispatch(selectField(columnId))} > select</button>
            {/* Temporary */}
            {console.log(column)}
            POSITION: {column.position}
            <p>{label}</p>
            <p>{columnId}</p>
            { renderInput() } 
            </div>

             <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
 
                    <Tooltip title="Tune Properties">
                        <IconButton aria-label="tune">
                            <TuneIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Field">
                        <IconButton aria-label="edit">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                    
                </div>
        </div>
                   

           
        </Draggable>
     
    );
}, )

export default Column

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344

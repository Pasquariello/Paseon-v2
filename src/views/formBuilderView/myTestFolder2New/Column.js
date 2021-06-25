import React from 'react';
import { Draggable } from "react-smooth-dnd";
import './form.css';

import {useDispatch} from 'react-redux';

import TuneIcon from '@material-ui/icons/Tune';
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {selectField} from 'src/actions/formActions';

import CheckboxInput from 'src/components/formBuilderInputControls/checkboxInput';
import SelectInput from 'src/components/formBuilderInputControls/selectInput';
import TextAreaInput from 'src/components/formBuilderInputControls/textAreaInput';
import TextInput from 'src/components/formBuilderInputControls/textInput';
import RadioInput from 'src/components/formBuilderInputControls/radioInput';
import './form.css';


const Column = React.memo( (props) => {
    const {
        colWidth,
        isDragging
    } = props
const dispatch = useDispatch()

    const {
        fieldId,
        colIndex,
        label,
        rowId,
        type,
        currentIsDragging,
        rowSnapshotIsDraggingOver,
        rowLength,

        //new
        subItem

    } = props;


    const widthSettings = colWidth ? 100 / (rowLength + 1) : 100 / rowLength;
    

    const renderInput = () => {
        const obj = {
            text: <TextInput fieldData={subItem}/>,
            textArea: <TextAreaInput fieldData={subItem}/>,
            checkbox: <CheckboxInput fieldData={subItem} />,
            radio: <RadioInput fieldData={subItem} />,
            select: <SelectInput fieldData={subItem} />,
        }
        return obj[subItem.type]
    }

    return (
        <Draggable 
        key={fieldId} 
        style={{
         
        }}

        >
        <div
            className="draggable-item-horizontal"
            style={{
                border: '1px solid red',
                width: '300px',
                display: "flex",
                justifyContent: 'space-between'
            }}
        >
            <div>
            <button  onClick={() => dispatch(selectField(rowId, fieldId))} > select</button>
            <p>{label}</p>
            <p>{fieldId}</p>
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
})

export default Column

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344

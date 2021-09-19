import React from 'react';
import { Draggable } from "react-smooth-dnd";
import './form.css';

import {useSelector, useDispatch} from 'react-redux';

import TuneIcon from '@material-ui/icons/Tune';
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
        columnId,
        // fieldId,
        // label,
        // rowId,
        // rowLength,
        // //new
        // subItem

    } = props;
    // const column = useSelector((state) => selectColumnById(state, columnId));
    const column = useSelector((state) => state.formDetails.columnEntities[columnId]);
    console.log('column', column);
    if (column) {
        console.log('column.position', column.position);
    }
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
                // border: '1px solid red',
                width: '300px',
                // width: '100%',
                display: "flex",
                height: '100%',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'space-between',
                background: 'red'
            }}
        >
            <div 
                style={{
                    flex: 1,
                    // justifyContent: 'center',
                    display: "flex",
                    // height: '100%',
                    // flex: 1,
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
            {/* Temporary */}
            {/* <button  onClick={() => dispatch(selectField(columnId))} > select</button> */}
            POSITION: {column ? column.position : 'MISSING POS'}
            {/* <p>{columnId}</p> */}
            {/* <p>{label}</p> */}
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

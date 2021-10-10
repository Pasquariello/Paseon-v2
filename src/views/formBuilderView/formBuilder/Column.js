import React, {useCallback} from 'react';
import { Draggable } from "react-smooth-dnd";
import './form.css';

import {useSelector, useDispatch} from 'react-redux';
import {selectField} from 'src/store/formDetailsSlice';

import TuneIcon from '@mui/icons-material/Tune';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import {  TextField } from '@mui/material';


// import CheckboxInput from 'src/components/formBuilderInputControls/checkboxInput';
// import SelectInput from 'src/components/formBuilderInputControls/selectInput';
// import TextAreaInput from 'src/components/formBuilderInputControls/textAreaInput';
import TextInput from 'src/components/formBuilderInputControls/textInput';
// import RadioInput from 'src/components/formBuilderInputControls/radioInput';


import './form.css';


const Column = React.memo( (props) => {
    const dispatch = useDispatch();
    const {
        colWidth,
    } = props

    const {
        columnId,
        width,

        rowIndex,
        colIndex,
    } = props;
    const WIDTH = `${width}%`
    // const column = useSelector((state) => state.formDetails.columnEntities[columnId]);
    // const column = useSelector((state) => state.formDetails.rows[rowIndex].columns[colIndex]);
    const column = useSelector((state) => state.formDetails.columns.find(col => col.id === columnId));
    
    const {id, label, type} = column || {id: '', label: '', type: 'text'};
    // const widthSettings = colWidth ? 100 / (rowLength + 1) : 100 / rowLength;


    const renderInput = useCallback(() => {
            const obj = {
                // text: <p>hello</p>
                text: <TextInput label={label || ''}/>,
                // text: <TextInput fieldData={column}/>,
                // textArea: <TextAreaInput fieldData={column}/>,
                // checkbox: <CheckboxInput fieldData={column} />,
                // radio: <RadioInput fieldData={column} />,
                // select: <SelectInput fieldData={column} />,
            }
            return obj[type]
    }, [label, type]);


    const fooCol = {
        fields: [
            {
                label: 'First Name',
                type: 'text',
                fullWidth: false
            },
            {
                label: 'Last Name',
                type: 'text',
                fullWidth: false

            },
            {
                label: 'Emial',
                type: 'text',
                fullWidth: true

            },
        ]
    }

    return (
        <Draggable 
            key={id} 
            style={{
                flex: 1

            }}

        >
        
     


        <div
            className="draggable-item-horizontal"
            style={{
             
                width: '100%',
                display: "flex",
                height: '100%',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'space-between',
                // padding: 10,
                // width: WIDTH,
          
            }}
        >
            <div 
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: 'center',
                }}
            >
            {/* Temporary */}
            {/* <button  onClick={() => dispatch(selectField(columnId))} >select</button> */}
            {/* POSITION: {column ? column.position : 'MISSING POS'} */}
            {/* <p>{columnId}</p> */}
            {/* <p>{label}</p> */}

            {/* TODO useCallback */}
            {/* https://itnext.io/6-tips-for-better-react-performance-4329d12c126b */}
                {/* { label ? renderInput() : null }  */}
        
        {/* Start Example of layout */}
        <div style={{display: 'flex',  flex: 1, flexWrap: 'wrap', justifyContent: 'space-between', width: '100%',  border: '1px solid red'}}>
        {
            column.fields.map(field => {
                return (
                    <div 
                    style={{
                        // display: 'flex',  
                        // flex: !field.fullWidth && 1,
                        flexWrap: 'wrap',
                        width: field.fullWidth ? "100%" : '50%'
                    }}
                    >
                    <div style={{padding: 8}}>
                    <TextField 
                        margin='normal'
                        label={field.label}
                        fullWidth={field.fullWidth}
                        style={{ width: !field.fullWidth && '100%' }}
                    />
                    </div>
                 </div>
                )
            })
        }
        </div>
        {/* End Example of layout */}

            </div>

             <div 
             style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
 
                    <Tooltip title="Tune Properties">
                        <IconButton  
                        //  {/* TODO useCallback */}
                        // https://itnext.io/6-tips-for-better-react-performance-4329d12c126b
                        onClick={() => dispatch(selectField(column.id))}
                         aria-label="tune" size="large">
                            <TuneIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Field">
                        <IconButton aria-label="edit" size="large">
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

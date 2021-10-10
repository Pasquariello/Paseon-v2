import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Draggable } from "react-smooth-dnd";
import {useDispatch} from 'react-redux';

import {commonFields, basicFields, commonFoo} from 'src/utils/fieldTypeArrays';
import Icon from '@mui/material/Icon';
import { display } from '@mui/system';
import { Typography } from '@mui/material';


// import { commonFields } from 'src/utils/commonFields';
const List = styled.div`
    border: 1px
        ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
`;

const Item = styled.div`
    color: pink;
    display: flex;
    user-select: none;
    // padding: 0.5rem;
    // margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    min-height: 
    border: 1px
        ${(props) => {
            return (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')}
        }
`;


const FieldOptions = (props) => {
    const dispatch = useDispatch();
    const {
        addNewField,
        variant,
    } = props

    const fieldArrayOptions = {
        common: commonFields,
        basic: basicFields,
    }

    const foo = {
        common: commonFoo,
        basic: basicFields,
    }

    console.log('fooArrray', foo[variant])


    const fieldArray = foo[variant];
    console.log('fieldArray', fieldArray)

    return (
 
        <Container 
            groupName="rowContainer" 
            behaviour="copy" 
            style={{
                display: 'flex',
                // background: 'red', 
                overflow: 'hidden',
                flexWrap: 'wrap',
            }}
            // getChildPayload={i => ({
            //     id: fieldArray[i].id, 
            //     body: fieldArray[i], 
            //     type: 'col' })} 

        >
        {
          fieldArray.map((field, i) => {
              console.log('FIELD', field)
            return (
              <Draggable 
                key={i}
                style={{
                    border: '1px solid #eee',
                    borderRadius: 5,
                    minWidth: 125,
                    flex: 1,
                    margin: 4,
                    padding: 4,
                    cursor: 'pointer',
                    background: '#fff ',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
                onClick={() =>{
                     const fieldToAdd = field.properties ? field.properties : [field]
                     addNewField(fieldToAdd)}
                }
                className="draggable-item" 

            >
                {field.icon && field.icon}
               <Typography>{field.label}</Typography>
            </Draggable>
            );
          })
        }
      </Container> 
    )
}

export default FieldOptions

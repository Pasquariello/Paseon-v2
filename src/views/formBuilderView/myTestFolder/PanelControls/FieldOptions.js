import React, { useState } from 'react';
import styled from 'styled-components';

import { 
    Droppable, 
    Draggable, 
} from 'react-beautiful-dnd';

import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FieldEdit from './EditField';
import CustomFieldAdd from '../AddCustomField';

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
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0  0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};

 `;

const Clone = styled(Item)`
  + div {
    // display: none!important;
  }
`;


const ITEMS = [
    {
        id: '1',
        content: 'Headline'
    },
    {
        id: '2',
        content: 'Copy'
    },
    {
        id: '3',
        content: 'Image'
    },
    {
        id: '4',
        content: 'Slideshow'
    },
    {
        id: '5',
        content: 'Quote'
    }
];


const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
    const item = items[rubric.source.index];
    return (
      <React.Fragment>
        <Item
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={snapshot.isDragging ? "dragging" : ""}
            >
            {item.content}
        </Item>
      </React.Fragment>
    );
  };


const FieldOptions = (props) => {
    const {
        addNewField,
        isEdit,

        setFieldList,
        selectedField,
        fieldList,

        commonFields,
        dataList,
    } = props

    const [ customField, setCustomField ] = useState({
        name: '',
        type: '',
        default: '',
    })

    return (
     <React.Fragment>
                {/* <Box> */}
                    {/* <Typography>
                        Common
                    </Typography> */}
                    <Droppable
                        renderClone={getRenderItem(ITEMS, props.className)}
                        droppableId="ITEMS"
                        isDropDisabled={true}
                    >
                    {(provided, dropSnapshot) => (
                        <div
                            ref={provided.innerRef}
                        >
                            {ITEMS.map((item, index) => {
                                const shouldRenderClone = item.id === dropSnapshot.draggingFromThisWith;

                                return (
                                <React.Fragment key={item.id}>
                                {shouldRenderClone ? (
                                  <Clone>{item.content}</Clone>
                                ) : (
                                    <Draggable draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={snapshot.isDragging ? "dragging" : ""}
                                            >
                                            {item.content}
                                            </Item>
                                        </React.Fragment>
                                        )}
                                    </Draggable>
                                )}
                                </React.Fragment>
                            )})}
                             {provided.placeholder}
                        </div>
                    )}
                   
                </Droppable>
                {/* </Box> */}
                {/* <CustomFieldAdd addNewField={addNewField} customField={customField} setCustomField={setCustomField} 
                selectedField={selectedField} fieldList={fieldList} setFieldList={setFieldList} /> */}

        </React.Fragment>
    )
}

export default FieldOptions
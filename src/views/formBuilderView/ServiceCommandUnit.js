import React from 'react';
import { 
    // DragDropContext, 
    Droppable, 
    Draggable, 
    // onDragStart 
} from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'


const grid = 8;


const getListStyle = isDraggingOver => ({
  background: isDraggingOver && 'lightblue',
  padding: grid,
//   overflow: 'auto',
  border: '1px solid #eee',
  borderRadius: 5,
  margin: 10,
  position: 'relative',
//   overflowX: 'auto',

});

const ServiceCommandUnit = (props) => {
    // const {
    //     addNewRow
    // } = props


    const getItemStyle = (isDragging, draggableStyle, rowLength) => ({
        // some basic styles to make the items look a bit nicer
        //userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,
        border: '1px solid red',
        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',
        // width: '100%',
        // width: `${100 / (rowLength )}%`,

      
        // styles we need to apply on draggables
        ...draggableStyle,
        draggableStyle: !isDragging ? '10%' : `${100 / (rowLength + 2 )}%`,
      
      });

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  // <Droppable droppableId="droppable" direction="horizontal">

    return (
        <>
            <Droppable droppableId={props.type} type={`droppableSubItem`} direction="horizontal" isDropDisabled={ props.subItems.length > 3 ? true : false }>

            {(provided, snapshot) => (
                <div 
                    style={{
                        border: '1px solid green',
                        padding: 10,
                    }}
                >
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >

                        <div 
                            style={{
                                overflowY: 'visible',
                                overflowX: 'auto',
                            }}
                        >
                            <div 
                                style={{
                                    width: 50,
                                    height: 25,
                                    background: 'purple',
                                    position: 'absolute',
                                    top: -12.5,
                                    right: 10,
                                    zIndex: 99,
                                }}
                            >

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    margin: 15,
                                    border:'1px solid red'
                                }}
                            > 
                                {/* <button 
                                    onClick={addNewRow}
                                    //   onClick={() => {addNewRow(index + 1)}}
                                >
                                    Insert Row below
                                </button> */}

                                {props.subItems.map((item, index) => (
                                
                                <>
                                    <Draggable  
                                    key={item.id}
                                    draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <>
                
                                    {/* <div
                                        key={item.id} 
                                        onMouseDown={(e)=> {console.log('e',e)}}
                                        style={{
                                            background: 'pink',
                                            margin: 5,
                                            // width: `100%`,
                                            // width: `${100 / props.subItems.length}%`,
                                            display: 'flex',
                                        }}
                                    > */}
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style, 
                                                        props.subItems.length
                                                    )}
                                                >
                                                    <span
                                                
                                                    ></span>
                                                    <FontAwesomeIcon
                                                        icon={faGripVertical}
                                                        style={{ float: "left" }}
                                                    />
                                                    {item.name}
                                                </div>
                                    {/* </div> */}
                                            </>
                                        )}
                                    </Draggable>
                                    
                                </>
                                ))}
                                {provided.placeholder} 
                            </div>
                        </div>
                    </div>
                            
                </div>
            )}
            </Droppable>
        </>
    );
}

export default ServiceCommandUnit

// Put the thing into the DOM!
//  https://codesandbox.io/s/j4yvnr7n83?file=/src/answer.js:1198-1344
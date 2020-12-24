import React, { useState, useEffect, useRef } from 'react';

import Box from '@material-ui/core/Box';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ServiceCommandUnit from "./ServiceCommandUnit";
import FieldOptions from './FieldOptions'

// import { useDispatch } from 'react-redux';
import shortid from 'shortid';


const formElementsList = [
    {
        id: shortid.generate(),
        name: 'First Name',
        row: 0,
        col: 0,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'Last Name',
        row: 0,
        col: 6,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'Address',
        row: 0,
        col: 1,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'Phone',
        row: 1,
        col: 0,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'Email',
        row: 1,
        col: 1,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'Row',
        row: 2,
        col: 1,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'thing1',
        row: 2,
        col: 0,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'thing2',
        row: 3,
        col: 0,
        type: 'text',
    },
    {
        id: shortid.generate(),
        name: 'thing2.5',
        row: 5,
        col: 0,
        type: 'text',
    },

    {
        id: shortid.generate(),
        name: 'thing3',
        row: 9,
        col: 0,
        type: 'text',
    },
]


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    const foo = result.map((el, index) => {
        return {...el, col:  index}
    });

    return foo;
  };


function FormBuilderView({ className, onSubmitSuccess, ...rest }) {

//   function getRows(list){
//     console.log('getRows', list.map(elem => elem))
//     return list.map(elem => elem.row);
//   }

//   const getMaxRow = (list) => {
//     return Math.max(...getRows(list));
//   }


  const [dataList, setDataList] = useState([]);


  useEffect(() => {
    buildArrayMatrix(formElementsList);
  }, []);


//   const sortedFormElements = (array) => {
//     return array.sort(function (row1, row2){

//         // sort by row
//         if  (row1.row < row2.row) return -1;
//         if  (row1.row > row2.row) return 1;

//         // sort by col
//         if  (row1.col < row2.col) return -1;
//         if  (row1.col > row2.col) return 1;

//     });
//   }

  const buildArrayMatrix = (array) => {
    let tempArray = []
    // const arrayCopy = array
    // let foo = arrayCopy.map((el, index) => {
    //     // tempArray.push([])
    //         if (tempArray[el.row]){
    //             tempArray[el.row].splice(el.col, 0, el)
    //             return el

    //         } else {
    //             tempArray.push([el])
    //             return {...el, row: tempArray.length - 1 }
    //         }

    //     });

    const bar = tempArray.map((row, rowIndex) => {
        return {
            id: `${rowIndex}`,
            subItems: row.map((col, colIndex) => {
                return {
                    ...col, 
                    col: colIndex, 
                    row: rowIndex
                }
            })
        }
    }) 

    setDataList(bar)

    // Rebuild function
    const arr = []
    bar.map(row => {
        return row.subItems.map(col => {
            arr.push(col)
            return col
        })
    })

    // tempArray.forEach((row, i) => {
    //     tempArray.splice(i, 0, []);
    // })

    console.log('arr', arr)
    
    return tempArray
  }




  const onDragEnd = (result) => {
    // dropped outside the list
    setElemWidth(false)
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    
    if (result.type === "droppableItem") {
        const items = reorder(dataList, sourceIndex, destIndex);
        setDataList(items)
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = dataList.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);


      const sourceSubItems = itemSubItemMap[sourceParentId];

      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...dataList];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );

        newItems = newItems.map(item => {
          if (item.id == sourceParentId) {
            item.subItems = reorderedSubItems;
          }
          return item;
        });

        setDataList(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map(item => {
          if (item.id == sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id == destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });

        result.type = 'droppableItem';
        setDataList(newItems.filter(row => row.subItems.length));
      }
    }
  }


  let resultsRef = useRef();

  const addNewField = (name, type) => {
    const tempArray = dataList;
    const newTempArray = [
        ...tempArray, 
        {
            id: `${dataList.length}`, 
            subItems: [
                {
                    id: shortid.generate(), 
                    name,
                    row: dataList.length, 
                    col: 0, 
                    type, 
                }
            ] 
        }
    ]
    setDataList(newTempArray);
    
    scrollToRef();

  }


  const scrollToRef = () => {
    setTimeout(function(){ 
        resultsRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }, 100);
  } 


  
  const addNewRow = (indexToAdd) => {
    const tempArray = dataList
    tempArray.splice(indexToAdd , 0, {subItems: []})

    setDataList(
        tempArray.map((el, tempIndex) => { 
            return {...el, id: `${tempIndex}`}
        })
    );                 
  }

const [elemWidth, setElemWidth] = useState(false)
  return (
    <Box display="flex" height="100%" width="100%" style={{border: '1px solid red'}}>
        <FieldOptions
            addNewField={ addNewField }
        />
        {/* FORM DROP ZONE START */}
        <Box style={{border: '1px solid green'}} width="50%">  {/* 67% */}
            <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={(e) => setElemWidth(true)}>
                <Droppable droppableId="droppable" type="droppableItem">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            //   style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <button onClick={() => {addNewRow(0)}}>
                                Add First Row
                            </button>
                            {dataList.map((item, index) => (
                                <div   
                                    key={item.id}
                                    ref={resultsRef} 
                                >
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    
                                {(provided, snapshot) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            // {...provided.dragHandleProps}
                                        >
                                            {console.log('===', item)}
                                            {/* <span {...provided.dragHandleProps} style={{marginRight: 10}}>
                                                <FontAwesomeIcon
                                                    icon={faGripVertical}
                                                    style={{ float: "left" }}
                                                />
                                                </span> */}
                                    
                                            <ServiceCommandUnit
                                                parentDrag={{...provided.dragHandleProps}}
                                                elemWidth={elemWidth}
                                                addNewRow={() => addNewRow(index + 1)}
                                                subItems={item.subItems}
                                                type={item.id}
                                            />
                                
                                        </div>
                        
                                
                                    </div>
                                    
                                )}
                                
                                </Draggable>

                                </div>
                            ))}
                            {provided.placeholder} 
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <button
                onClick={() => {
                    // this will re clean the array row and col values
                    const arr = [];

                    dataList.map((row, rowIndex) => {
                        return row.subItems.map((col, colIndex) => {
                            arr.push({...col, col: colIndex, row: rowIndex})
                            return col
                        })
                    });
                }}
            >
                Save
            </button>
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
  );
}

export default FormBuilderView;

import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Card, CardContent, Container, Paper, TextField, FormGroup} from '@material-ui/core';



import { useDispatch } from 'react-redux';


const formElementsList = [
    {
        name: 'First Name',
        row: 0,
        col: 0,
        type: 'text',
    },
    {
        name: 'Last Name',
        row: 0,
        col: 2,
        type: 'text',
    },
    {
        name: 'Address',
        row: 0,
        col: 1,
        type: 'text',
    },
    {
        name: 'Phone',
        row: 1,
        col: 0,
        type: 'text',
    },
    {
        name: 'Email',
        row: 1,
        col: 1,
        type: 'text',
    },
    {
        name: 'Row',
        row: 2,
        col: 1,
        type: 'text',
    },
    {
        name: 'thing1',
        row: 2,
        col: 0,
        type: 'text',
    },
    {
        name: 'thing2',
        row: 3,
        col: 0,
        type: 'text',
    },
    {
        name: 'thing2.5',
        row: 3,
        col: 1,
        type: 'text',
    },

    {
        name: 'thing3',
        row: 5,
        col: 0,
        type: 'text',
    },
]



function FormBuilderView({ className, onSubmitSuccess, ...rest }) {
  const dispatch = useDispatch();

  const [formElements, setFormElements] = useState(formElementsList)
  const [ displayArr, setDisplayArr ] = useState([]);
//   const [ tempArray, setTempArray ] = useState([]);


  function getRows(){
    return formElements.map(elem => elem.row);
  }

  const getMaxRow = () => {
    return Math.max(...getRows());
  }


  const build = useCallback((arr) => {
    console.log('build')

      let tempArray = []
      const copy = arr;
      const foo = copy.map((el, index) => {
            if (tempArray[el.row]){
                console.log('if')
                tempArray[el.row].splice(el.col, 0, el)
                // console.log()
                // return {...el, col: tempArray.length - 1 }
                return el
               

            } else {
                console.log('else')
                tempArray.push([el])
                console.log('THis?', tempArray.length - 1)
                // el.row = tempArray.length - 1;
                return {...el, row: tempArray.length - 1 }
            }
      });

      
      console.log('tempArray', tempArray)
      console.log('copy', copy)
      console.log('foo', foo)
      setDisplayArr(tempArray);
    //   setFormElements(foo)

    return tempArray
  }, []);

  const build2 = useCallback(() => {
      console.log('build2')
    let tempArray = []
    const copy = formElements;
    const foo = copy.map((el, index) => {
          if (tempArray[el.row]){
              tempArray[el.row].splice(el.col, 0, el)
              // console.log()
              // return {...el, col: tempArray.length - 1 }
              return el
             

          } else {
              tempArray.push([el])
              console.log('THis?', tempArray.length - 1)
              // el.row = tempArray.length - 1;
              return {...el, row: tempArray.length - 1 }
          }
    });

    
    console.log('tempArray', tempArray)
    console.log('copy', copy)
    console.log('foo', foo)
    setFormElements(foo)

    return tempArray
}, [formElements]);

//   build()
  useEffect(() => {
    build(formElements)
  }, [formElements, build])

//   useEffect(() => {
//      build2()
//   }, [displayArr, build2]);

  console.log('===', formElements)


  



//   useEffect(() => {
//     const arr = build().filter(item => item.length )
//     console.log('ARR')
//     console.log('arr', arr)
//     const arr2 = arr.map((item, index) => {
//         return item.map(col => {
//             return {...col, row: index}
//         })
//     })
//     console.log('arr2', arr2)
//     setDisplayArr(arr2)

//   },[]);


//   useEffect(() => {
//     const arr = formElements;
//     console.log('Sorted Array', sortedFormElements)
//     const newArray = sortedFormElements.map((elem, index, arr) => {
//         if (index+1 < arr.length && elem.row <= arr[index+1].row + 1) { //ensure you're not at the end of the array before checking your condition
//         console.log(elem.row)  
//         return index;
//         } else {
//             console.log('bad one', elem.row)
//           return 99
//         }
//       });
// console.log('NEWARRAY', newArray)
//     // const index arr.find((el, i) => {
//     //     if (arr[i + 1]) {
//     //         if (el.row + 1 !== arr[i + 1] || el.row + 1 > arr[i + 1] - 1 ) {
//     //             return
//     //         }
//     //     }
//     // })

//   },[]);




 const sortedFormElements = formElements.sort(function (row1, row2){

      // sort by row
      if  (row1.row < row2.row) return -1;
      if  (row1.row > row2.row) return 1;

      // sort by col
      if  (row1.col < row2.col) return -1;
      if  (row1.col > row2.col) return 1;

  });

  
  
// DRAG FUNCTIONS
  const [currentDrag, setCurrentDrag] = useState();


  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event, elem) {
    // event.dataTransfer.setData("text", elem);
    setCurrentDrag(elem);
  }


  function dropCol(event, rowDroppedIn, colDroppedIn) {
      event.preventDefault();
      console.log('dropped')

  }
  
  function dropColLeft(event, rowDroppedIn, colDroppedIn, colIndex, currentRow) {
    console.log('colDroppedIn', colDroppedIn)
    console.log('colIndex', colIndex)
    console.log('row', currentRow)
    console.log('rrowDroppedInow', rowDroppedIn)

    event.preventDefault();
    console.log(currentDrag)

    const copyArray = formElements;

    const newDropCol = colDroppedIn < currentDrag.col || currentDrag.row !==  rowDroppedIn ? colDroppedIn + 1 : colDroppedIn
    console.log('t', newDropCol)

    const foo = copyArray.map(elem => {
       return elem.name === currentDrag.name  ? {...currentDrag, row: rowDroppedIn, col: newDropCol  } : elem
    });
    

    const bar = foo.map((elem, index) => {
        if ( elem.row === rowDroppedIn && elem.name !== currentDrag.name) {
            if (currentDrag.row === rowDroppedIn ) {
                if (elem.col <= newDropCol && elem.col > currentDrag.col){
                    console.log(1)
    
                    return { ...elem, col: elem.col - 1  }
                }  
                else if (elem.col >= newDropCol && elem.col <= currentDrag.col ){
                    console.log(2)
                    return { ...elem, col: elem.col + 1  }
                } else {
                    console.log(3)
    
                    return elem
                }
            } else {
            if (elem.col >= newDropCol) {
                console.log(4)
                    return {...elem, col: elem.col + 1}
                }
            }
        } 

        if (rowDroppedIn !== currentDrag.row &&  elem.row == currentDrag.row ){
            console.log('HERE')
            if (elem.col > currentDrag.col)
            return { ...elem, col: elem.col - 1  }
        }

       
        return elem
    })
    
    build(bar)
    ///setFormElements(bar)
    
  }


  return (
    <Box display="flex" height="100%">
        <Box height="100%" style={{width: '33%', border: '1px solid red', padding: 24}}>
            <Box style={{ border: '1px solid blue', padding: 24}}>
                <Typography>
                    Common
                </Typography>

                <Box display="flex" justifyContent="space-around">

                <Box>
                <Paper style={{width: '100%', border: '1px solid blue', backgroundColor: '#ddd', cursor: 'pointer', padding: 10}}>
                    <Typography gutterBottom>
                        First Name
                    </Typography>
                 </Paper>
                 </Box>

                 <Box>

                <Paper style={{width: '100%', border: '1px solid blue', backgroundColor: '#ddd', cursor: 'pointer', padding: 10}}>
                    <Typography gutterBottom>
                        Last Name
                    </Typography>
                 </Paper>
                 </Box>


                </Box>
            </Box>
        </Box>

{/* FORM DROP ZONE START */}
    <Box>
        {/* {
                sortedFormElements.map((el, index) => {
                    if (index <= getMaxRow()) {
                        return (
                            <div style={{ border: '1px solid red', minHeight: 10}} key={el.name}>
                                {index}
                                <div
                                    onDrop={(event) => dropColLeft(event, index, 0)}
                                    onDragOver={(event) => allowDrop(event)}
                                    style={{ display: 'inline-block', width: 10, background: 'cyan', height: 20 }}
                                >
                                    0
                                </div>
                            {sortedFormElements.map((elem) => {
                                return (
                                    <div style={{display: 'inline-block'}}>
                                    {
                                        <>
                                        {elem.row === index ?
                                        <div
                                            draggable
                                            onDragStart={(event) => drag(event, elem)}
                                            style={{display: 'inline-block', border: '2px dashed #eee', padding: 10, margin: 10}}
                                        >
                                            <input placeholder={elem.name} />
                                        </div>
                                        : null}
                                        {elem.row === index &&
                                            <div
                                                onDrop={(event) => dropColLeft(event, index, elem.col )}
                                                onDragOver={(event) => allowDrop(event)}
                                                style={{ display: 'inline-block', width: 10, background: 'cyan', height: 20 }}
                                            >
                                                {elem.col + 1}
                                            </div> }
                                        </>
                                    }
                                    </div>
                                )
                            })}
                            </div>
                        )
                        }
                    return null
                })
            } */}
<br/> <br/>
            {
                displayArr.map((row, rowIndex) => {
                    return (
                        <Box display="flex" style={{border: '1px solid red'}}>

                            {
                                row.map((el, colIndex) => {
                                    return (
                                        <div key={el.name} style={{  display: 'flex', marginTop: 10, marginBottom: 10, border: '1px solid green'}}>
                                        <div style={{ border: '1px solid blue'}}>
                                            
                                            <div 
                                                draggable
                                                onDragStart={(event) => drag(event, el)} 
                                                style={{display: 'inline-block', border: '2px dashed #eee', padding: 10}}
                                            >
                                                <input placeholder={el.name} /> 
                                            </div>

                                   
                                        </div>
                                        <div
                                            onDrop={(event) => dropColLeft(event, rowIndex, el.col )}                                                
                                            onDragOver={(event) => allowDrop(event)}
                                            style={{ display: 'inline-block', width: 10, background: 'pink', height: '100%', margin: '0 auto'}}
                                        >
                                                {el.col + 1}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Box>
                    )
                })
            }
        {/* </Box> */}


        <br/>
        <br/>
        <br/>

        {

        }
    </Box>
{/* FORM DROP ZONE END */}


    </Box>
  );
}

export default FormBuilderView;




{/* <DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="droppable" type="app">
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
    >
      {arrayMatrix.map((item, index) => {
          const rowId = uuidv4();
          return (
        <Draggable key={rowId} draggableId={rowId} index={index}>
          {(provided, snapshot) => (
            <div>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
          
              >
                {item.content} hello
                <span
                  {...provided.dragHandleProps}
                  style={{
                    display: "inline-block",
                    margin: "0 10px",
                    border: "1px solid #000"
                  }}
                >
                  Drag
                </span>
                {/* <ServiceCommandUnit type={item.id} /> */}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      )
    })}
      {provided.placeholder}
    </div>
  )}
</Droppable>
</DragDropContext> */}
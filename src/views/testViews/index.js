import React, {useEffect, useContext, useState} from 'react';



// todo move to util file and delete
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];

  let itemToAdd = payload;

  if (removedIndex !== null) {

    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {

    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

const myfields = [
  {
    id: 1,
    fields: [
      {
        label: 'First Name',
        value: 'Taylor'
      }
    ],
    half: true,
    row: 0,
    col: 0
  }, 
  {
    id: 2,
    fields: [
      {
        label: 'First Name',
        value: 'Sylvia'
      }
    ],    
    half: true,
    row: 0,
    col: 1,
  },
  {
    id: 3,
    fields: [
      {
        label: 'First Name',
        value: 'Huron'
      }
    ],    
    row: 1,
    col: 0,
    half: false,
  },
  {
    id: 4,
    fields: [
      {
        label: 'First Name',
        value: 'Barley'
      }
    ],    
    row: 2,
    col: 0,
    half: true,
  },
  {
    id: 5,
    fields: [
      {
        label: 'First Name',
        value: 'Bear'
      }
    ],    
    row: 2,
    col: 1,
    half: true,

  },
  {
    id: 6,
    fields: [
      {
        label: 'First Name',
        value: 'Gabrielle'
      }
    ],    
    row: 3,
    col: 0,
    half: false,

  },
  {
    id: 7,
    fields: [
      {
        label: 'First Name',
        value: 'Selina'
      }
    ],    
    row: 4,
    col: 0,
    half: false,
  },
];



const  TestView = React.memo((props) => {




    return ( 
      <ul
        sx={{
            display: 'flex'
        }}
      >
          {myfields.map(fieldSet => {
              return (
                <li>
                {
                fieldSet.half ? (
                    <div style={{display: 'flex'}}>
                        <div style={{flex: 1, background: 'red'}}>{fieldSet.id}</div>
                        <div style={{flex: 1}}>Drop Zone</div>
                    </div>
                ) : (
                    <div style={{flex: 1, background: 'red'}}>{fieldSet.id}</div>
                )
                }
                </li>
              )
          })}

      </ul>
   
    );
})

export default TestView;

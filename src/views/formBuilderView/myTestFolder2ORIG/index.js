import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch, connect } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction} from 'src/actions/formActions';
import { Box, Button } from '@material-ui/core';
import MyList from "./MyList";
import shortid from 'shortid';
import PanelControls from "./PanelControls";
import ActionControls from './ActionControls';



import { Container, Draggable } from "react-smooth-dnd";

import {commonFields } from 'src/utils/commonFields';

const applyDrag = (arr, dragResult) => {
  // console.log('ARR', arr)
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  // console.log('payload', payload)
  const result = [...arr];
  let itemToAdd = {...payload, id: shortid.generate(), };
  // console.log('itemToAdd', itemToAdd)
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};


const FormBuilderView = React.memo( ({formData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.forms.structuredForm)
  // const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  
  // const [ fieldList, setFieldList ] = useState(formData?.fields)
  // const [dataList, setDataList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [elemWidth, setElemWidth] = useState(false);
  const [formTitle, setFormTitle] = useState('');



    // getCardPayload(columnId, index) {
    //   return this.state.scene.children.filter(p => p.id === columnId)[0].children[
    //     index
    //   ];
    // }
  const obj = {
      type: "container",
      props: {
        orientation: "vertical"
      },
      dataList
    //   dataList:  [
    //     {id: '1', subItems: [{id: '11', name: 'name'}, {id: '12', name: 'phone'}]},
    //     {id: '2', subItems: [{id: '21', name: 'email'}, {id: '22', name: 'address'}]}
    // ]
  }


   const addNewField = (newField) => {
      const { name, type, label } = newField;
      const tempArray = dataList;
      const newTempArray = [
          ...tempArray, 
          {
              //id: `${dataList.length}`, 
              id: shortid.generate(), 
              subItems: [
                  {
                      id: shortid.generate(), 
                      name,
                      label,
                      type, 
                      row: dataList.length, 
                      col: 0, 
                  }
              ] 
          }
      ]
      dispatch(addNewFieldAction(newTempArray))
    }
  
  
    const onRowDrop = (dropResult) => {
      // console.log('in onRowDrop', dropResult)
      const scene = Object.assign({}, obj);
      // console.log('scene', scene)
      // Work shopping creating a new row if not dropped into row - make sure to reset mylist group back to col
      // if (dropResult.payload) {
      //   // scene.dataList[dropResult.addedIndex]['subItems'] = [dropResult.payload]
      //   // console.log('scene', scene)
      //   onCardDrop(dropResult.addedIndex, 1  )
        
      //   scene.dataList = applyDrag(scene.dataList, dropResult);

      // }
   
        scene.dataList = applyDrag(scene.dataList, dropResult);
        // console.log('SCENE', scene)
        dispatch(addNewFieldAction(scene.dataList))

    

    
      // this.setState({
      //   scene
      // });
    }
  
    
       const getCardPayload = (rowId, index) => {
        // console.log('ROW ---', row)
        // return row.subItems[index]
        // console.log('INDEX', index)
        const foo = obj.dataList.filter(p => p.id === rowId)[0].subItems[
          index - 1
        ];
        console.log('foo', foo)

        return obj.dataList.filter(p => p.id === rowId)[0].subItems[
          index -1
        ];
      }

    const onCardDrop = (rowId, dropResult)  => {
      // console.log('in onCardDrop', rowId)
     
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, obj);
        
        const column = scene.dataList.filter(p => p.id === rowId)[0];
        const columnIndex = scene.dataList.indexOf(column);
  
        const newColumn = Object.assign({}, column);
        // console.log('newColumn', newColumn)
        newColumn.subItems = applyDrag(newColumn.subItems, dropResult);
        scene.dataList.splice(columnIndex, 1, newColumn);
        dispatch(addNewFieldAction(scene.dataList))

        // this.setState({
        //   scene
        // });
      }
    }
  

    const [commonFieldsState, setCommonFieldsState] = useState(commonFields)

  return (
 
    <Box display="flex" height="100%" width="100%">

      {/* Panel Start */}
      <PanelControls
            addNewField={addNewField}
            fieldList={dataList}

            isEdit={isEdit}
            setIsEdit={setIsEdit}
            formTitle={formTitle}
            setFormTitle={setFormTitle}

            commonFields={commonFieldsState}

            handleOnDrop={e => {
              // console.log('DROP PANEL')
              return setCommonFieldsState( applyDrag(commonFieldsState, e) )
            } }

      />  
      {/* Panel End */}
 
        {/* FORM DROP ZONE START */}
        <Box m={2} p={2} style={{minWidth: '634px'}}>

        <ActionControls 
            formTitle={formTitle}
            dataList={obj.dataList}
        />

        <MyList
            onRowDrop={onRowDrop}
            onCardDrop={onCardDrop}
            getCardPayload={getCardPayload}
            dataList={obj.dataList.length ? obj.dataList : []}
        />

    
        </Box>
        { /* FORM DROP ZONE END */}
    </Box>
  );
});

function mapStateToProps(state) {
  const { forms } = state
  return { formData: forms.selected }
}

export default connect(mapStateToProps)(FormBuilderView)

// export default FormBuilderView;



// import React, { Component } from "react";
// import { Container, Draggable } from "react-smooth-dnd";
// // import { applyDrag, generateItems } from "./utils";

// const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
// Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
// Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

// const columnNames = ["Lorem", "Ipsum", "Consectetur", "Eiusmod"];

// const cardColors = [
//   "azure",
//   "beige",
//   "bisque",
//   "blanchedalmond",
//   "burlywood",
//   "cornsilk",
//   "gainsboro",
//   "ghostwhite",
//   "ivory",
//   "khaki"
// ];

// const applyDrag = (arr, dragResult) => {
//   const { removedIndex, addedIndex, payload } = dragResult;
//   if (removedIndex === null && addedIndex === null) return arr;

//   const result = [...arr];
//   let itemToAdd = payload;

//   if (removedIndex !== null) {
//     itemToAdd = result.splice(removedIndex, 1)[0];
//   }

//   if (addedIndex !== null) {
//     result.splice(addedIndex, 0, itemToAdd);
//   }

//   return result;
// };

// const generateItems = (count, creator) => {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     result.push(creator(i));
//   }
//   return result;
// };

// const pickColor = () => {
//   let rand = Math.floor(Math.random() * 10);
//   return cardColors[rand];
// };

// class Cards extends Component {
//   constructor() {
//     super();

//     this.onColumnDrop = this.onColumnDrop.bind(this);
//     this.onCardDrop = this.onCardDrop.bind(this);
//     this.getCardPayload = this.getCardPayload.bind(this);
//     this.state = {
//       scene: {
//         type: "container",
//         props: {
//           orientation: "horizontal"
//         },
//         children: generateItems(4, i => ({
//           id: `column${i}`,
//           type: "container",
//           name: columnNames[i],
//           props: {
//             orientation: "vertical",
//             className: "card-container"
//           },
//           children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
//             type: "draggable",
//             id: `${i}${j}`,
//             props: {
//               className: "card",
//               style: { backgroundColor: pickColor() }
//             },
//             data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
//           }))
//         }))
//       }
//     };
//   }

//   render() {
//     return (
//       <div className="card-scene">
//         <Container
//           orientation="horizontal"
//           onDrop={this.onColumnDrop}
//           dragHandleSelector=".column-drag-handle"
//           dropPlaceholder={{
//             animationDuration: 150,
//             showOnTop: true,
//             className: 'cards-drop-preview'
//           }}
//         >
//           {this.state.scene.children.map(column => {
//             return (
//               <Draggable key={column.id}>
//                 <div className={column.props.className}>
//                   <div className="card-column-header">
//                     <span className="column-drag-handle">&#x2630;</span>
//                     {column.name}
//                   </div>
//                   <Container
//                     // {...column.props}
//                     groupName="col"
//                     // onDragStart={e => console.log("drag started", e)}
//                     // onDragEnd={e => console.log("drag end", e)}
//                     onDrop={e => this.onCardDrop(column.id, e)}
//                     getChildPayload={index =>
//                       this.getCardPayload(column.id, index)
//                     }
//                     dragClass="card-ghost"
//                     dropClass="card-ghost-drop"
//                     // onDragEnter={() => {
//                     //   console.log("drag enter:", column.id);
//                     // }}
//                     // onDragLeave={() => {
//                     //   console.log("drag leave:", column.id);
//                     // }}
//                     // onDropReady={p => console.log('Drop ready: ', p)}
//                     dropPlaceholder={{                      
//                       animationDuration: 150,
//                       showOnTop: true,
//                       className: 'drop-preview' 
//                     }}
//                     dropPlaceholderAnimationDuration={200}
//                   >
//                     {column.children.map(card => {
//                       return (
//                         <Draggable key={card.id}>
//                           <div>
//                             <p>hi</p>
//                           </div>
//                         </Draggable>
//                       );
//                     })}
//                   </Container>
//                 </div>
//               </Draggable>
//             );
//           })}
//         </Container>
//       </div>
//     );
//   }

//   getCardPayload(columnId, index) {
//     console.log('index', index)
//     return this.state.scene.children.filter(p => p.id === columnId)[0].children[
//       index
//     ];
//   }

//   onColumnDrop(dropResult) {
//     const scene = Object.assign({}, this.state.scene);
//     scene.children = applyDrag(scene.children, dropResult);
//     this.setState({
//       scene
//     });
//   }

//   onCardDrop(columnId, dropResult) {
//     console.log('====dropResult', dropResult)
//     if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
//       const scene = Object.assign({}, this.state.scene);
//       const column = scene.children.filter(p => p.id === columnId)[0];
//       const columnIndex = scene.children.indexOf(column);

//       const newColumn = Object.assign({}, column);
//       newColumn.children = applyDrag(newColumn.children, dropResult);
//       scene.children.splice(columnIndex, 1, newColumn);

//       this.setState({
//         scene
//       });
//     }
//   }
// }

// export default Cards;
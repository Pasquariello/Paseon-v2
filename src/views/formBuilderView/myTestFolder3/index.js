import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch, connect } from 'react-redux';
import {getSingleForm, createForm, deleteForm, addNewFieldAction} from 'src/actions/formActions';
import { Box, Button } from '@material-ui/core';
import MyList from "./MyList";
import shortid from 'shortid';
import PanelControls from "./PanelControls";
import ActionControls from './ActionControls';



// import { ReactSortable } from "react-sortablejs";

// import {commonFields } from 'src/utils/commonFields';

// const applyDrag = (arr, dragResult) => {
//   // console.log('ARR', arr)
//   // const { removedIndex, addedIndex, payload } = dragResult;
//   // if (removedIndex === null && addedIndex === null) return arr;
//   // console.log('payload', payload)
//   const result = [...arr];
//   console.log('result1', result)

//   let itemToAdd = {...dragResult, id: shortid.generate(), };
//   // console.log('itemToAdd', itemToAdd)
//   // if (removedIndex !== null) {
//     // itemToAdd = result.splice(0, 1)[0];
//   // }
//   console.log('itemToAdd', itemToAdd)
//   // if (addedIndex !== null) {
//     result.splice(0, 0, itemToAdd);
//   // }
//   console.log('result', result)

//   return result;
// };

// const generateItems = (count, creator) => {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     result.push(creator(i));
//   }
//   return result;
// };


// const FormBuilderView = React.memo( ({formData }) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const dataList = useSelector(state => state.forms.structuredForm)
//   // const formElementsList = useSelector(state => state.forms.selected ? state.forms.selected.fields : [] )
  
//   // const [ fieldList, setFieldList ] = useState(formData?.fields)
//   // const [dataList, setDataList] = useState([]);
//   const [isEdit, setIsEdit] = useState(null);
//   const [elemWidth, setElemWidth] = useState(false);
//   const [formTitle, setFormTitle] = useState('');



//     // getCardPayload(columnId, index) {
//     //   return this.state.scene.children.filter(p => p.id === columnId)[0].children[
//     //     index
//     //   ];
//     // }
//   const obj = {
//       type: "container",
//       props: {
//         orientation: "vertical"
//       },
//       dataList
//     //   dataList:  [
//     //     {id: '1', subItems: [{id: '11', name: 'name'}, {id: '12', name: 'phone'}]},
//     //     {id: '2', subItems: [{id: '21', name: 'email'}, {id: '22', name: 'address'}]}
//     // ]
//   }


//    const addNewField = (newField) => {
//       const { name, type, label } = newField;
//       const tempArray = dataList;
//       const newTempArray = [
//           ...tempArray, 
//           {
//               //id: `${dataList.length}`, 
//               id: shortid.generate(), 
//               subItems: [
//                   {
//                       id: shortid.generate(), 
//                       name,
//                       label,
//                       type, 
//                       row: dataList.length, 
//                       col: 0, 
//                   }
//               ] 
//           }
//       ]
//       dispatch(addNewFieldAction(newTempArray))
//     }
  
  

//     const [commonFieldsState, setCommonFieldsState] = useState(commonFields)

//   return (
 
//     <Box display="flex" height="100%" width="100%">

//       {/* Panel Start */}
//       <PanelControls
//             addNewField={addNewField}
//             fieldList={dataList}

//             isEdit={isEdit}
//             setIsEdit={setIsEdit}
//             formTitle={formTitle}
//             setFormTitle={setFormTitle}

//             commonFields={commonFieldsState}

//             handleOnDrop={e => {
//               // console.log('DROP PANEL')
//               return setCommonFieldsState( applyDrag(commonFieldsState, e) )
//             } }

//             drag={drag}

//       />  
//       {/* Panel End */}
 
//         {/* FORM DROP ZONE START */}
//         <Box m={2} p={2} style={{minWidth: 600}} width="50%">

//         <ActionControls 
//             formTitle={formTitle}
//             dataList={obj.dataList}
//         />

//         <MyList
//             onRowDrop={onRowDrop}
//             onCardDrop={onCardDrop}
//             getCardPayload={getCardPayload}
//             dataList={obj.dataList.length ? obj.dataList : []}

//             drop={drop}
//         />

    
//         </Box>
//         { /* FORM DROP ZONE END */}
//     </Box>
//   );
// });

// function mapStateToProps(state) {
//   const { forms } = state
//   return { formData: forms.selected }
// }

// export default connect(mapStateToProps)(FormBuilderView);

// import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import styled from "styled-components";
import { common } from '@material-ui/core/colors';
import { commonFields } from 'src/utils/commonFields';
// import "./styles.css";

const StyledBlockWrapper = styled.div`
  /* display: flex;
  width: 100%; */
  position: relative;
  background: white;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid pink;
  border-radius: 4px;
  cursor: move;
  &:hover {
    //background: #eeeeee;
  }
`;

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared"
};

const sortableCloneOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "pull",
  name: 'shared'
};

const FormBuilderView = () => {
  const [blocks, setBlocks] = useState([
    {
      id: 1,
      content: "item 1",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 2,
          content: "item 2",
          width: 3,
          type: "text",
          parent_id: 1
        },
        {
          id: 3,
          content: "item 3",
          width: 3,
          type: "text",
          parent_id: 1
        }
      ]
    },
    {
      id: 4,
      content: "item 2",
      parent_id: null,
      type: "container",
      children: [
        
        {
          id: 6,
          content: "item 6",
          width: 2,
          type: "text",
          parent_id: 2
        },
        {
          id: 7,
          content: "item 7",
          width: 2,
          type: "text",
          parent_id: 2
        }
      ]
    }
  ]);

  return (
    <Box display="flex" height="100%" width="100%">

    <Box m={2} p={2} width="25%"> 
    Common Fields


    </Box>
   
      <Box m={2} p={2} style={{minWidth: 600}} width="75%"> 

        <ReactSortable list={blocks} setList={setBlocks} {...sortableOptions}>
          {blocks.map((block, blockIndex) => {
            return (
              <BlockWrapper
                key={block.id}
                block={block}
                blockIndex={[blockIndex]}
                setBlocks={setBlocks}
              />
            )
          })}
        </ReactSortable>
      </Box>
    </Box>
  );
}
function Container({ block, blockIndex, setBlocks }) {
  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          console.log('setList')
          setBlocks((sourceList) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]["children"],
              tempList
            );
            // console.log(lastIndex);
            lastArr[lastIndex]["children"] = currentList;
            return tempList;
          });
        }}
        style={{display: 'flex'}}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock, index) => {
            return (
              <BlockWrapper
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </>
  );
}
function BlockWrapper({ block, blockIndex, setBlocks }) {
  // console.log(block);
  if (!block) return null;
  if (block.type === "container") {
    return (
      <StyledBlockWrapper className="block">
        container: {block.content}      
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </StyledBlockWrapper>
    );
  } else {
    return (
      <StyledBlockWrapper className="block" style={{width: '100%', margin: 10}}>
        text: {block.content}
      </StyledBlockWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { forms } = state
  return { formData: forms.selected }
}

export default connect(mapStateToProps)(FormBuilderView);

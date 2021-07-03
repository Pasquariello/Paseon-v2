import React from 'react';
import Row from "./Row";
import './form.css'

import { useDispatch } from 'react-redux';
import {addNewFieldAction} from 'src/actions/formActions';

import { Container } from "react-smooth-dnd";

const  MyList =  React.memo((props) => {
    const dispatch = useDispatch()
    const {
        dataList, 
        currentIsDragging,

        onRowDrop,
        onCardDrop,
        getCardPayload
    } = props;

  

    return (  
        
        <div className="card-scene" style={{width: `100%`}}>
        <Container
          orientation="vertical"
          onDrop={onRowDrop}
          getChildPayload={index => {
              return dataList[index]
          }}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
       
          style={{border: '1px dashed', height: '100%'}}
        >
          {/* {this.state.scene.children.map(column => { */}
            {dataList.map((row, rowIndex) => {
                return (
                    
                    <Row  
                        rowIndex={rowIndex}
                        key={row.id}
                        rowId={row.id}
                        onCardDrop={onCardDrop}

                    />
                    
            );
          })}
        </Container>
      </div>
    );
})

export default MyList;

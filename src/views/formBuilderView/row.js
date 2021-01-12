import React, { Component } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Column from "./column";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 520px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TeamMemberList = styled.div`
  padding: 8px;
  border: 1px solid red;
  flex-grow: 1;
  min-height: 100px;
  display: flex;
`;

export default class Pod extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { handleFocus, handleFocusOut } = this.props;
    return (
      <Draggable draggableId={this.props.pod.id} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{this.props.pod.title}</Title>
            <Droppable droppableId={this.props.pod.id} type="teamMember" direction="horizontal">
              {(provided, snapshot) => (
                <TeamMemberList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.teamMembers.map((teamMember, index) => (
                    <Column
                      key={teamMember.id}
                      teamMember={teamMember}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </TeamMemberList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

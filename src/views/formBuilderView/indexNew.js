import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";

import data from "./data";
import Row from "./row";

const Container = styled.div`
//   display: flex;
`;

export default class Pods extends React.Component {
  constructor() {
    super();
    this.state = data;
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "pod") {
      const newPodOrder = Array.from(this.state.podOrder);
      newPodOrder.splice(source.index, 1);
      newPodOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        podOrder: newPodOrder
      };
      this.setState(newState);
      return;
    }

    const start = this.state.pods[source.droppableId];
    const finish = this.state.pods[destination.droppableId];

    if (start === finish) {
      const newTeamMemberIds = Array.from(start.teamMemberIds);
      newTeamMemberIds.splice(source.index, 1);
      newTeamMemberIds.splice(destination.index, 0, draggableId);

      const updatedPod = {
        ...start,
        teamMemberIds: newTeamMemberIds
      };

      const newState = {
        ...this.state,
        pods: {
          ...this.state.pods,
          [updatedPod.id]: updatedPod
        }
      };
      this.setState(newState);
      return;
    }

    // moving from one pod to another
    const startTeamMemberIds = Array.from(start.teamMemberIds);
    startTeamMemberIds.splice(source.index, 1);
    const newStart = {
      ...start,
      teamMemberIds: startTeamMemberIds
    };

    const finishTeamMemberIds = Array.from(finish.teamMemberIds);
    finishTeamMemberIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      teamMemberIds: finishTeamMemberIds
    };

    const newState = {
      ...this.state,
      pods: {
        ...this.state.pods,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  showState = () => {
    console.log(this.state);
  };

  addPod = () => {
    const pods = { ...this.state.pods };

    const arr = [];
    Object.keys(pods).map(p => {
      arr.push(+p.replace("pod-", ""));
    });

    let arrNum = [];
    arrNum = arr.map(function(val) {
      return ++val;
    });

    const newPodId = arrNum[arrNum.length - 1];

    let p = "pod-";
    let key = newPodId;
    const newPodKey = p.concat(key);

    let obj = {};
    obj[newPodKey] = { id: newPodKey, title: "New Pod", teamMemberIds: [] };

    const currentPods = { ...pods };
    const newPodObj = Object.assign(currentPods, obj);

    const newState = {
      ...this.state,
      pods: newPodObj,
      podOrder: [...this.state.podOrder, newPodKey]
    };
    this.setState(newState);
  };

  renderRows() {
    let finalArr = [],
      columns = [];
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <Droppable droppableId="allPods" 
        // direction="horizontal" 
        type="pod">
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.podOrder.map((podId, index) => {
                const pod = this.state.pods[podId];
                const teamMembers = pod.teamMemberIds.map(
                  teamMemberId => this.state.teamMembers[teamMemberId]
                );

                columns.push(
                  <Row
                    key={pod.id}
                    pod={pod}
                    teamMembers={teamMembers}
                    index={index}
                    handleFocus={this._handleFocus}
                    handleFocusOut={this._handleFocusOut}
                  />
                );

                if ((index + 1) % 5 === 0) {
                  finalArr.push(<div className="row mt-4" />);
                }
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  render() {
    const { podOrder } = this.state;
    let content = [];
    console.log(podOrder.length);
    return (
        <div className="podGrid">
          <DragDropContext
            onDragEnd={this.onDragEnd}
            onDragStart={this.onDragStart}
          >
            <Droppable droppableId="allPods" 
            // direction="horizontal" 
            type="pod">
              {provided => (
                <Container {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.podOrder.map((podId, index) => {
                    const pod = this.state.pods[podId];
                    const teamMembers = pod.teamMemberIds.map(
                      teamMemberId => this.state.teamMembers[teamMemberId]
                    );

                    return (
                      <Row
                        key={pod.id}
                        pod={pod}
                        teamMembers={teamMembers}
                        index={index}
                        handleFocus={this._handleFocus}
                        handleFocusOut={this._handleFocusOut}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          </DragDropContext>
        </div>
    );
  }
}

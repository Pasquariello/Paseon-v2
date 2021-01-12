import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card, Grid, Icon } from "semantic-ui-react";

const Container = styled.div`
  border: 1px solid lightgrey;
//   width: 100;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  height: 60px;
`;

export default class Column extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.teamMember.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Grid className="teamMemberGrid">
              <Grid.Row columns={3}>
                <Grid.Column>
                  <b>{this.props.teamMember.content}</b>
                </Grid.Column>
                <Grid.Column>{this.props.teamMember.shift}</Grid.Column>
                <Grid.Column>
                  <Icon name="info" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
      </Draggable>
    );
  }
}

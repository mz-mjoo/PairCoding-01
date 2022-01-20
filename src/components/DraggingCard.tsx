import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggingDardProps {
  todoId: number;
  index: number;
  text: string;
}

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background: ${({ isDragging }) => (isDragging ? "gray" : "#fff")};
  margin: 5px 0;
`;

const DraggingCard: FC<IDraggingDardProps> = ({ todoId, index, text }) => {
  return (
    <Draggable draggableId={String(todoId)} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggingCard);

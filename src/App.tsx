import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    console.log(
      "source ===>",
      source,
      "destination ===>",
      destination,
      "draggableId ===>",
      draggableId
    );

    if (!destination) return;

    // draggableId 드래깅 한 value 값이 나옴

    if (source.droppableId === destination.droppableId) {
      setToDos((allBoards) => {
        const copyBoards = [...allBoards[source.droppableId]];
        const taskObj = copyBoards[source.index];

        // to do 제거
        copyBoards.splice(source.index, 1);

        // to do 추가
        copyBoards.splice(destination.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: copyBoards,
        };
      });
    }

    if (source.droppableId !== destination.droppableId) {
      setToDos((allBoards) => {
        console.log(allBoards);
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const targetBoardCopy = [...allBoards[destination.droppableId]];
        const taskBoard = sourceBoardCopy[source.index];

        // 기존 소스 제거
        sourceBoardCopy.splice(source.index, 1);

        // 옮기려는 위치에 추가
        targetBoardCopy.splice(destination.index, 0, taskBoard);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: targetBoardCopy,
        };
      });
    }
  };
  const [toDos, setToDos] = useRecoilState(toDoState);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board
              key={boardId}
              boardId={boardId}
              toDos={toDos[boardId]}
            ></Board>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

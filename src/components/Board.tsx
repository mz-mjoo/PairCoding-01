import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggingCard from "./DraggingCard";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IFormProps {
  todo: string;
}

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
`;

const Area = styled.div`
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  input {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 90%;
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
`;

interface IBoardProps {
  boardId: string;
  toDos: ITodo[];
}

const Board: FC<IBoardProps> = ({ boardId, toDos }) => {
  const { handleSubmit, register, setValue } = useForm<IFormProps>({});
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({ todo }: IFormProps) => {
    console.log("todo", todo);

    setToDos((allBoards) => {
      console.log("allBoards", allBoards);

      const newTodo = {
        text: todo,
        id: Date.now(),
      };

      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo],
      };
    });
    setValue("todo", "");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Title>{boardId}</Title>
        <Input
          type="text"
          placeholder={"To Do List를 입력해주세요 "}
          {...register("todo", { required: true })}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area {...provided.droppableProps} ref={provided.innerRef}>
            {toDos.map((todo, idx) => (
              <DraggingCard
                key={todo.id}
                todoId={todo.id}
                index={idx}
                text={todo.text}
              />
            ))}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;

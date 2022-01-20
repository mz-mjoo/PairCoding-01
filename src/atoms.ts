import { atom } from "recoil";

export interface ITodo {
  text: string;
  id: number;
}

interface ITodoStateProps {
  [key: string]: ITodo[];
}

// atom<ITodo['text']> => text 값만 불러와서 쓰는 방식

export const toDoState = atom<ITodoStateProps>({
  key: "toDo",
  default: {
    todo: [],
    doing: [],
    done: [],
  },
});

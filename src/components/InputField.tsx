import React, { useState } from "react";
import { Todo } from "./Todo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  showTodoList: boolean;
}

const InputField: React.FC<Props> = ({
  todos,
  setTodos,
  showTodoList,
}: Props) => {
  const [currentInput, setCurrentInput] = useState<string>("");

  const handleChange = (value: string) => {
    setCurrentInput(value);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let value: string = event.currentTarget.value;
      setTodos([...todos, { id: Date.now(), todo: value, isDone: false }]);
      setCurrentInput("");
      event.currentTarget.value = "";
    }
  };

  return (
    <div className={`inputfield-container${showTodoList ? " show" : ""}`}>
      <form action="#">
        <input
          type="text"
          placeholder="What needs to be done?"
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => keyDownHandler(e)}
        />
      </form>
    </div>
  );
};

export default InputField;

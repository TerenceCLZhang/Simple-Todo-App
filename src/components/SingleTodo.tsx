import React, { useState } from "react";
import { Todo } from "./Todo";
import { GiCancel } from "react-icons/gi";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);

  const todoStyle: React.CSSProperties = todo.isDone
    ? { textDecoration: "line-through" }
    : {};

  const handleDone = () => {
    const updatedTodos: Todo[] = todos.map((item) => {
      if (item === todo) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = () => {
    const updatedTodos: Todo[] = todos.filter((item) => item !== todo);
    setTodos(updatedTodos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodo(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      todo.todo = editedTodo;
    }
  };

  return (
    <div
      className="single-todo"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <form action="#">
        <div>
          <input type="checkbox" checked={todo.isDone} onChange={handleDone} />
          {isEditing ? (
            <input
              type="text"
              value={editedTodo}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
          ) : (
            <span id="todo" style={todoStyle} onDoubleClick={handleDoubleClick}>
              {todo.todo}
            </span>
          )}
        </div>

        {isHovered && (
          <span onClick={handleDelete}>
            <GiCancel />
          </span>
        )}
      </form>
    </div>
  );
};

export default SingleTodo;

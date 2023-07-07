import React, { useEffect, useMemo, useState } from "react";
import { Todo } from "./Todo";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  showTodoList: boolean;
}

enum ShowType {
  All,
  Active,
  Complete,
}

const ItemsList: React.FC<Props> = ({
  todos,
  setTodos,
  showTodoList,
}: Props) => {
  const [showType, setShowType] = useState<ShowType>(ShowType.All);
  const [numberOfTodos, setNumberOfTodos] = useState<number>(0);
  const [itemSpelling, setItemSpelling] = useState<string>("items");

  useEffect(() => {
    const activeTodos = todos.filter((todo) => !todo.isDone);
    setNumberOfTodos(activeTodos.length);
    setItemSpelling(activeTodos.length === 1 ? "item" : "items");
  }, [todos]);

  const filteredTodos: Todo[] = useMemo(() => {
    if (showType === ShowType.Active) {
      return todos.filter((todo) => !todo.isDone);
    } else if (showType === ShowType.Complete) {
      return todos.filter((todo) => todo.isDone);
    }
    return todos;
  }, [todos, showType]);

  const handleFilterAll = () => {
    setShowType(ShowType.All);
  };

  const handleFilterActive = () => {
    setShowType(ShowType.Active);
  };

  const handleFilterCompleted = () => {
    setShowType(ShowType.Complete);
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const hasCompletedItems: boolean = todos.some((todo) => todo.isDone);

  return (
    <div>
      <div className={`todos-container${showTodoList ? " show" : ""}`}>
        {filteredTodos.map((todo: Todo) => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      {showTodoList && (
        <div className="todo-settings-container">
          <div>
            <p>
              {numberOfTodos} {itemSpelling} left
            </p>
          </div>
          <div className="display-button-group">
            <button
              className={showType === ShowType.All ? "active" : ""}
              onClick={handleFilterAll}
            >
              All
            </button>
            <button
              className={showType === ShowType.Active ? "active" : ""}
              onClick={handleFilterActive}
            >
              Active
            </button>
            <button
              className={showType === ShowType.Complete ? "active" : ""}
              onClick={handleFilterCompleted}
            >
              Completed
            </button>
          </div>
          {hasCompletedItems && (
            <div className="clear-button">
              <button onClick={handleClearCompleted}>Clear Completed</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemsList;

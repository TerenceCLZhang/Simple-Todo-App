import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import ItemsList from "./components/ItemsList";
import { Todo } from "./components/Todo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showTodoList, setShowTodoList] = useState<boolean>(false);

  useEffect(() => {
    setShowTodoList(todos.length > 0);
  }, [todos]);

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="todo-container">
        <InputField
          todos={todos}
          setTodos={setTodos}
          showTodoList={showTodoList}
        />
        <ItemsList
          todos={todos}
          setTodos={setTodos}
          showTodoList={showTodoList}
        />
      </div>
    </div>
  );
};

export default App;

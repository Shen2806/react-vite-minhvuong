import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData.jsx";
import TodoNew from "./components/todo/TodoNew.jsx";

import reactLogo from "./assets/react.svg";

const App = () => {

  return (
    <div className="todo-container">
      <div className="todo-title">
        <h1> Todo List</h1>
      </div>
      <TodoNew />
      <TodoData />
      <div className="todo-image">
        <img src={reactLogo} className="logo"/>
      </div>
    </div>
  )
}

export default App

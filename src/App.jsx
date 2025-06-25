import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData.jsx";
import TodoNew from "./components/todo/TodoNew.jsx";

import reactLogo from "./assets/react.svg";

const App = () => {
  const hoidanit = 'Minhvuong';
  const age =25;
  const country = 'Vietnam';
  const data = {
    name: hoidanit,
    age: age,
    country: country,
  };
  return (
    <div className="todo-container">
      <div className="todo-title">
        <h1> Todo List</h1>
      </div>
      <TodoNew />
      <TodoData 
        name={hoidanit}
        data={data}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo"/>
      </div>
    </div>
  )
}

export default App

import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData.jsx";
import TodoNew from "./components/todo/TodoNew.jsx";

import reactLogo from "./assets/react.svg";

const App = () => {
  const hoidanit = 'Minhvuong';
  const age =25;
  
  const data = {
    country : 'Vietnam',
    address : 'Hanoi',
  };
  const addNewTodo = (name) =>{
    alert(`Call me ${name}`);
  }
  addNewTodo();
  return (
    <div className="todo-container">
      <div className="todo-title">
        <h1> Todo List</h1>
      </div>
      <TodoNew
      addNewTodo={addNewTodo} />
      <TodoData 
        name={hoidanit}
        age = {age}
        data={data}
        
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo"/>
      </div>
    </div>
  )
}

export default App

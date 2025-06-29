import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData.jsx";
import TodoNew from "./components/todo/TodoNew.jsx";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

const App = () => {

  const [todoList, setTodoList] = useState([
    {
      id: 1, name: 'Learn ReactJS'
    },
    {
      id: 2, name: 'Learn NodeJS'
    },
    
  ]);

  const hoidanit = 'Minhvuong';
  const age =25;
  
  const data = {
    country : 'Vietnam',
    address : 'Hanoi',
  };
  const addNewTodo = (name) =>{
    // alert(`Call me ${name}`);
    const newTodo = {
      id: randomIntfromInterval(3, 1000), // Random ID from 3 to 1000
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }
  const randomIntfromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // addNewTodo();
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
        todoList={todoList}
        
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo"/>
      </div>
    </div>
  )
}

export default App

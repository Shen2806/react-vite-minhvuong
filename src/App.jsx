import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData.jsx";
import TodoNew from "./components/todo/TodoNew.jsx";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import { Outlet } from "react-router-dom";
const App = () => {

  const [todoList, setTodoList] = useState([

    
  ]);

  const addNewTodo = (name) =>{
    // alert(`Call me ${name}`);
    const newTodo = {
      id: randomInformInterval(3, 1000), // Random ID from 3 to 1000
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }
  const randomInformInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const deleteTodo = (id) =>{
    const newTodo = todoList.filter((item) => item.id !== id);
    setTodoList(newTodo);
  }
  // addNewTodo();
  return (
    <>
      <Header />
      <div className="todo-container">
      <div className="todo-title">
        <h1> Todo List</h1>
      </div>
      <TodoNew
      addNewTodo={addNewTodo} />
      { todoList.length > 0 ?
        <TodoData 
          todoList={todoList}
          deleteTodo={deleteTodo}
        />
      :
         <div className="todo-image">
            <img src={reactLogo} className="logo"/>
         </div>
      }
     </div>
     <Outlet />
      <Footer />
    </>
    
  )
}

export default App

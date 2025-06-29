import "./todo.css";
import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import { useState } from "react";
import reactLogo from "../../assets/react.svg";


const TodoApp = () => {
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
    return(
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
    )
  
  }

export default TodoApp;
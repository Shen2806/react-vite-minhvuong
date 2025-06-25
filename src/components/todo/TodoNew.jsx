import { useState } from 'react';
const TodoNew = (props) =>{
  const { addNewTodo } = props;
  const [valueInput, setValueInput] = useState("minhvuong");
  // addNewTodo("minhvuong");
  const handleClick = () => {
    alert("Click me !")
  }
  const handleOnChange = (name) => {
    console.log("Change input value", name);
    setValueInput(name);
  }
    return (
        <div className="todo-new">
        <input type="text" placeholder="Add a new task..." 
        onChange={(event) => handleOnChange(event.target.value)}/>
        <button 
          style={{cursor: "pointer"}}
          onClick={handleClick}
        >Add</button>
        <div>
          My text input is = {valueInput}
        </div>
      </div>
    )
}

export default TodoNew;
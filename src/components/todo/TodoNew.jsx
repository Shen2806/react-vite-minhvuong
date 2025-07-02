import { useState } from 'react';
const TodoNew = (props) =>{
  const { addNewTodo } = props;
  const [valueInput, setValueInput] = useState("");
  // addNewTodo("minhvuong");
  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput(""); // Reset input value after adding
  }
  const handleOnChange = (name) => {
    setValueInput(name);
  }
    return (
        <div className="todo-new">
        <input type="text" placeholder="Add a new task..." 
        onChange={(event) => handleOnChange(event.target.value)}
        value={valueInput}
        />
        
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
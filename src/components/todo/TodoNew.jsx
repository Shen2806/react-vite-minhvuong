
const TodoNew = (props) =>{
  const { addNewTodo } = props;
  // addNewTodo("minhvuong");
  const handleClick = () => {
    alert("Click me !")
  }
  const handleOnChange = (name) => {
    console.log("Change input value", name);
  }
    return (
        <div className="todo-new">
        <input type="text" placeholder="Add a new task..." 
        onChange={(event) => handleOnChange(event.target.value)}/>
        <button 
          style={{cursor: "pointer"}}
          onClick={handleClick}
        >Add</button>
      </div>
    )
}

export default TodoNew;
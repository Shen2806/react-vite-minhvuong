
const TodoNew = (props) =>{
  const { addNewTodo } = props;
  addNewTodo("minhvuong");
    return (
        <div className="todo-new">
        <input type="text" placeholder="Add a new task..." />
        <button>Add</button>
      </div>
    )
}

export default TodoNew;
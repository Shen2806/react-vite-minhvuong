
const TodoData = (props) => {
    console.log("Check props", props);
    return (
    <div className="todo-data">
        <div> Name: {props.name}</div>
        <div> Learning React</div>
        <div> Watching Youtube</div>
        <div>
            {JSON.stringify(props.todoList)}
        </div>
    </div>
    )
}

export default TodoData;
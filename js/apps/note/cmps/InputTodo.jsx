export function InputTodo({ todo, idx, handleChangeTodo, onDeleteTodo }) {

    return (
        <React.Fragment>
            <div>
                <input className="todo-input" value={todo.txt} type="text" name={idx} placeholder="New todo"
                    onChange={(e) => handleChangeTodo(e)} />
                <button onClick={(ev) => onDeleteTodo(ev, idx)}>X</button>
            </div>
        </React.Fragment >
    )
}
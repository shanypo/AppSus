
import { Todo } from './Todo.jsx'

export function NoteTodo({ note }) {

    return (
        <div>
            {
                note.info.todos.map((todo, idx) => {
                    <Todo key={idx} todo={todo} />
                }
                )
            }
        </div>
        // <div className="note" >
        //     <h3>{note.info.label}</h3>
        // </div >
    )
}

import { Todo } from './Todo.jsx'

export function NoteTodo({ note }) {
    return (
        <div className="note">
            {
                note.info.todos.map((todo, idx) =>
                    <Todo key={idx} todo={todo} note={note} idx={idx} />
                )

            }
        </div>
    )
}
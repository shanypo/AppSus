
import { Todo } from '../../Todo.jsx'

export function NoteTodo({ note, onDeleteNote }) {
    return (
        <div className="note">
            <h2>{note.info.title}</h2>
            <ul>
                {
                    note.info.todos.map((todo, idx) =>
                        <Todo key={idx} todo={todo} note={note} idx={idx} />
                    )

                }
            </ul>
            <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
        </div>
    )
}
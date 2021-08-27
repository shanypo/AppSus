const { Link } = ReactRouterDOM
import { Todo } from '../../Todo.jsx'

export function NoteTodo({ note, onDeleteNote, onPinNote }) {
    const classNote = `note ${note.style.backgroundColor}`
    return (
        <div className={classNote}>
            <h2>{note.info.title}</h2>
            <ul>
                {
                    note.info.todos.map((todo, idx) =>
                        <Todo key={`${note.id}-${idx}`} todo={todo} note={note} idx={idx} />
                    )

                }
            </ul>
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
                <button onClick={(e) => onPinNote(e, note.id)}>Pin</button>
            </div>
        </div>
    )
}
const { Link } = ReactRouterDOM
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
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
            </div>
        </div>
    )
}
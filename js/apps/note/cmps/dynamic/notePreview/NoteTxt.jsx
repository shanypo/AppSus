const { Link } = ReactRouterDOM
export function NoteTxt({ note, onDeleteNote, onPinNote }) {
    const classNote = `note ${note.style.backgroundColor}`
    return (
        <div className={classNote} >
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
                <button onClick={(e) => onPinNote(e, note.id)}>Pin</button>
            </div>
        </div>
    )
}


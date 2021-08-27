const { Link } = ReactRouterDOM
export function NoteVideo({ note, onDeleteNote, onPinNote }) {
    const classNote = `note ${note.style.backgroundColor}`
    return (
        <div className={classNote} >
            <h3>{note.info.title}</h3>
            <iframe src={note.info.url}>
            </iframe>
            <p>{note.info.txt}</p>
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
                <button onClick={(e) => onPinNote(e, note.id)}>Pin</button>
            </div>
        </div>
    )
}
const { Link } = ReactRouterDOM
export function NoteVideo({ note, onDeleteNote }) {
    return (
        <div className="note" >
            <h3>{note.info.title}</h3>
            <iframe src={note.info.url}>
            </iframe>
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
            </div>
        </div>
    )
}
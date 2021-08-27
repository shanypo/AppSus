const { Link } = ReactRouterDOM
export function NoteTxt({ note, onDeleteNote }) {
    return (
        <div className="note" >
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
            </div>
        </div>
    )
}


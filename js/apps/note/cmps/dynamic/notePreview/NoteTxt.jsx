const { Link } = ReactRouterDOM
export function NoteTxt({ note, onDeleteNote }) {
    return (
        <div className="note" >
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
        </div>
    )
}


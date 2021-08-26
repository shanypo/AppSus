export function NoteImg({ note, onDeleteNote }) {
    return (
        <div className="note" >
            <h3>{note.info.title}</h3>
            <img src={note.info.url} />
            <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
        </div>
    )
}
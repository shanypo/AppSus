export function NoteVideo({ note, onDeleteNote }) {
    return (
        <div className="note" >
            <h3>{note.info.title}</h3>
            <iframe src={note.info.url}>
            </iframe>
            <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
        </div>
    )
}
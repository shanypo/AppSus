export function NoteTxt({ note, onDeleteNote }) {
    console.log('onDeleteNote', onDeleteNote);
    return (
        <div className="note" >
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
            <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
        </div>
    )
}


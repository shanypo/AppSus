const { Link } = ReactRouterDOM
export function NoteVideo({ note, onDeleteNote, onPinNote, onChangeColor }) {
    const classNote = `note ${note.style.backgroundColor}`
    return (
        <div className={classNote} >
            <h3>{note.info.title}</h3>
            <iframe src={note.info.url}>
            </iframe>
            <p>{note.info.txt}</p>
            <div className="note-buttoms">
                <div className="edit-buttoms">
                    <Link to={`/keep/edit/${note.id}`}><img src="././././img/icons/edit.png" /></Link>
                    <button onClick={(e) => onDeleteNote(e, note.id)}><img src="././././img/icons/trash.png" /></button>
                    <button onClick={(e) => onPinNote(e, note.id)}><img src="././././img/icons/pin.png" /></button>
                </div>
                <div className="colors">
                    <div className="white" onClick={(e) => onChangeColor(e, note.id, 'white')}></div>
                    <div className="red" onClick={(e) => onChangeColor(e, note.id, 'red')}></div>
                    <div className="orange" onClick={(e) => onChangeColor(e, note.id, 'orange')}></div>
                    <div className="yellow" onClick={(e) => onChangeColor(e, note.id, 'yellow')}></div>
                    <div className="green" onClick={(e) => onChangeColor(e, note.id, 'green')}></div>
                    <div className="blue" onClick={(e) => onChangeColor(e, note.id, 'blue')}></div>
                    <div className="purple" onClick={(e) => onChangeColor(e, note.id, 'purple')}></div>
                    <div className="pink" onClick={(e) => onChangeColor(e, note.id, 'pink')}></div>
                </div>
            </div>
        </div>
    )
}
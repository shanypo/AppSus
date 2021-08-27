const { Link } = ReactRouterDOM
export function NoteImg({ note, onDeleteNote, onChangeColor }) {
    const classNote = `note ${note.style.backgroundColor}`
    return (
        <div className={classNote} >
            <h3>{note.info.title}</h3>
            <img src={note.info.url} />
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
                <div className="Colors">
                    <div onClick={(e) => onChangeColor(e, note.id, 'white')}>white</div>
                    <div onClick={(e) => onChangeColor(e, note.id, 'red')}>red</div>
                    <div onClick={(e) => onChangeColor(e, note.id, 'orange')}>yellow</div>
                    <div onClick={(e) => onChangeColor(e, note.id, 'yellow')}>blue</div>
                    <div onClick={(e) => onChangeColor(e, note.id, 'green')}>blue</div>
                    <div onClick={(e) => onChangeColor(e, note.id, 'blue')}>blue</div>
                    <div onClick={(e) => onChangeColor(e, note.id, 'purple')}>blue</div>
                    <div onClick={(e) => onChangeColor(e, note.id, 'pink')}>blue</div>
                </div>
            </div>
        </div>
    )
}
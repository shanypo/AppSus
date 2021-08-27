const { Link } = ReactRouterDOM
export function NoteImg({ note, onDeleteNote, onChangeColor, onPinNote }) {

    const classNote = `note ${note.style.backgroundColor}`
    return (
        <div className={classNote} >
            <h3>{note.info.title}</h3>
            <img src={note.info.url} />
            <p>{note.info.txt}</p>
            <div className="note-buttoms">
                <Link to={`/keep/edit/${note.id}`}><button>Edit</button></Link>
                <button onClick={(e) => onDeleteNote(e, note.id)}>Delete Note</button>
                <button onClick={(e) => onPinNote(e, note.id)}>Pin</button>
                <div className="Colors">
                    <div className="white" onClick={(e) => onChangeColor(e, note.id, 'white')}>white</div>
                    <div className="red" onClick={(e) => onChangeColor(e, note.id, 'red')}>red</div>
                    <div className="orange" onClick={(e) => onChangeColor(e, note.id, 'orange')}>yellow</div>
                    <div className="yellow" onClick={(e) => onChangeColor(e, note.id, 'yellow')}>blue</div>
                    <div className="green" onClick={(e) => onChangeColor(e, note.id, 'green')}>blue</div>
                    <div className="blue" onClick={(e) => onChangeColor(e, note.id, 'blue')}>blue</div>
                    <div className="purple" onClick={(e) => onChangeColor(e, note.id, 'purple')}>blue</div>
                    <div className="pink" onClick={(e) => onChangeColor(e, note.id, 'pink')}>blue</div>
                </div>
            </div>
        </div>
    )
}
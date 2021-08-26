export function NoteTxt({ note }) {
    return (
        <div className="note" >
            <h2>{note.info.title}</h2>
            <p>{note.info.txt}</p>
        </div>
    )
}


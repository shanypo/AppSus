import { NotePreview } from './NotePreview.jsx'
export function NoteList({ notes, onDeleteNote, onChangeColor, onPinNote }) {
    return (<React.Fragment>
        <section className="all-notes-display">
            <section className='pinned note-list main-layout'>
                {notes.map(note => {
                    if (note.isPinned) {
                        return <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote}
                            onChangeColor={onChangeColor} onPinNote={onPinNote} />
                    }
                }
                )}
            </section>
            <section className='note-list main-layout'>
                {notes.map(note => {
                    if (!note.isPinned) {
                        return <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote}
                            onChangeColor={onChangeColor} onPinNote={onPinNote} />
                    }
                }
                )}
            </section>
        </section>
    </React.Fragment>
    )
}
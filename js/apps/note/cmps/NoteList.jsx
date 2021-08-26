import { NotePreview } from './NotePreview.jsx'
export function NoteList({ notes, onDeleteNote }) {
    console.log('onDeleteNote list : ', onDeleteNote);
    return (
        <section className='note-list main-layout'>
            {notes.map(note =>
                <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote} />
            )}
        </section>
    )
}
import { NotePreview } from './NotePreview.jsx'
export function NoteList({ notes }) {
    return (
        <section className='note-list main-layout'>
            {notes.map(note =>
                <NotePreview key={note.id} note={note} />
            )}
        </section>
    )
}
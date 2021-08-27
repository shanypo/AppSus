import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/noteService.js'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'

export class NoteHome extends React.Component {
    state = {
        notes: [],
        filterBy: null
    };

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then((notes) => {
                this.setState({ notes });
            });
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)

    }

    onDeleteNote = (ev, noteId) => {
        ev.stopPropagation()
        noteService.deleteNote(noteId)
            .then(() => this.loadNotes())
    }

    onPinNote = (ev, noteId) => {
        ev.stopPropagation()
        noteService.updateNotePinned(noteId)
            .then(() => this.loadNotes())
    }

    onChangeColor = (ev, noteId, color) => {
        ev.stopPropagation()
        noteService.updateNoteColor(noteId, color)
            .then(() => this.loadNotes())
    }

    render() {
        return (
            <React.Fragment>
                <NoteFilter onSetFilter={this.onSetFilter} />
                <AddNote loadNotes={this.loadNotes} />
                <NoteList notes={this.state.notes} onDeleteNote={this.onDeleteNote}
                    onChangeColor={this.onChangeColor} onPinNote={this.onPinNote} />
            </React.Fragment>
        );
    }
}
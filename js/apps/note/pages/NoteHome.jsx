import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/noteService.js'
import { AddNote } from '../cmps/AddNote.jsx'

export class NoteHome extends React.Component {
    state = {
        notes: []
    };

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        console.log('load new notes');
        noteService.query()
            .then((notes) => {
                this.setState({ notes });
            });
    };

    onDeleteNote = (noteId) => {
        noteService.deleteNote(noteId)
            .then(() => this.loadNotes())
    }


    render() {
        return (
            <React.Fragment>
                <AddNote loadNotes={this.loadNotes} />
                <NoteList notes={this.state.notes} onDeleteNote={this.onDeleteNote} />
            </React.Fragment>
        );
    }
}
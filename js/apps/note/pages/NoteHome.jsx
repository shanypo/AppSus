const { Link } = ReactRouterDOM
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
                <Link to='/keep/edit'> link</Link>
                <NoteList notes={this.state.notes} onDeleteNote={this.onDeleteNote} />
            </React.Fragment>
        );
    }
}
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/noteService.js'
import { AddNote } from '../cmps/AddNote.jsx'

export class NoteHome extends React.Component {
    state = {
        notes: null
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


    render() {
        if (!this.state.notes) return <React.Fragment></React.Fragment>
        return (
            <React.Fragment>
                <AddNote loadNotes={this.loadNotes} />
                <NoteList notes={this.state.notes} />
            </React.Fragment>
        );
    }
}
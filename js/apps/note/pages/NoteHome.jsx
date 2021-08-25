import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/noteService.js'
export class NoteHome extends React.Component {
    state = {
        notes: null
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

    render() {
        if (!this.state.notes) return <React.Fragment></React.Fragment>
        return (
            <React.Fragment>
                <NoteList notes={this.state.notes} />
            </React.Fragment>
        );
    }
}
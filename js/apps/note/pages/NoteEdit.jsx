import { noteService } from '../services/noteService.js'
import { EditNotePreview } from '../cmps/EditNotePreview.jsx'
export class NoteEdit extends React.Component {
    state = {
        note: null
    };

    goBack = () => {
        this.props.history.push('/keep');
    }

    componentDidMount() {
        const id = this.props.match.params.noteId
        if (!id) return
        noteService.getNoteById(id)
            .then(note => {
                this.setState({ note })
            })
    }




    render() {
        const { note } = this.state
        // console.log('note', note);
        return (
            <React.Fragment>
                <div className='screen' onClick={(ev) => this.goBack(ev)} >
                </div>
                <div className='editor'>
                    <h4>Edit your note</h4>
                    {note && <EditNotePreview note={note} goBack={this.goBack} />}
                </div>
            </React.Fragment>
        );
    }
}
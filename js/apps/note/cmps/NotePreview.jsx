const { Link } = ReactRouterDOM
import { NoteImg } from './dynamic/notePreview/NoteImg.jsx'
import { NoteTxt } from './dynamic/notePreview/NoteTxt.jsx'
import { NoteTodo } from './dynamic/notePreview/NoteTodo.jsx'
import { NoteVideo } from './dynamic/notePreview/NoteVideo.jsx'

export class NotePreview extends React.Component {
    render() {
        const note = this.props.note;
        // console.log('onDeleteNote', this.props.onDeleteNote);
        const DynamicCmp = (props) => {
            switch (props.note.type) {
                case 'img':
                    return <NoteImg {...props} />
                case 'txt':
                    return <NoteTxt {...props} />
                case 'todos':
                    return <NoteTodo {...props} />
                case 'video':
                    return <NoteVideo {...props} />
                default:
                    break;
            }
        }

        return (
            <Link to={`/keep/edit/${note.id}`}>
                <DynamicCmp note={note} onDeleteNote={this.props.onDeleteNote} />
            </Link>
        )
    }
}


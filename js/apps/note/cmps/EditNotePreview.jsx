import { EditNoteTxt } from './dynamic/EditNote/EditNoteTxt.jsx';
import { EditNoteTodo } from './dynamic/EditNote/EditNoteTodo.jsx';
import { EditNoteVideo } from './dynamic/EditNote/EditNoteVideo.jsx'
import { EditNoteImg } from './dynamic/EditNote/EditNoteImg.jsx'

export class EditNotePreview extends React.Component {
    render() {
        const { note } = this.props;
        const DynamicCmp = (props) => {
            switch (props.note.type) {
                case 'txt':
                    return <EditNoteTxt {...props} />
                case 'todos':
                    return <EditNoteTodo {...props} />
                case 'video':
                    return <EditNoteVideo {...props} />
                case 'img':
                    return <EditNoteImg {...props} />
                default:
                    break;
            }
        }

        return (
            <DynamicCmp note={note} goBack={this.props.goBack} />
        )
    }
}
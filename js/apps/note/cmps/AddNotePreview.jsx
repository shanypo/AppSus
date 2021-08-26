import { AddNoteTxt } from './dynamic/addNote/AddNoteTxt.jsx';
import { AddNoteTodo } from './dynamic/addNote/AddNoteTodo.jsx';
import { AddNoteVideo } from './dynamic/addNote/AddNoteVideo.jsx'
import { AddNoteImg } from './dynamic/addNote/AddNoteImg.jsx'

export class AddNotePreview extends React.Component {
    render() {
        const type = this.props.type;
        // console.log('type', type);
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'txt':
                    return <AddNoteTxt {...props} />
                case 'todos':
                    return <AddNoteTodo {...props} />
                case 'video':
                    return <AddNoteVideo {...props} />
                // case 'img':
                //     return <AddNoteImg {...props} />
                default:
                    break;
            }
        }

        return (
            <DynamicCmp type={type} loadNotes={this.props.loadNotes} />
        )
    }
}
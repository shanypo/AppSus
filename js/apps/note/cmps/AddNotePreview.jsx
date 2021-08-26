import { AddNoteTxt } from './dynamic/addNote/AddNoteTxt.jsx';
import { AddNoteTodo } from './dynamic/addNote/AddNoteTodo.jsx';

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
                // case 'img':
                //     return <NoteImg {...props} />
                default:
                    break;
            }
        }

        return (
            <DynamicCmp type={type} loadNotes={this.props.loadNotes} />
        )
    }
}
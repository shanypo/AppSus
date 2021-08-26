import { NoteImg } from './dynamic/notePreview/NoteImg.jsx'
import { NoteTxt } from './dynamic/notePreview/NoteTxt.jsx'
import { NoteTodo } from './dynamic/notePreview/NoteTodo.jsx'

export class NotePreview extends React.Component {
    render() {
        const note = this.props.note;
        const DynamicCmp = (props) => {
            switch (props.note.type) {
                case 'img':
                    return <NoteImg {...props} />
                case 'txt':
                    return <NoteTxt {...props} />
                case 'todos':
                    return <NoteTodo {...props} />
                default:
                    break;
            }
        }

        return (
            <DynamicCmp note={note} />
        )
    }
}


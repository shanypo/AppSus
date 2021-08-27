import { AddNotePreview } from './AddNotePreview.jsx'

export class AddNote extends React.Component {
    state = {
        type: 'txt'
    }

    onChangeType = (type) => {
        this.setState({ type })
    }

    render() {
        const { type } = this.state
        return (
            <section className="add-note">
                <h4>Take a note...</h4>
                <div className="add-note-preview">
                    <AddNotePreview type={type} loadNotes={this.props.loadNotes} />
                </div>
                <ul className="clean-list flex space-between direction-row">
                    <li onClick={() => this.onChangeType('txt')}>text</li>
                    <li onClick={() => this.onChangeType('video')}>video</li>
                    <li onClick={() => this.onChangeType('todos')}>todo</li>
                    <li onClick={() => this.onChangeType('img')}>img</li>
                </ul>
            </section>

        )
    }
}
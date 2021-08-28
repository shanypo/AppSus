import { AddNotePreview } from './AddNotePreview.jsx'

export class AddNote extends React.Component {
    state = {
        type: 'video'
    }

    onChangeType = (type) => {
        this.setState({ type })
    }

    render() {
        const { type } = this.state
        return (
            <section className="new-note flex justify-center main-layout" >
                <div className="add-note">
                    <label htmlFor="display-editor"><h4> Take a note...</h4></label>
                    <input className="unshowen-checkbox" type="checkbox" id="display-editor" />
                    <div className="editor-display">

                        <div className="add-note-preview">
                            <AddNotePreview type={type} loadNotes={this.props.loadNotes} />
                        </div>
                        <ul className="clean-list flex space-around direction-row">
                            <li onClick={() => this.onChangeType('txt')}><img src="../../../../img/icons/txt.png" /></li>
                            <li onClick={() => this.onChangeType('video')}><img src="../../../../img/icons/video.jpg" /></li>
                            <li onClick={() => this.onChangeType('todos')}><img src="../../../../img/icons/todo.png" /></li>
                            <li onClick={() => this.onChangeType('img')}><img src="../../../../img/icons/img.png" /></li>
                        </ul>
                    </div>
                </div>
            </section>

        )
    }
}
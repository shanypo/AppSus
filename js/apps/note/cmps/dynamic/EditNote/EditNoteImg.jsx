import { noteService } from "../../../services/noteService.js"

export class EditNoteImg extends React.Component {

    state = {
        note: this.props.note
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        let newInfo = this.state.note.info
        newInfo[field] = value
        // console.log('newInfo', newInfo);
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.updateNote(this.state.note)
            .then(() => this.props.goBack())
    }

    render() {
        const { note } = this.state
        return (
            <div>
                <img src={note.info.url} />
                <form >
                    <input value={note.info.title} type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <input value={note.info.url} type="text" name="url"
                        placeholder="Type photo Url" onChange={this.handleChange} />
                </form>

                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}
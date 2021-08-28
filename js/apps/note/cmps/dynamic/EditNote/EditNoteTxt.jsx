import { noteService } from "../../../services/noteService.js"
export class EditNoteTxt extends React.Component {

    state = {
        note: this.props.note
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        let newInfo = this.state.note.info
        newInfo[field] = value
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    onSaveNote = () => {
        noteService.updateNote(this.state.note)
            .then(() => this.props.goBack())

    }

    render() {
        const { note } = this.state
        const classNote = `add-note-txt flex direction-col ${note.style.backgroundColor}`
        return (
            <div className={classNote}>
                <div className="add-txt flex direction-col align-center">
                    <input className="note-title" value={note.info.title} id="title" type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <textarea value={note.info.txt} name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                    <button className="save-note" onClick={this.onSaveNote}>Save Note</button>
                </div>
            </div>
        )
    }
}
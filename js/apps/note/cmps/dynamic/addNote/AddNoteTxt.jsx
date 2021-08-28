import { noteService } from "../../../services/noteService.js"
export class AddNoteTxt extends React.Component {

    state = {
        note: {
            id: '',
            type: "txt",
            isPinned: false,
            info: {
                title: 'My note',
                txt: ''
            },
            style: {
                backgroundColor: 'white'
            }
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        let newInfo = this.state.note.info
        newInfo[field] = value
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewNote(this.state.note)
            .then(() => this.props.loadNotes())

    }

    render() {
        return (
            <div className="add-note-txt ">
                <form className="add-txt flex direction-col align-center " onSubmit={this.onSaveNote}>
                    <input className="note-title" type="search" name="title" placeholder="Title" onChange={this.handleChange} />
                    <textarea placeholder="Take a note..." name="txt" onChange={this.handleChange}></textarea>
                    <button className="save-note">Save Note</button>
                </form>
            </div>
        )
    }
}
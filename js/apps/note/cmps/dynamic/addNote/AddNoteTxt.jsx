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
            <div>
                <form className="add-txt" onSubmit={this.onSaveNote}>
                    <input type="search" name="title" placeholder="title" onChange={this.handleChange} />
                    <textarea name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                    <button>Save Note</button>
                </form>
            </div>
        )
    }
}
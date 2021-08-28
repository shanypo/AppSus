import { noteService } from "../../../services/noteService.js"

export class EditNoteImg extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        const newNote = this.props.note
        this.setState({ note: newNote })
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
        noteService.updateNote(this.state.note)
            .then(() => this.props.goBack())
    }

    render() {
        const { note } = this.state
        if (note === null) return <div></div>
        const classNote = `note-editor flex direction-col align-center ${note.style.backgroundColor}`
        return (
            <div className={classNote}>
                <form className="flex direction-col align-center" >
                    <input className="note-title" value={note.info.title} type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <img src={note.info.url} />
                    <div className="edit-add-img-link flex direction-row align-center ">
                        <img className="link-icon" src="././././img/icons/link.png" />
                        <input value={note.info.url} type="text" name="url"
                            placeholder="Type photo Url" onChange={this.handleChange} />
                    </div>
                    <textarea value={note.info.txt} placeholder="Type descrition" name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                </form>

                <button className="save-note" onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}
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
        if (note === null) return <div></div>
        const classNote = `note ${note.style.backgroundColor}`
        return (
            <div className={classNote}>
                <form >
                    <input value={note.info.title} type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <img src={note.info.url} />
                    <input value={note.info.url} type="text" name="url"
                        placeholder="Type photo Url" onChange={this.handleChange} />
                    <textarea value={note.info.txt} placeholder="Type descrition" name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                </form>

                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}
import { noteService } from "../../../services/noteService.js"

export class AddNoteImg extends React.Component {

    state = {
        note: {
            id: '',
            type: "img",
            isPinned: false,
            info: {
                url: "https://picsum.photos/200/300",
                title: 'My photo',
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
        const { info } = this.state.note
        return (
            <div className="add-img-note flex direction-col align-center">
                <form className="flex direction-col align-center" >
                    <input className="note-title" type="text" name="title" placeholder="Title" onChange={this.handleChange} />
                    <img className="show-img" src={info.url} />
                    <div className="add-img-link flex direction-row space-around">
                        <img className="link-icon" src="../../../../img/icons/link.png" />
                        <input type="text" name="url"
                            placeholder="Type photo Url" onChange={this.handleChange} value={info.url} />
                    </div>
                    <textarea placeholder="Think of something?" name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                </form>

                <button className="save-note" onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}
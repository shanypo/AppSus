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
        // console.log('newInfo', newInfo);
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    onSaveNote = () => {
        // console.log('this.props', this.props);
        noteService.updateNote(this.state.note)
            .then(() => this.props.goBack())

    }

    render() {
        const { note } = this.state
        // console.log('note', note);
        return (
            <div>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input value={note.info.title} id="title" type="text" name="title" placeholder="title" onChange={this.handleChange} />
                </div>
                <textarea value={note.info.txt} name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}
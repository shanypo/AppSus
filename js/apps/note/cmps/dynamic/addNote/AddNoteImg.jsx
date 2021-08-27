import { noteService } from "../../../services/noteService.js"

export class AddNoteImg extends React.Component {

    state = {
        info: {
            title: '',
            url: 'https://picsum.photos/200/300',
            isPinned: false,
            backgroundColor: '#fff',
            txt: ''
        },

    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewImgNote(this.state.info)
            .then(() => this.props.loadNotes())
    }

    render() {
        const { info } = this.state
        return (
            <div>
                <form >
                    <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <img src={info.url} />
                    <input type="text" name="url"
                        placeholder="Type photo Url" onChange={this.handleChange} value={info.url} />
                    <textarea placeholder="Type descrition" name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                </form>

                <button onClick={this.onSaveNote}>Save Note</button>
            </div>
        )
    }
}
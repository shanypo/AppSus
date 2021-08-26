import { noteService } from "../../../services/noteService.js"
export class AddNoteTxt extends React.Component {

    state = {
        info: {
            title: 'title',
            txt: 'txt',
            isPinned: false,
            backgroundColor: '#fff'
        }
    }

    // componentDidMount() {
    // }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewTxtNote(this.state.info)
            // this.props.loadNotes()
            .then(() => this.props.loadNotes())

    }

    render() {
        // const { vendor, speed, id } = this.state.car
        return (
            // <form className="add-txt" onSubmit={this.onSaveCar}>
            <div>
                <form className="add-txt" onSubmit={this.onSaveNote}>
                    <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <textarea name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                    <button>Save Note</button>
                </form>
            </div>
        )
    }
}
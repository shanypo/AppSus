import { noteService } from "../../../services/noteService.js"
import { InputTodo } from "../../InputTodo.jsx"
export class EditNoteTodo extends React.Component {

    state = {
        note: this.props.note
    }

    handleChangeTitle = ({ target }) => {
        const value = target.value
        let newInfo = this.state.note.info
        newInfo.title = value
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    handleChangeTodo = ({ target }) => {
        const idx = target.name
        const value = target.value
        const newInfo = this.state.note.info
        newInfo.todos[idx].txt = value
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    onAddTodo = () => {
        const newInfo = this.state.note.info
        newInfo.todos.push({ txt: '', DoneAt: null })
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    onDeleteTodo = (ev, idx) => {
        ev.preventDefault()
        if (!idx) return
        const newInfo = this.state.note.info
        newInfo.todos.splice(idx, 1)
        this.setState(prevState => ({ note: { ...prevState.note, info: newInfo } }))
    }

    onSaveNote = () => {
        noteService.updateNote(this.state.note)
            .then(() => this.props.goBack())

    }

    render() {
        const { todos } = this.state.note.info
        const { note } = this.state
        const classNote = `note-editor flex direction-col ${note.style.backgroundColor}`
        return (
            <form className={classNote} onSubmit={this.onSaveNote}>
                <input className="note-title" type="text" name="title" placeholder="title" onChange={this.handleChangeTitle} />
                <h4>Todos:</h4>
                {todos.map((todo, idx) =>
                    <InputTodo key={idx} todo={todo} idx={idx}
                        handleChangeTodo={this.handleChangeTodo} onDeleteTodo={this.onDeleteTodo} />
                )}
                <p onClick={this.onAddTodo}> + add todo</p>
                <button className="save-note">Save Note</button>
            </form>
        )
    }
}


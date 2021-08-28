import { noteService } from "../../../services/noteService.js"
import { InputTodo } from "../../InputTodo.jsx"
export class AddNoteTodo extends React.Component {

    state = {
        note: {
            id: '',
            type: 'todos',
            isPinned: false,
            info: {
                title: 'my tasks',
                todos: [
                    { txt: 'task 1', doneAt: null },
                ]
            },
            style: {
                backgroundColor: 'white'
            }
        }
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

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewNote(this.state.note)
            .then(() => this.props.loadNotes())

    }


    render() {
        const { todos } = this.state.note.info
        return (
            <form className="add-todo flex direction-col align-center" onSubmit={this.onSaveNote}>
                <input className="note-title" type="text" name="title" placeholder="Title" onChange={this.handleChangeTitle} />
                <h5>Todos:</h5>
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

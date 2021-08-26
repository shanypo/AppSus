import { noteService } from "../../../services/noteService.js"
export class AddNoteTodo extends React.Component {

    state = {
        info: {
            title: 'my tasks',
            isPinned: false,
            backgroundColor: '#fff',
            todos: 'Do Something'
        }

        // todos: [
        //     { txt: 'Do Something', doneAt: null }
        // ]
    }

    // componentDidMount() {
    // }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        // const todo = { txt: value, doneAt: null }
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))

        // this.setState({ todos })
        // this.setState(prevState => ({ ...prevState, todos: [...prevState.todos, todo] }))
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNewTodoNote(this.state.info)
            .then(() => this.props.loadNotes())

    }

    render() {
        // const { vendor, speed, id } = this.state.car
        return (
            <form className="add-todo" onSubmit={this.onSaveNote}>
                <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
                <input type="text" name="todos" placeholder="Enter comma seperated todos" onChange={this.handleChange} />
                <button>Save Note</button>
            </form>
        )
    }
}

// {
//     id: "n103",
//     type: "todos",
//     isPinned: true,
//     info: {
//         title: "Get my stuff together",
//         todos: [
//             { txt: "Driving liscence", doneAt: null },
//             { txt: "Coding power", doneAt: 187111111 }
//         ]
//     },
//     style: {
//         backgroundColor: "#00d"
//     }
// }
import { noteService } from '../services/noteService.js'
export class Todo extends React.Component {  //{ txt: "Driving liscence", doneAt: null }
    state = {
        todo: this.props.todo,
        note: this.props.note
    }
    onDone = (e) => {
        e.stopPropagation();
        let { todo } = this.state;
        todo.doneAt = todo.doneAt ? null : new Date().toLocaleString()
        this.setState({ todo })
        noteService.updateNoteTodo(this.state.note.id, this.props.idx, todo)
    }
    render() {
        const todo = this.state.todo
        const ToDoClass = ((todo.doneAt) ? 'done' : '') + ' pointer';
        return (
            <li onClick={this.onDone} className={ToDoClass} >
                {todo.txt}
            </li >
        )
    }

}

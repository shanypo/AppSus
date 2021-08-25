
export class Todo extends React.Component {  //{ txt: "Driving liscence", doneAt: null }
    state = {
        todo: this.props.todo
    }
    onDone = () => {
        let { todo } = this.state;
        todo.doneAt = todo.doneAt ? null : new Date().toLocaleString()
        this.setState({ todo })
    }
    render() {
        const todo = this.state.todo
        return (
            <p onClick={() => { this.onDone() }} className={todo.doneAt ? 'done' : ''} >
                {todo.txt}
            </p >
        )
    }

}

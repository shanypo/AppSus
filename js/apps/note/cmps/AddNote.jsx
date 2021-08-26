import { AddNotePreview } from './AddNotePreview.jsx'

export class AddNote extends React.Component {

    state = {
        type: 'txt'
    }

    // componentDidMount() {
    //     this.setState({ car })
    // }

    onChangeType = (type) => {
        console.log('type', type);
        this.setState({ type })
    }

    // onSaveCar = (ev) => {
    //     ev.preventDefault()
    //     carService.saveCar(this.state.car)
    //         .then(() => this.props.history.push('/car'))

    // }

    render() {
        const { type } = this.state
        // console.log('this.props', this.props.loadNotes);
        return (
            // <form className="car-edit" onSubmit={this.onSaveCar}>
            <section className="add-note">
                <h4>Take a note...</h4>
                <div className="add-note-preview">
                    <AddNotePreview type={type} loadNotes={this.props.loadNotes} />
                </div>
                <ul className="clean-list flex space-between direction-row">
                    <li onClick={() => this.onChangeType('txt')}>text</li>
                    <li onClick={() => this.onChangeType('video')}>video</li>
                    <li onClick={() => this.onChangeType('todos')}>todo</li>
                    <li onClick={() => this.onChangeType('img')}>img</li>
                </ul>
            </section>

        )
    }
}
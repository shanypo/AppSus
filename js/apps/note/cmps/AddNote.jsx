
export class AddNote extends React.Component {

    state = {
        note: {
            vendor: '',
            speed: ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.carId
        if (!id) return
        carService.getCarById(id)
            .then(car => {
                this.setState({ car })
            })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ car: { ...prevState.car, [field]: value } }))
    }

    onSaveCar = (ev) => {
        ev.preventDefault()
        carService.saveCar(this.state.car)
            .then(() => this.props.history.push('/car'))

    }

    render() {
        const { vendor, speed, id } = this.state.car
        return (
            <form className="car-edit" onSubmit={this.onSaveCar}>
                <h1>{id ? 'Edit' : 'Add'} Car</h1>
                <label htmlFor="vendor" >Vendor</label>
                <input type="text" name="vendor" id="vendor" value={vendor} onChange={this.handleChange} />

                <label htmlFor="speed" >Speed</label>
                <input type="number" name="speed" id="speed" value={speed} onChange={this.handleChange} />

                <button>Save Car</button>
            </form>
        )
    }
}
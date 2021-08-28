export class MailFilter extends React.Component {
    state = {
        criteria: {
            status: '',
            display: 'all',
            txt: '',
            isRead: '',
            isStared: false,
            lables: null,
            sortBy: ''
        }
    }

    componentDidMount () {
        const {criteria} = this.props;
        this.setState({criteria})
    }
    handleChange = (ev) => {
        ev.preventDefault();
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => ({ criteria: { ...prevState.criteria, [field]: value } }), () => {
            console.log(this.state.criteria);
            this.props.onSetFilter(this.state.criteria);
        });

        // this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, [field]: value }
        // }), () => {
        //     console.log(this.state.criteria);
        //     this.props.onSetFilter(this.state.criteria);
        // });
    }

    render() {
        const { onDisplay, displayVal } = this.props;
        const { txt, sortBy } = this.state;
        return (
            <section className="mail-criteria">
                <label className="search" htmlFor="bySearch"><img src="../../../../img/glass.svg" /></label>
                <input type="text" id="bySearch" name="txt" value={txt} onChange={this.handleChange} />
                <select name='display' value={displayVal} onChange={() => onDisplay(event.target.value)}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
                <select name='sortBy' value={sortBy} onChange={this.handleChange}>
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                </select>
            </section>
        )
    }
}


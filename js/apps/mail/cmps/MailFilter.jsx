export class MailFilter extends React.Component {
    state = {
        display: 'all',
        txt: '',
        sortBy: ''
    }

    handleChange = (ev) => {
        ev.preventDefault();
        const field = ev.target.name;
        const value = ev.target.value;
        console.log(field);
        this.setState({[field]:value}, () => {
            console.log(this.state);
            this.props.onSetFilter(this.state);
        })
    }

    // onFilter = (ev) => {
    //     ev.preventDefault();
    //     console.log(this.state.criteria);
    //     this.props.onSetFilter(this.state.criteria);
    // }

    render() {
        const { onDisplay, displayVal } = this.props;
        const { txt, sortBy } = this.state;
        return (
            <section className="mail-criteria">
                <label htmlFor="bySearch">Search</label>
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


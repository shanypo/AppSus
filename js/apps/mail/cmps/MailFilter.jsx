export class MailFilter extends React.Component {
    state = {
        criteria: {
            status: '',
            txt: '',
            isRead: false,
            isStared: false,
            lables: null
        }
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState(PrevState => ({ criteria: { ...PrevState.criteria, txt: value }
        }), () => {
            this.props.onSetFilter(this.state.criteria);
        });
    }

    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.criteria);
    }

    render() {
        // const { status, txt, isRead, isStared, lables } = this.criteria;
        const { onDisplay, displayVal } = this.props;
        const search = this.state.criteria.txt;
        return (
            <section className="mail-criteria">
                <label htmlFor="bySearch">Search</label>
                <input type="text" id="bySearch" name="search" value={search} onChange={this.handleChange} />
                <select name='display' value={displayVal} onChange={() => onDisplay(event.target.value)}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </section>
        )
    }
}


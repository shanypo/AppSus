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

    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.criteria);
    }

    render() {
        // const { status, txt, isRead, isStared, lables } = this.criteria;

        return (
            <section className="mail-criteria">
                <label onChange={this.handleChange}>inbox</label>
            </section>
        )
    }
}


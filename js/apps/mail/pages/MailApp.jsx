import { MailList } from '../cmps/MailList.jsx';
import { mailService } from '../services/mail.service.js';
import { MailFilter } from '../cmps/MailFilter.jsx';
import { NavBar } from '../cmps/NavBar.jsx';
import { MailCompose } from '../cmps/MailCompose.jsx';
import { eventBusService } from '../../../services/event-bus-service.js';

const { Route, Link, Switch } = ReactRouterDOM

export class MailApp extends React.Component {
    state = {
        mails: null,
        criteria: {
            status: 'inbox',
            display: 'all',
            txt: '',
            isRead: false,
            isStared: false,
            lables: null
        },
        countUnRead: null
    }

    componentDidMount() {
        this.loadMails();
    }

    componentDidUpdate(prevProps) {
        let status = this.props.match.params.mailFilter
        if (prevProps.match.params.mailFilter !== status) {
            const currStatus = this.getUrlStatus();
            this.getCurrStatus(currStatus);
        }
    }

    loadMails() {
        mailService.query(this.state.criteria)
            .then((mails) => {
                this.setState({ mails })
            })

    }

    getCurrStatus = (currStatus) => {
        const status = ['inbox', 'sent', 'starred', 'drafts'];
        status.includes(currStatus) ? this.setState(PrevState => ({ criteria: { ...PrevState.criteria, status: currStatus } }),
            () => { this.loadMails() }) : '';  
    }
    getUrlStatus = () => {
        return this.props.match.params.mailFilter;
    }

    // onUnReadMails = () => {
    //     this.setState({status: 'unread'});
    //     mailService.query(this.state.criteria.status)
    //     .then((countUnRead) => {
    //         this.setState({ countUnRead })
    //     })
    // }

    onSetFilter = (criteria) => {
        this.setState({ criteria })
        this.loadMails();
    }

    onDisplay = (val) => {
        this.setState(PrevState => ({ criteria: { ...PrevState.criteria, display: val } }), () => {
            this.loadMails();
        })
    }

    render() {
        const { mails, criteria } = this.state;
        if (!mails) return <div>Loading...</div>;
        return (
            <React.Fragment>
                <MailFilter displayVal={criteria.display} onDisplay={this.onDisplay} onSetFilter={this.onSetFilter} />
                <section className="flex justify-center align-center">
                    <nav>
                        <NavBar className='nav-bar' countUnRead={this.onUnReadMails} />
                    </nav>
                    <MailList mails={mails} criteria={criteria} />
                </section>
            </React.Fragment>
        )
    }

}

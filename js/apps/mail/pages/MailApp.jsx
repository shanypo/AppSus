import { MailList } from '../cmps/MailList.jsx';
import { mailService } from '../services/mail.service.js';
import { MailFilter } from '../cmps/MailFilter.jsx';
import { NavBar } from '../cmps/NavBar.jsx';
import { eventBusService } from '../../../services/event-bus-service.js';

export class MailApp extends React.Component {
    state = {
        mails: null,
        criteria: {
            status: 'inbox',
            isRead: '',
            isStared: false,
            lables: null,
            display: 'all',
            txt: '',
            sortBy: '',
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
        const { criteria, display, txt, sortBy } = this.state;
        mailService.query(criteria)
            .then((mails) => {
                this.setState({ mails })
                this.setUnreadCount(mails);
            })
    }

    getCurrStatus = (currStatus) => {
        const status = ['inbox', 'sent', 'starred', 'drafts'];
        if (status.includes(currStatus)) {
            this.setState(prevState => ({ criteria: { ...prevState.criteria, status: currStatus } }),
                () => {
                    this.loadMails()
                });
        }
    }

    getUrlStatus = () => {
        return this.props.match.params.mailFilter;
    }

    setUnreadCount = (mails) => {
        const unreadMails = mails.filter(mail => {
            return !mail.isRead
        })
        this.setState({ countUnRead: unreadMails.length })
    }

    onSetFilter = (criteria) => {
        this.setState({ criteria }, () => {
            console.log(criteria);
            this.loadMails();
        })
    }

    onToggelStar = (mailId) => {
        mailService.toggelStar(mailId);
        this.loadMails();
    }

    onToggelRead = (mailId) => {
        mailService.toggelRead(mailId);
        this.loadMails();
    }

    onDisplay = (val) => {
        this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, display: val } }), () => {
            this.loadMails();
        })
    }

    render() {
        const { mails, criteria, countUnRead } = this.state;
        if (!mails) return <div>Loading...</div>;
        return (
            <React.Fragment>
                <section className="main-mail grid main-layout">
                    <MailFilter displayVal={criteria.display} onDisplay={this.onDisplay} onSetFilter={this.onSetFilter} criteria={criteria} />
                    <NavBar className='nav-bar' countUnRead={countUnRead} />
                    <MailList mails={mails} criteria={criteria} onToggelRead={this.onToggelRead} onToggelStar={this.onToggelStar} className="mail-list" />
                </section>
            </React.Fragment>
        )
    }

}

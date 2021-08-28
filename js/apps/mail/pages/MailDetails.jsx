const { Route, Link } = ReactRouterDOM
import { mailService } from '../services/mail.service.js';
import { MailCompose } from '../cmps/MailCompose.jsx';
import { NavBar } from '../cmps/NavBar.jsx';

export class MailDetails extends React.Component {
    state = {
        mail: null,
    }

    componentDidMount() {
        this.loadMail();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    loadMail() {
        const id = this.props.match.params.mailId
        mailService.getMailById(id).then(mail => {
            if (!mail) return this.props.history.push('/')
            this.setState({ mail })
        })
    }

    onDeleteMail = () => {
        mailService.deleteMail(this.state.mail.id)
            .then(() => {
                this.props.history.push('/mail')
            })
    }

    onBack = () => {
        this.props.history.push('/mail');
    }

    onRead = () => {
        const { mail } = this.state;
        mailService.onRead(mail.id);
    }

    render() {
        const { mail } = this.state;
        if (!mail) return <div>Loading...</div>
        this.onRead();
        return (
            <div className="mail-info flex">
                <nav className="folders-nav">
                    <NavBar className='nav-bar'/>
                </nav>
                <article className={'mail-details'}>
                    <button className="mails-details-btn" onClick={this.onBack}>Go Back</button>
                    <button className="mails-details-btn" onClick={this.onDeleteMail}>Delete</button>
                    <p>From: {mail.from}</p>
                    <p>Subject: {mail.subject}</p>
                    <p>{mail.body}</p>
                </article>
            </div>
        )

    }
}

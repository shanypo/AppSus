const { Link } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export class MailDetails extends React.Component {
    state = {
        mail: null,
        criteria: null
    }

    componentDidMount() {
        this.loadMail();
        this.onRead();
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
        mailService.getCriteria(this.state.criteria)
            .then(criteria => {
                this.setState({ criteria }, () => {
                    this.markRead();
                })
            })
    }

    markRead = () => {
        this.setState(({ criteria }) => ({
            criteria: { ...criteria, isRead: true }
        }))
    }

    render() {
        const { mail } = this.state;
        if (!mail) return <div>Loading...</div>
        return (
            <article className={'mail-details'}>
                <button onClick={this.onBack}>Go Back</button>
                <button onClick={this.onDeleteMail}>Delete</button>
                <p>{mail.subject}</p>
                <p>{mail.from}</p>
                <p>{mail.body}</p>
            </article>
        )

    }
}

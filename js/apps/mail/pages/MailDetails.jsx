const { Link } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export class MailDetails extends React.Component {
    state = {
        mail: null,
        criteria: null
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

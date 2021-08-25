const { Link } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export class MailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
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

    render() {
        const { mail } = this.state;
        if (!mail) return <div>Loading...</div>
        return (
            <article className={'mail-details'}>
                <p>{mail.subject}</p>
                <p>{mail.from}</p>
                <p>{mail.body}</p>
            </article>
        )

    }
}

import { mailService } from '../services/mail.service.js'
const { withRouter } = ReactRouterDOM;

export class _MailCompose extends React.Component {
    state = {
        onForword: null,
        isDraftCreate: false,
        newMail: {
            id: null,
            to: '',
            subject: '',
            body: ''
        }
    }

    draftInterval;

    componentDidMount() {
        this.draftInterval = setInterval(this.onSaveDraft, 5000);
        const mailId = this.props.match.params.mailId;
        mailService.getMailById(mailId)
            .then(mail => {
                if (mail) this.setDraftsData(mail);
            })

        if (this.props.match.isExact) this.handelForword();
    }

    componentWillUnmount() {
        clearInterval(this.draftInterval);
    }

    handelForword = () => {
        this.setState({ onForword: true })
        const { mail } = this.props;
    }

    handelChange = (ev) => {
        const field = ev.target.name;
        const val = ev.target.value;
        this.setState((prevState) => ({ ...prevState, newMail: { ...prevState.newMail, [field]: val } }));
    }

    onSaveDraft = () => {
        const { newMail, isDraftCreate } = this.state;
        if (!isDraftCreate) {
            mailService.sendMail(newMail, true)
                .then(mailId => this.setState((prevState) => ({ ...prevState, newMail: { ...prevState.newMail, id: mailId }, isDraftCreate: true })))
        } else {
            mailService.saveDrafts(newMail, this.state.newMail.id);
        }
    }

    setDraftsData = (mail) => {
        this.setState((prevState) =>({...prevState, newMail:{...prevState.newMail, id: mail.id, to: mail.to, subject: mail.subject, body: mail.body, isDraftCreate: true }}))
    }

    onSendMail = () => {
        const newMail = this.state.newMail;
        mailService.sendMail(newMail);
        this.props.history.push('/mail');
    }

    onCloseCompose = () => {
        this.props.history.push('/mail');
    }

    render() {
        const { to, subject, body } = this.state.newMail;
        return (
            <div className={`compose-modal flex`}>
                <header onClick={this.onCloseCompose}className="close-btn pointer">X</header>
                <input className="font-inpot" required type='email' name='to' placeholder='to:' value={to} onChange={this.handelChange} />
                <input className="font-inpot" type="text" name="subject" placeholder="Type subject here" value={subject} onChange={this.handelChange} />
                <textarea className='body-text font-inpot' placeholder='Type message text here' name='body' value={body} cols="30" rows="10" onChange={this.handelChange}></textarea>
                <button className="send-btn" onClick={this.onSendMail}>Send</button>
            </div>
        )
    }

}

export const MailCompose = withRouter(_MailCompose);
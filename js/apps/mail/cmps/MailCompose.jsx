import { mailService } from '../services/mail.service.js'

export class MailCompose extends React.Component {
    state = {
        onForword: null,
        email: '',
        subject: '',
        body: ''
    }

    componentDidMount() {
        const {mail} = this.props;
        if(!mail) return;
        this.handelForword();
    }

    handelForword = () => {
        this.setState({ onForword: true })
        const {mail} = this.props;
    }

    handelChange = (ev) => {
        const field = ev.target.name;
        this.setState({ [field]: ev.target.value })
    }

    onSendMail = () => {
        const { email, subject, body } = this.state;
        const newMail = { to:email, subject, body };
        mailService.sendMail(newMail);
        this.props.history.push('/mail');
    }
    
    onCloseCompose = () =>{
        this.props.history.push('/mail');
    }

    render() {
        const {forword} = this.state;
        if(forword) return <React.Fragment></React.Fragment>
        return (
            <div className={`compose-modal flex`}>
                <header onClick={this.onCloseCompose}>X</header>
                <input type='email' name='email' placeholder='to:' onChange={this.handelChange} value={this.state.email}/>
                <input type="text" name="subject" placeholder="Type subject here" onChange={this.handelChange}/>
                <textarea className='body-text' placeholder='Type message text here' name='body' cols="30" rows="10" onChange={this.handelChange}></textarea>
                <button onClick={this.onSendMail}>Send</button>
            </div>
        )
    }

}
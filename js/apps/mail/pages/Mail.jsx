import { MailList } from '../cmps/MailList.jsx';
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'

export class MailApp extends React.Component {
    state = {
        mails: null,
        criteria: {
            status: '',
            txt: '',
            isRead: false,
            isStared: false,
            lables: null
        }
    }

    componentDidMount(){
        this.loadMails();
    }

    loadMails() {
        mailService.getEmails()
            .then((mails) => {
                this.setState({mails})
            })
    }

    onSetFilter = (criteria) => {
        this.setState({ criteria }, this.loadMails)
    }

    render() {
        const {mails, criteria} = this.state;
        if(!mails) return <div>Loading...</div>;
        return (
            <section>
                <MailList mails={mails} criteria={criteria}/>
                <MailFilter filter={criteria} onSetFilter={this.onSetFilter} />
            </section>
        )
    }


}

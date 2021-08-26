import { MailList } from '../cmps/MailList.jsx';
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { NavBar } from '../cmps/NavBar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
const { Route, Link, Switch } = ReactRouterDOM

export class MailApp extends React.Component {
    state = {
        mails: null,
        criteria: {
            status: '',
            txt: '',
            isRead: false,
            isStared: false,
            lables: null
        },
        composeMail: null
    }

    componentDidMount() {
        this.loadMails();
    }

    loadMails() {
        mailService.getEmails()
            .then((mails) => {
                this.setState({ mails })
            })

    }

    onSetFilter = (criteria) => {
        this.setState({ criteria }, this.loadMails)
    }

    render() {
        const { mails, criteria } = this.state;
        if (!mails) return <div>Loading...</div>;
        return (
            <section className="flex justify-center align-center">
                <NavBar />
                <MailList mails={mails} criteria={criteria} />
                <MailFilter filter={criteria} onSetFilter={this.onSetFilter} />
            </section>
        )
    }


}

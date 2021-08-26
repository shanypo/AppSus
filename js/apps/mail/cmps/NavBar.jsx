const { Route, Link } = ReactRouterDOM

import { MailCompose } from './MailCompose.jsx';
import {MailFilter} from './MailFilter.jsx';

export function NavBar({onFilteType, onUnReadMails}) {
const unreadCount = onUnReadMails;
console.log(unreadCount);

    return (
        <React.Fragment>
            <Route exact component={MailCompose} path="/mail/compose"/>
            <Route exact component={MailFilter} path={["/mail/inbox, /mail/sent"]}/>
            <button><Link to={`/mail/compose`}> Compose +</Link></button>
            <button onClick={() => onFilteType('inbox')}><Link to={`/mail/inbox`}> inbox</Link></button>
            <nav className='pointer'>
                <p>sent</p>
                <p>starred</p>
                <p>Drafts</p>
            </nav>
            <p>{}</p>
        </React.Fragment>
    )
}
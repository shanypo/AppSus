const { Route, Link, NavLink } = ReactRouterDOM

import { MailCompose } from './MailCompose.jsx';

export function NavBar({ countUnRead }) {

    return (
            <nav className="folders flex">
            <Route exact component={MailCompose} path="/mail/compose/:mailId?" />
            <Link to={`/mail/compose`} className="compose-btn pointer">Compose +</Link>
            <nav className="folders-nav flex pointer">
                <NavLink to="/mail/inbox"><div><img src="./././img/inbox.svg" /> inbox</div></NavLink>
                <NavLink to="/mail/sent"><div><img src="./././img/send.svg" />sent</div></NavLink>
                <NavLink to="/mail/starred"><div><img src="./././img/is-starred.svg" />starred</div></NavLink>
                <NavLink to="/mail/drafts"><div><img src="./././img/drafts.svg" />Drafts</div></NavLink>
            </nav>
            <p className="count-read">Unread mails: {countUnRead}</p>
            </nav>
    )
}
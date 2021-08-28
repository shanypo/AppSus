const { Route, Link, NavLink } = ReactRouterDOM

import { MailCompose } from './MailCompose.jsx';

export function NavBar({countUnRead}) {

    return (
        <React.Fragment>
            <Route exact component={MailCompose} path="/mail/compose/:mailId?"/>
            <Link to={`/mail/compose`}className="compost-btn pointer">Compose +</Link>
            <nav className="folders-nav pointer">
            <NavLink to="/mail/inbox"><img src="../../../img/inbox.svg" /> inbox</NavLink>
            <NavLink to="/mail/sent">sent</NavLink>
            <NavLink to="/mail/starred">starred</NavLink>
            <NavLink to="/mail/drafts">Drafts</NavLink>
            </nav>
            <p className="count-read">Unread mails: {countUnRead}</p>
        </React.Fragment>
    )
}
const { Route, Link, NavLink } = ReactRouterDOM

import { MailCompose } from './MailCompose.jsx';

export function NavBar({countUnRead}) {

    return (
        <React.Fragment>
            <Route exact component={MailCompose} path="/mail/compose/:mailId?"/>
            <nav className="folders-nav pointer">
            <button><Link to={`/mail/compose`}> Compose +</Link></button>
            <NavLink to="/mail/inbox"><button>inbox</button></NavLink>
            <NavLink to="/mail/sent"><button>sent</button></NavLink>
            <NavLink to="/mail/starred"><button>starred</button></NavLink>
            <NavLink to="/mail/drafts"><button>Drafts</button></NavLink>
            </nav>
            <p>Unread mails: {countUnRead}</p>
        </React.Fragment>
    )
}
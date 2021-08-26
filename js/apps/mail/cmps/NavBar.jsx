const { Route, Link } = ReactRouterDOM

import { MailCompose } from './MailCompose.jsx'

export function NavBar() {

    return (
        <React.Fragment>
            <Route exact component={MailCompose} path="/mail/compose"/>
            <button><Link to={`/mail/compose`}> Compose +</Link></button>
            <nav className='nav-bar pointer'>
                <p>inbox</p>
                <p>sent</p>
                <p>starred</p>
                <p>Drafts</p>
            </nav>
        </React.Fragment>
    )
}
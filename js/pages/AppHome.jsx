const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from '../cmps/Home.jsx'
import { NoteHome } from '../apps/note/pages/NoteHome.jsx'
// import { MailHome } from '../apps/mail/MailHome.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { MailDetails } from '../apps/mail/pages/MailDetails.jsx'
import { MailApp } from '../apps/mail/pages/MailApp.jsx'

export function AppHome() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main>
                <Switch>
                    {/* <Route component={MailHome} path="/mail" /> */}
                    <Route component={MailDetails} path="/mail/details/:mailId" />
                    <Route component={MailApp} path="/mail" />
                    <Route component={NoteHome} path="/keep" />
                    {/* <Route component={KeepHome} path="/keep" /> */}
                    {/* <Route component={BooksHome} path="/books" /> */}
                    {/* <Route component={AppAbout} path="/books" /> */}
                    {/* <Route component={Home} path="/" /> */}
                </Switch>
            </main>
        </Router>
    )
}
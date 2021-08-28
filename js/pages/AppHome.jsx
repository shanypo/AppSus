const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from '../cmps/Home.jsx'
import { NoteHome } from '../apps/note/pages/NoteHome.jsx'
import { NoteEdit } from '../apps/note/pages/NoteEdit.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { MailDetails } from '../apps/mail/pages/MailDetails.jsx'
import { MailApp } from '../apps/mail/pages/MailApp.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'
import { BookHome } from '../apps/book/pages/BookHome.jsx'
import { BookDetails } from '../apps/book/pages/BookDetails.jsx'

export function AppHome() {

    return (
        <Router>
            {/* <div className="screen pointer" onclick="openRightNav()"></div> */}
            <header className="main-header main-layout flex direction-row align-center space-between theme-color">
                <AppHeader />
            </header>
            <main className="main-layout">
                <Switch>
                    <Route component={MailDetails} path="/mail/details/:mailId" />
                    <Route component={MailApp} path="/mail/:mailFilter?" />
                    <Route component={NoteEdit} path="/keep/edit/:noteId?" />
                    <Route component={NoteHome} path="/keep" />
                    <Route component={BookDetails} path="/book/:bookId" />
                    <Route component={BookHome} path="/book" />
                    {/* <Route component={AppAbout} path="/books" /> */}
                    <Route component={Home} path="/" />
                </Switch>
            </main>
            <footer className="main-footer main-layout flex direction-col theme-color">
                <AppFooter />
            </footer>
        </Router>
    )
}
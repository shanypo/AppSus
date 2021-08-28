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

// export function AppHome() {
export class AppHome extends React.Component {
    state = {
        isMenuOpen: false
    }

    onMenuClick = () => {
        console.log('click');
        const newIsMenuOpen = !this.state.isMenuOpen
        console.log('newIsMenuOpen', newIsMenuOpen);
        this.setState({ isMenuOpen: newIsMenuOpen })
    }

    render() {
        const bodyClass = this.state.isMenuOpen ? 'menu-open' : 'react-body';
        return (
            <Router>
                <div className={bodyClass}>
                    <div onClick={this.onMenuClick} className="screen pointer" ></div>
                    <header className="main-header main-layout flex direction-row align-center space-between theme-color">
                        <AppHeader onMenuClick={this.onMenuClick} />
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
                    <footer className="main-footer main-layout flex direction-col justify-center theme-color">
                        <AppFooter />
                    </footer>
                </div>
            </Router>
        )
    }
}
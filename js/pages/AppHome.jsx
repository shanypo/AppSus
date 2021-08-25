const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from '../cmps/Home.jsx'
import { NoteHome } from '../apps/note/pages/NoteHome.jsx'
export function AppHome() {
    return (
        <Router>
            <header>
                {/* <AppHeader /> */}
            </header>
            <main>
                <Switch>
                    {/* <Route component={MailHome} path="/mail" /> */}
                    <Route component={NoteHome} path="/keep" />
                    {/* <Route component={BooksHome} path="/books" /> */}
                    {/* <Route component={AppAbout} path="/books" /> */}
                    {/* <Route component={Home} path="/" /> */}
                </Switch>
            </main>
        </Router>
    )
}
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from '../cmps/Home.jsx'

export function AppHome() {
    return (
        <Router>
            <header>
                {/* <AppHeader /> */}
            </header>
            <main>
                <Switch>
                    {/* <Route component={MailHome} path="/mail" /> */}
                    {/* <Route component={KeepHome} path="/keep" /> */}
                    {/* <Route component={BooksHome} path="/books" /> */}
                    {/* <Route component={AppAbout} path="/books" /> */}
                    <Route component={Home} path="/" />
                </Switch>
            </main>
        </Router>
    )
}
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { MailApp } from './pages/Mail.jsx'
// import { NavBar } from './cmps/NavBar.jsx'

export function MailHome() {
    return (
        <section>
            <nav>
                {/* <NavBar /> */}
            </nav>
            <MailApp />
        </section>
    )
}
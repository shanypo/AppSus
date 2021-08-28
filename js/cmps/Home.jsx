const { NavLink } = ReactRouterDOM

export function Home() {
    return (
        <ul className="home-nav clean-list pointer flex main-layout">
            <li><NavLink exact to="/mail" activeClassName="active-nav">
                <div className="mail flex direction-col home-animation font-size align-center "><img src="./img/envalopHome.svg" /> Mail
                </div></NavLink></li>
            <li><NavLink to="/book">
                <div className="books flex direction-col home-animation font-size align-center "><img src="./img/books.svg" /> Books</div></NavLink></li>
            <li><NavLink to="/keep">
                <div className="keep flex direction-col home-animation font-size align-center "><img src="./img/note.svg" /> Keep</div>
            </NavLink></li>
        </ul>
    )
}

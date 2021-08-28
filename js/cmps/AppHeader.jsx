const { NavLink, withRouter, Link } = ReactRouterDOM

// import { eventBusService } from '../services/event-bus-service.js'
class _AppHeader extends React.Component {

  render() {
    // const { isMenuOpen } = this.state;
    return (
      <React.Fragment>
        <Link to="/"><div className="logo flex align-center pointer">
          <img src="././img/logo1.png" />
        </div></Link>
        <ul className="main-nav clean-list">
          <li><NavLink exact to="/" activeClassName="active-nav" className="nav-home">Home</NavLink></li>
          <li><NavLink to="/mail" className="nav-mail">Mail</NavLink></li>
          <li><NavLink to="/book" className="nav-mail">Books</NavLink></li>
          <li><NavLink to="/keep" className="nav-keep">Keep</NavLink></li>
        </ul>
        <button className="btn-menu-toggle" onClick={() => {
          this.props.onMenuClick()
        }}>
          ☰</button>
      </React.Fragment>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
const { NavLink, withRouter, Link } = ReactRouterDOM

// import { eventBusService } from '../services/event-bus-service.js'
class _AppHeader extends React.Component {
  // state = {
  //   isMenuOpen: false
  // }

  onMenuClick = () => {
    // const newMenuOpen = !this.state.isMenuOpen
    // this.setState({ isMenuOpen: newMenuOpen })
    document.querySelector('body').classList.toggle('menu-open');
  }
  render() {

    return (
      <React.Fragment>
        <Link to="/"><div className="logo flex align-center pointer">
          <img src="../../img/logo1.png" />
        </div></Link>
        <ul className="main-nav clean-list">
          <li><NavLink exact to="/" activeClassName="active-nav" className="nav-home">Home</NavLink></li>
          <li><NavLink to="/mail" className="nav-mail">Mail</NavLink></li>
          <li><NavLink to="/keep"className="nav-keep">Keep</NavLink></li>
        </ul>
        <button onClick={this.onMenuClick} className="btn-menu-toggle theme-color">☰</button>
      </React.Fragment>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
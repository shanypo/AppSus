const { NavLink, withRouter } = ReactRouterDOM

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
        {/* <nav className="app-header"> */}
        <div className="logo flex align-center">
          <img src="../../img/logo.jpg" />
        </div>
        <ul className="main-nav clean-list">
          <li><NavLink exact to="/" activeClassName="active-nav">Home</NavLink></li>
          <li><NavLink to="/mail">Mail</NavLink></li>
          <li><NavLink to="/keep">Keep</NavLink></li>
          {/* <li><button onClick={() => {
            this.props.history.push('/')
          }}>Back</button></li> */}
        </ul>
        {/* </nav> */}
        <button onClick={this.onMenuClick} className="btn-menu-toggle theme-color">☰</button>
      </React.Fragment>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
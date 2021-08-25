const { NavLink, withRouter } = ReactRouterDOM

// import { eventBusService } from '../services/event-bus-service.js'
class _AppHeader extends React.Component {

  render() {

    return (
      <nav className="app-header">
        <h1>AppSus</h1>
        <ul className="clean-list">
          <li><NavLink exact to="/" activeClassName="active-nav">Home</NavLink></li>
          <li><NavLink to="/mail">Mail</NavLink></li>
          <li><NavLink to="/keep">Keep</NavLink></li>
          <li><button onClick={() => {
            this.props.history.push('/')
          }}>Back</button></li>
        </ul>
      </nav>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
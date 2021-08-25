// id,from,subject,body,isRead: false,sentAt,to
const { Link } = ReactRouterDOM

import { LongTxt } from "./LongTxt.jsx";

export class MailPreview extends React.Component {
  state = {
    mail: null,
  }

  componentDidMount() {
    this.loadMail();
  }

  loadMail = () => {
    const { mail } = this.props;
    this.setState({ mail });
  }

  onCheck = (ev) => {
    ev.stopPropagation();
  }

  render() {
    const { mail } = this.state;
    if (!mail) return <div></div>
    const classRead = mail.isRead === true ? 'mail-readen' : '';
    return (
      <Link to={`/mail/${mail.id}`}>
      <article className={`mail-preview ${classRead}`}>
        <input type="checkbox" onClick={this.onCheck}></input>
        <p>{mail.from}</p>
        <LongTxt body={mail.body} />
        <p>{mail.sentAt}</p>
      </article>
      </Link>
    )

  }
}
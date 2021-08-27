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
      <Link to={mail.isDraft ? `/mail/compose/${mail.id}`:`/mail/details/${mail.id}`}>
      <article className={`mail-preview ${classRead} flex`}>
        <p>{mail.from}</p>
        <p>{mail.subject}</p>
        <LongTxt body={mail.body} />
        <p>{mail.sentAt}</p>
      </article>
      </Link>
    )

  }
}
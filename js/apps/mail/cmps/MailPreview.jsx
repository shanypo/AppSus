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

  render() {
    const { mail } = this.state;
    if (!mail) return <div></div>
    return (
      <Link to={`/mail/${mail.id}`} className="">
      <article className={'mail-preview'}>
        <input type="checkbox"></input>
        <p>{mail.from}</p>
        <LongTxt body={mail.body} />
        <p>{mail.sentAt}</p>
      </article>
      </Link>
    )

  }
}
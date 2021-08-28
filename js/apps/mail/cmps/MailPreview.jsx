// id,from,subject,body,isRead: false,sentAt,to
const { Link } = ReactRouterDOM

import { LongTxt } from "./LongTxt.jsx";

export function MailPreview({ mail, onToggelStar, onToggelRead}) {
  const classRead = mail.isRead === true ? 'mail-readen' : '';
  return (
    <React.Fragment>
      <article className={`mail-preview ${classRead} flex`}>
        <Link to={mail.isDraft ? `/mail/compose/${mail.id}` : `/mail/details/${mail.id}`}>
          <p>{mail.from}</p>
          <LongTxt subject={mail.subject} body={mail.body} />
          <p>{mail.sentAt}</p>
        </Link>
        <button onClick={() => onToggelRead(mail.id)}>
          <img className="mail-read" src={`./img/${mail.isRead ? 'drafts' : 'envalopeHome'}.svg`} />
        </button>
        <button onClick={() => onToggelStar(mail.id)}>
          <img className="mail-star" src={`./img/${mail.isStarred ? 'is-starred' : 'not-starred'}.svg`} />
        </button>
      </article>
    </React.Fragment>
  )
}
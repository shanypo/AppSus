// id,from,subject,body,isRead: false,sentAt,to
const { Link } = ReactRouterDOM

import { LongTxt } from "./LongTxt.jsx";

export function MailPreview({ mail, onToggelStar }) {
  const classRead = mail.isRead === true ? 'mail-readen' : '';
  return (
    <React.Fragment>
      <article className={`mail-preview ${classRead} flex`}>
    <Link to={mail.isDraft ? `/mail/compose/${mail.id}` : `/mail/details/${mail.id}`}>
        <p>{mail.from}</p>
        <p>{mail.subject}</p>
        <LongTxt body={mail.body} />
        <p>{mail.sentAt}</p>
    </Link>
    <button onClick={() => onToggelStar(mail.id)}>
    <img src="../../img/star.svg"/>
            {(mail.isStarred) ? <i className="is-star"></i> : <i className="not-star"></i>}
        </button>
      </article>
    </React.Fragment>
  )
}
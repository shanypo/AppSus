import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, criteria, onToggelStar}) {
    return (
        <div className="mail-list">
            {mails.map(mail => <MailPreview mail={mail} key={mail.id} criteria={criteria} onToggelStar={onToggelStar}/>)}
        </div>
    )
}
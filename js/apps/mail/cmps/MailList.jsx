import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails}) {
    return (
        <div className="mail-list">
            {mails.map(mail => <MailPreview mail={mail} key={mail.id}/>)}
        </div>
    )
}
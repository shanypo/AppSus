import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, criteria }) {
    return (
        <div className="mail-list">
            {mails.map(mail => <MailPreview mail={mail} key={mail.id} criteria={criteria}/>)}
        </div>
    )
}
import { storageService } from '../../../services/storage.service.js';
import { _makeId } from '../../../services/util.service.js';

export const mailService = {
    getEmails,
    getMailById,
    deleteMail,
    toggelRead,
    onRead,
    sendMail,
    query,
    saveDrafts,
    toggelStar
}

let gDummyMails = [
    {
        id: _makeId(),
        subject: 'Miss you',
        body: 'hello there darling would you like to come over for this vaction???',
        isRead: false,
        sentAt: new Date(1719811809934).toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        isTrash: false,
        isStarred: false,
        isDraft: false,
        to: 'user@appsus.com',
        from: 'looply@gmail.com'
    },
    {
        id: _makeId(),
        subject: 'AIG just for you',
        body: 'get your car insurance now in sale',
        isRead: true,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'user@appsus.com',
        from: 'looply@gmail.com',
        isTrash: false,
        isStarred: false,
        isDraft: false
    },
    {
        id: _makeId(),
        subject: 'Internet Connection Anywhere, Anytime',
        body: `hello dear students,
        I've published new FREE lesson in youtube - https://www.youtube.com/watch?v=pcMw7ED60WE
        The lesson is about operators in Java with live code examples. You are going to learn a lot of interesting about operators in Java and how to work with them. I'm sure you will love it! :)
        I would appreciate your likes and comments to the video. And do not forget to subscribe to the channel to not miss other lessons :) 
        Regards,
        Andrey`,
        isRead: false,
        sentAt: new Date(1619211809934).toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'user@appsus.com',
        from: 'tranmin@gmail.com',
        isTrash: false,
        isStarred: false,
        isDraft: false
    },
    {
        id: _makeId(),
        subject: 'תו ירוק-סטודיו פוזיטיב',
        body: `מתאמנים/ות יקרים/ות,
        עקב העלייה הניכרת בתחלואה הנחיות התו הירוק חזרו.
        לכן לפני כניסה לאימון תתבקשו להציג את התו הירוק- תקפידו להכין אותו לפני כדי שזה לא יעכב אתכם/ן בכניסה.
        בנוסף הקפידו על הטיית מסיכה על הפנים לפני הכניסה לאימונים וברחבת ההמתנה
        עזרו לנו לשמור על פעילות הסטודיו.
        תודה הנהלת סטודיו פוזיטיב.`,
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'user@appsus.com',
        from: 'contact@tazman.co.il',
        isTrash: false,
        isStarred: true,
        isDraft: false
    },
    {
        id: _makeId(),
        subject: 'code review',
        body: 'מצ"ב cr מתוקן',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'shanypo@gmail.com',
        from: 'user@appsus.com',
        isTrash: false,
        isStarred: false,
        isDraft: false
    },
    {
        id: _makeId(),
        subject: 'Broadway Show!!',
        body: 'We are welcoming you to celebrate out 60 anniversary here in New-York!!',
        isRead: true,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'shiriMaymon@gmail.com',
        from:'user@appsus.com',
        isTrash: false,
        isStarred: false,
        isDraft: false
    },
    {
        id: _makeId(),
        subject: 'working together',
        body: 'hello there',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'user@appsus.com',
        from: 'shany@gmail.com',
        isTrash: false,
        isStarred: false,
        isDraft: false
    },
    {
        id: _makeId(),
        subject: 'Spotify',
        body: 'Playlists made just for you',
        isRead: false,
        sentAt: new Date(1519211809934).toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'user@appsus.com',
        from: 'no-reply@spotify.com',
        isTrash: false,
        isStarred: true,
        isDraft: false
    },
]

const KEY = 'mailDB';
let gMails = _loadFromStorage() || gDummyMails;

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'hanna montana'
}

function query(criteria) {
    // if (!criteria) return Promise.resolve(gMails);
    let mailToDisplay = _getMailsByFolder(criteria);
    mailToDisplay = _getTypeDysplay(mailToDisplay, criteria);
    mailToDisplay = _sortMails(mailToDisplay, criteria.sortBy)
    _saveMails();
    return Promise.resolve(mailToDisplay);
}

function toggelRead(mailId) {
    getMailById(mailId)
        .then(mail => {
            mail.isRead = !mail.isRead;
        })
    _saveMails();
}

function getEmails() {
    _saveMails();
    return Promise.resolve(gMails);
}

function sendMail(newMail, isDraft = false) {
    const mail = {
        id: _makeId(),
        to: newMail.to,
        from: loggedinUser.email,
        subject: newMail.subject ? newMail.subject : 'No subject',
        body: newMail.body ? newMail.body : 'No Messege',
        isRead: true,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        isTrash: false,
        isStarred: false,
        isDraft
    }

    if (isDraft) {
        gMails.push(mail);
        _saveMails();
        return Promise.resolve(mail.id);
    }
    mail.isDraft = false;
    gMails.push(mail);
    _saveMails();
}

function saveDrafts(mailData, mailId) {
    const idx = _getMailId(mailId);
    if (mailData.to) gMails[idx].to = mailData.to;
    if (mailData.subject) gMails[idx].subject = mailData.subject;
    if (mailData.body) gMails[idx].body = mailData.body;
    _saveMails();
}

function getMailById(mailId) {
    var mail = gMails.find(function (mail) {
        return mailId === mail.id;
    })
    return Promise.resolve(mail);
}

function _getMailId(mailId) {
    var mailIdx = gMails.findIndex(function (mail) {
        return mailId === mail.id
    })
    return mailIdx
}

function deleteMail(mailId) {
    var mailIdx = gMails.findIndex(function (mail) {
        return mailId === mail.id
    })
    gMails.splice(mailIdx, 1)
    return Promise.resolve()
}

function onRead(mailId) {
    getMailById(mailId)
        .then(mail => {
            mail.isRead = true;
        })
    _saveMails();
}

function toggelStar(mailId) {
    getMailById(mailId)
        .then(mail => {
            mail.isStarred = !mail.isStarred;
        })
    _saveMails();
}
/****************************storage****************************************/

function _saveMails() {
    storageService.saveToStorage(KEY, gMails);
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY);
}

/***************************get mail display************************/

function _getTypeDysplay(mailToDisplay, criteria) {
    let { txt, display } = criteria;
    const mails = mailToDisplay.filter(mail => {
        return display === 'read' ? mail.isRead : display === 'unread' ? !mail.isRead : mail.isRead &&
            mail.body.includes(txt) || mail.subject.includes(txt) || mail.to.includes(txt)
    });
    return mails;
}

function _getMailsByFolder(criteria) {
    let mails = gMails.filter(mail => {
        switch (criteria.status) {
            case 'inbox':
                return mail.to === loggedinUser.email && !mail.isTrash;
            case 'sent':
                return mail.from === loggedinUser.email && !mail.isDraft;
            case 'starred':
                return mail.isStarred;
            case 'trash':
                return mail.isTrash;
            case 'drafts':
                return mail.isDraft;
        }
    });
    return mails;
}

function _sortMails(mails, sortBy) {
    if (sortBy === 'title') {
        mails.sort((mailFirst, mailSecond) => {
            return mailFirst.subject.charAt(0) < mailSecond.subject.charAt(0) ? -1 : 1
        })
    } else {
        mails.sort((mailFirst, mailSecond) => {
            mailFirst.sentAt - mailSecond.sentAt;
        })
    }
    return mails;
}
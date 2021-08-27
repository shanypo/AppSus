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
    saveDrafts
}

let gDummyMails = [
    {
        id: _makeId(),
        from: 'Google',
        subject: 'Miss you',
        body: 'hello there',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        isTrash: false,
        isStarred: false,
        isDraft: false,
        to: 'user@appsus.com',
        from: 'looply@gmail.com'
    },
    {
        id: _makeId(),
        from: 'Google',
        subject: 'AIG just for you',
        body: 'get your car insurance',
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
        from: 'Google',
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
]

const KEY = 'mailDB';
let gMails = _loadFromStorage() || gDummyMails;

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'hanna montana'
}

function query(criteria) {
    if (!criteria) return Promise.resolve(gMails);
    let mailToDisplay = _getMailsByFolder(criteria)
    mailToDisplay = _getTypeDysplay(mailToDisplay, criteria);
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

function sendMail(newMail, isDraft = false, draftCreated = false) {
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
        _saveMails();
        return Promise.resolve(mail.id);
    }

    mail.isDraft = false;
    gMails.push(mail);
    _saveMails();
}

function saveDrafts(mailData, mailId) {
    const idx = getMailById(mailId);
    if (mailData.to) gMails[idx].to = mailData.to;
    if (mailData.subject) gMails[idx].subject = mailData.subject;
    if (mailData.body) gMails[idx].body = mailData.body;
    _saveMailsToStorage();
}

function getMailById(mailId) {
    var mail = gMails.find(function (mail) {
        return mailId === mail.id;
    })
    return Promise.resolve(mail);
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
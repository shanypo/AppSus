import { storageService } from '../../../services/storage.service.js';
import { _makeId } from '../../../services/util.service.js';

export const mailService = {
    getEmails,
    getMailById,
    deleteMail,
    toggelRead,
    onRead,
    sendMail,
    query
}

let gDummyMails = [
    {
        id: _makeId(),
        from: 'Google',
        subject: 'Miss you',
        body: 'hello there',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
    },
    {
        id: _makeId(),
        from: 'Google',
        subject: 'AIG just for you',
        body: 'get your car insurance',
        isRead: true,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'shanypo@gmail.com'
    },
    {
        id: _makeId(),
        from: 'Google',
        subject: 'working together',
        body: 'hello there',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'shanypo@gmail.com'
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
    const { status, txt, labels, isStarred} = criteria;
    let mailToDisplay = _getTypeDysplay(status);
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

function sendMail(newMail) {
    newMail.id = _makeId();
    newMail.from = loggedinUser.email;
    newMail.isRead = false;
    newMail.sentAt = new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate();
    gMails.push(newMail);
    console.log(gMails);
    _saveMails();
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

/***************************get type display************************/

function _getTypeDysplay(type) {
    switch (type) {
        case 'all':
            return gMails;
        case 'read':
            return gMails.filter(mail => {
                return mail.isRead
            });
        case 'unread':
            return gMails.filter(mail => {
                return !mail.isRead
            });
        case 'txt':
            return gMails.filter(mail => {
                return !mail.isRead
            });
    }

}
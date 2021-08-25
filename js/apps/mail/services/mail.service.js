import { storageService } from '../../../services/storage.service.js';

export const mailService = {
    getEmails,
    getMailById,
    deleteMail,
    toggelRead,
    onRead
}

let gMails;
let gDummyMails = [
    {
        id: 'e101',
        from: 'Google',
        subject: 'Miss you',
        body: 'hello there',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
    },
    {
        id: 'e102',
        from: 'Google',
        subject: 'AIG just for you',
        body: 'get your car insurance',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'shanypo@gmail.com'
    },
    {
        id: 'e103',
        from: 'Google',
        subject: 'working together',
        body: 'hello there',
        isRead: false,
        sentAt: new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
        to: 'shanypo@gmail.com'
    },
]
const KEY = 'mailDB';

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'hanna montana'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: false,
    // (optional property, if missing: show all)
    isStared: false, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function onRead(mailId){
    console.log(mailId);
    getMailById(mailId)
    .then(mail => {
        mail.isRead = true;
    })
    console.log(gMails);
    saveMails();
}

function toggelRead(mailId) {
    getMailById(mailId)
    .then(mail => {
        mail.isRead = !mail.isRead;
    })
    saveMails();
}

function saveMails() {
    storageService.saveToStorage(KEY, gMails);
}

function getEmails() {
    const storageMails = _loadFromStorage();
    gMails = storageMails ? storageMails : gDummyMails;
    saveMails();
    return Promise.resolve(gMails);
}

function getMailById(mailId) {
    gMails = _loadFromStorage();
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

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY);
}

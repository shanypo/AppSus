
export const mailService = {
    getEmails,
    getMailById,
    deleteMail,
    getCriteria
}

const gMails = [
    {
    id: 'e101',
    from:'Google',
    subject: 'Miss you',
    body: 'hello there',
    isRead: false,
    sentAt : new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
},
{
    id: 'e102',
    from:'Google',
    subject: 'AIG just for you',
    body: 'get your car insurance',
    isRead: false,
    sentAt : new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
    to: 'shanypo@gmail.com'
},
{
    id: 'e103',
    from:'Google',
    subject: 'working together',
    body: 'hello there',
    isRead: false,
    sentAt : new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getDate(),
    to: 'shanypo@gmail.com'
},
]

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

function getCriteria() {
    return Promise.resolve(criteria);

}

// function query(criteria) {
//     if (criteria) {
//         const {status, txt, isRead, isStared, lables} = criteria;
        
//     }
// }

function getEmails(){
    return Promise.resolve(gMails);
}

function getMailById(mailId){
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

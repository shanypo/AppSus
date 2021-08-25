
export const mailService = {
    getEmails,
    getMailById
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
    isRead: true,
    // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
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

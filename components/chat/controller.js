const use = require('./network')
const storage = require('./storage')

function addChat(users){
    return new Promise((resolve,reject)=>{
        if (!users || !Array.isArray(users)){
            return reject('Los datos son incorrectos.' + users[0])
        }
        const fullChat = {
            users: users
        }
        console.log(users)
        storage.add(fullChat)
        return resolve(fullChat)
    })
}

function getChat(userId){
    return storage.list(userId)
}

module.exports = {
    addChat,
    getChat
}
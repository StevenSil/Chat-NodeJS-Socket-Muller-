const use = require('./network')
const storage = require('./storage')
const config = require('../../config')
const socket = require('../../socket').socket
function addMessage(chat, user, message, file){
    return new Promise((resolve,reject)=>{
        if (!chat || !user || !message){
            console.error('[Message Controller] No hay usuario o mensaje.'+ chat + '  ' + user + '   '+ message + '  ' + file.filename)
            return reject('Los datos son incorrectos.')
        }
        let fileURL = ''
        if (file){
            fileURL = config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/' + file.filename
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileURL
        }
        storage.add(fullMessage)
        socket.io.emit('message',fullMessage)
        return resolve(fullMessage)
    })
}

function getMessages(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(storage.list(filterUser))
    })
}

function updateMessage(id, message){
    return new Promise(async (resolve, reject)=>{
        if (!id || !message) {
            return reject('Data inválida')
        }
        const result = await storage.update(id, message)
        return resolve(result)
    })
}

function deleteMessage(id, message){
    return new Promise(async (resolve, reject)=>{
        if (!id) {
            return reject('ID inválido')
        }
        const result = await storage.delete(id)
        return resolve(result)
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}
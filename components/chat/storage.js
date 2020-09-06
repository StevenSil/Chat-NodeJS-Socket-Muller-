const db = require('mongoose')
const Model = require('./model')

function addChat(chat){
    const myChat = new Model(chat)
    myChat.save()
}

function getChat(userId){
    return new Promise((resolve,reject)=>{
        let filter = {}
        if(userId){
            filter = {users: userId}
        }
        Model.find(filter)
            .populate('users')
            .exec((error, populated) => {
                if(error){
                    return reject(error)
                }
                resolve(populated)
            })
    }) 
}

module.exports = {
    add: addChat,
    list: getChat
}
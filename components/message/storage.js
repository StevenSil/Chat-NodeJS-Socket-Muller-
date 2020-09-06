const db = require('mongoose')
const Model = require('./model')

function addMessage(message){
    const myMessage = new Model(message)
    myMessage.save()
}

function getMessages(filterUser){
    return new Promise((resolve,reject)=>{
        let filter = {}
        if(filterUser != null){
            filter = {user: filterUser}
        }
        Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if(error){
                    return reject(error)
                }
                resolve(populated)
            })
    }) 
}

async function updateMessage(id, message){
    const foundMessage = await Model.findOne({_id: id})
    foundMessage.message = message
    const newMessage = foundMessage.save()
    return newMessage
}

async function deleteMessage(id){
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage
}
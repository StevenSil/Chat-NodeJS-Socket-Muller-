const db = require('mongoose')
const Model = require('./model')

function addUser(user){
    const myUser = new Model(user)
    myUser.save()
}

async function getUser(filterUser){
    let filter = {}
    if(filterUser != null){
        filter = {user: filterUser}
    }
    const user = await Model.find(filter)
    return user
}

async function updateUser(id, name, lastname){
    const foundUser = await Model.findOne({_id: id})
    foundUser.name = name
    foundUser.lastname = lastname
    const newUser = foundUser.save()
    return newUser
}

async function deleteUser(id){
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addUser,
    list: getUser,
    update: updateUser,
    delete: deleteUser
}
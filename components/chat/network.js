const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/:userId', function(req, res){
    controller.getChat(req.params.userId)
    .then((data)=>{
        response.success(req,res, data, 200)
    })
    .catch((error)=>{
        response.error(req, res, '[Error chat]', 500, error)
    })
})

router.post('/', function(req, res){
    let origen = req.body.origen
    let destino = req.body.destino
    const users = [origen, destino]
    controller.addChat(users)
        .then((data)=>{
            response.success(req, res, data, 201)
        })
        .catch((error) =>{
            response.error(req, res, '[Error chat]',500, error)
        })
})

module.exports = router
'use strict'

const services = require('../services')
const firebase = require('../db/firebase')

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]

  services.decodeToken(token)
    .then(response => {
      firebase.VerificarEmail(response).then((result) => {
        if (!result) return res.status(401).send({ message: 'El usuario ya no existe' })
        req.user = response;
        next()
      })
      
    })
    .catch(response => {
      res.status(response.status)
    })
}
function isAdmin(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]

  services.decodeToken(token)
    .then(response => {
      firebase.VerificarEmail(response).then((result) => {
        if (!result) return res.status(401).send({ message: 'El usuario ya no existe' })
        if(result.role!="admin")return res.status(403).send({ message: 'No tienes autorización' })
        req.user = response;        
        next()
      })
      
    })
    .catch(response => {
      res.status(response.status)
    })
}


module.exports = {
  isAuth,
  isAdmin
}
'use strict'

const User = require('../models/user')
const firebase = require('../db/firebase')
const service = require('../services')



async function signUp(req, res) {
  if (!req.body.email || !req.body.name || !req.body.lastname || !req.body.email || !req.body.password) return res.status(400).send({ message: 'Se requieren todos los datos' })
  const typeAccount = await firebase.VerificarUsers() ? 'user' : 'admin';  
  const user = User(req.body.name, req.body.lastname, req.body.email, req.body.password, typeAccount)
  const emailCheck = await firebase.VerificarEmail(user.email);
  if (emailCheck) return res.status(500).send({ message: `Error al crear el usuario: El correo ya esta registrado` })
  firebase.db.ref('users').push(user)
  return res.status(201).send({ token: service.createToken(user), typeAccount })

}
function signIn(req, res) {
  if (!req.body.email) return res.status(400).send({ message: 'Se requieren las credenciales de inicio' })
  firebase.VerificarEmail(req.body.email).then(function (user) {
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })
    if (user.password != req.body.password) return res.status(401).send({ message: 'Contraseña incorrecta' })
    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })

}


module.exports = {
  signUp,
  signIn
}

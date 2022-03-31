'use strict'

const express = require('express')

const userCtrl = require('../controllers/user')
const productCtrl = require('../controllers/producto')
const orderCtrl=require('../controllers/orden')
const auth = require('../middlewares/auth')
const api = express.Router()

//Users
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

//Productos
api.post('/product', auth.isAdmin, productCtrl.Create)
api.get('/product/:key', productCtrl.Get)
api.get('/product/n/:name', productCtrl.GetByName)
api.delete('/product/:key',auth.isAdmin, productCtrl.Delete)
api.put('/product/:key',auth.isAdmin, productCtrl.Edit)

//ordenes
api.get('/order',auth.isAuth, orderCtrl.List)
api.get('/order/:key',auth.isAuth, orderCtrl.Get)
api.post('/order',auth.isAuth, orderCtrl.Create)
api.delete('/order/:key',auth.isAdmin, orderCtrl.Delete)



api.get('/user', auth.isAdmin,function (req, res) { res.send([req.user]) });

module.exports = api
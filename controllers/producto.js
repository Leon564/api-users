const Producto = require('../models/producto')
const firebase = require('../db/firebase')
var utils = require('leonn-utils');

function GetByName(req, res) {
    const name = req.params.find;
    const ref = firebase.db.ref('products');
    ref.orderByChild('name').startAt(name).endAt(name + "\uf8ff").limitToLast(30).once('value', async (snapshot) => {
        return res.status(201).send(await utils.snapshotToArray(snapshot))
    });
}
function Get(req, res) {
    const key = req.params.key;
    const ref = firebase.db.ref('products');
    ref.orderByKey().equalTo(key).once('value', async (snapshot) => {
        return res.status(201).send(await utils.snapshotToArray(snapshot))
    });
}

function Create(req, res) {    
    const producto = Producto(req.body.name, req.body.description, req.body.photo, req.body.price)
    Object.keys(producto).forEach((key) => (producto[key] == null) && delete producto[key]);
    if (!producto.name || !producto.description || !producto.photo || !producto.price) return res.status(400).send({ message: 'Se requieren todos los datos' })
    firebase.db.ref(`products`).push(producto).then((result) => {
        return res.status(201).send({ message: "El producto se registro correctamente, key: " + result.key })
    }).catch((err) => {
        return res.status(500).send({ message: err })
    });

}

function Delete(req, res) {
    firebase.db.ref(`products/${req.params.key}`).remove().then(() => {
        return res.status(201).send({ message: "El producto se elimino correctamente" })
    }).catch((err) => {
        return res.status(500).send({ message: err })
    });

}

function Edit(req, res) {
    console.log('actualizando')
    const key=req.params.key;
    const producto = Producto(req.body.name, req.body.description, req.body.photo, req.body.price)
    Object.keys(producto).forEach((key) => (producto[key] == null) && delete producto[key]);
    firebase.db.ref(`products/${key}`).update(producto).then(() => {
        return res.status(201).send({ message: "El producto se actualizo correctamente" })
    }).catch((err) => {
        return res.status(500).send({ message: err })
    });
}

module.exports = {
    Get,
    Create,
    Edit,
    Delete,
    GetByName
}
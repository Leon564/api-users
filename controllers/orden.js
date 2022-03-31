const Orden = require('../models/order')
const firebase = require('../db/firebase')
var utils = require('leonn-utils');


function List(req, res) {
    firebase.VerificarEmail(req.user).then((result) => {
        const ref = firebase.db.ref('orders');
        if (result.role == "admin") {
            ref.orderByKey().once('value', async (snapshot) => {
                return res.status(201).send(await utils.snapshotToArray(snapshot))
            });
        } else {
            ref.orderByChild('cliente').equalTo(req.user).once('value', async (snapshot) => {
                return res.status(201).send(await utils.snapshotToArray(snapshot))
            });
        }

    })
}
function Get(req, res) {
    firebase.VerificarEmail(req.user).then((result) => {          
        const ref = firebase.db.ref('orders');
        if (result.role == "admin") {
            ref.orderByKey().equalTo(req.params.key).once('value', async (snapshot) => {
                const result=(await utils.snapshotToArray(snapshot));
                return res.status(201).send(result[0])
            });
        } else {
            ref.orderByKey().equalTo(req.params.key).once('value', async (snapshot) => {
                const result = await utils.snapshotToArray(snapshot);                
                if (result[0].cliente === req.user) return res.status(201).send(result[0])
                return res.status(403).send({ message:'La orden no existe o no pertenece a este usuario' })
                   
            });
        }

    })
}
function Create(req, res) {
    if (!Array.isArray(req.body.products)) return res.status(500).send({ message: `Error al crear la orden, el formato de los productos no es el correcto` })
    firebase.VerificarProductos(req.body.products).then((products) => {
        const orden = Orden(products, req.user, "pendiente");
        firebase.db.ref(`orders`).push(orden).then((result) => {
            return res.status(201).send({ message: "La orden se registro correctamente, key: " + result.key })
        }).catch((err) => {
            return res.status(500).send({ message: err })
        });
    })
}

function Delete(req, res) {
    firebase.db.ref(`orders/${req.params.key}`).remove().then(() => {
        return res.status(201).send({ message: "la orden se elimino correctamente" })
    }).catch((err) => {
        return res.status(500).send({ message: err })
    });
}

module.exports = {
    List,
    Get,
    Create,
    Delete
}
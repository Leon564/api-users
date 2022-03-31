const _order = {
    "productos": null,
    "cliente": null,
    "estado": null
}

const order = (productos, cliente, estado) => {
    _order.productos=productos;
    _order.cliente=cliente;
    _order.estado=estado;

    return _order;
}

module.exports = order;
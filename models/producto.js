const _producto = {
    "name": null,
    "description": null,
    "photo": null,
    "price": null
}

const producto = (name, description, photo, price) => {
    _producto.name = name;
    _producto.description = description;
    _producto.photo = photo;
    _producto.price = price;

    return _producto;
}

module.exports = producto;
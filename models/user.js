const _user = {
    "name": null,
    "lastname": null,
    "email": null,
    "password": null,
    "role": "user"
}

const user = (name, lastname, email, password, role) => {
    _user.name = name;
    _user.lastname = lastname;
    _user.email = email;
    _user.password = password;
    _user.role = role;

    return _user;
}

module.exports = user;
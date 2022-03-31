const admin = require("firebase-admin");
var utils = require("leonn-utils");
const config = require("../config");
//var serviceAccount = require("./api-users-86678-firebase-adminsdk-jjep8-466b6a016f");
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(config.db_credentials)),
  databaseURL: config.db,
});

const db = admin.database();

const VerificarEmail = (email) => {
  const eventref = db.ref("users");
  return eventref
    .orderByChild("email")
    .equalTo(email)
    .limitToFirst(1)
    .once("value")
    .then(async (snapshot) => {
      const user = await utils.snapshotToArray(snapshot);
      return user.length > 0 ? user[0] : null;
    });
};
const VerificarUsers = async () => {
  const eventref = db.ref(`users`);
  const snapshot = await eventref.orderByKey().once("value");
  const users = await utils.snapshotToArray(snapshot);
  return users.length > 0;
};
const VerificarProductos = async (keys) => {
  const products = [];
  console.log(keys);
  for (const key of keys) {
    const eventref = db.ref(`products`);
    const snapshot = await eventref.orderByKey().equalTo(key).once("value");
    const product = await utils.snapshotToArray(snapshot);
    products.push(product[0]);
  }
  return products.length > 0 ? products : null;
};

module.exports = {
  db,
  VerificarEmail,
  VerificarProductos,
  VerificarUsers,
};

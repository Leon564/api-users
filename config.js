require("dotenv").config();
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.db_url,
  db_credentials: process.env.db_credentials,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
};

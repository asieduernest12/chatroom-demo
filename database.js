const nano = require('nano')(process.env.DATABASE_URL);

module.exports = nano;

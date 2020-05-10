const lowDb = require('lowdb');
const fileSync = require("lowdb/adapters/FileSync");
const adapters = new fileSync('db.json');
const db = lowDb(adapters);

module.exports = db;
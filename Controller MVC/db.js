const lowdb = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapters = new fileSync('db.json');
const db = lowdb(adapters);

module.exports = db;
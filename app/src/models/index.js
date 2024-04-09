const database = require("../config/database");
const Sequelize = require("sequelize");
const Room = require("./room");
const Room_Partner = require('./room_partner');
const Chat = require("./chat");
const User = require("./user");
const Recording = require("./recording");

const sequelize = database;
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.room = Room(sequelize, Sequelize);
db.room_partner = Room_Partner(sequelize, Sequelize);
db.chat = Chat(sequelize, Sequelize);
db.user = User(sequelize, Sequelize);
db.recording = Recording(sequelize, Sequelize);

module.exports = db;

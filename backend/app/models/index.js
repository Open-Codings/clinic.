const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_URL;
db.users = require("./user.model")(mongoose);
db.medicines = require("./medicine.model")(mongoose);
db.patients = require("./patient.model")(mongoose);
db.checks = require("./check.model")(mongoose);
db.medApps = require("./med_app.model")(mongoose);

module.exports = db;

const bcrypt = require("bcryptjs");

const db = require("../models");
const Patient = db.patients;
const User = db.users;
const Check = db.checks;
const MedApp = db.medApps;

const genHashedPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const patientExist = async (name) => {
  const exist = await Patient.findOne({ name });
  if (exist) return true;

  return false;
};

const makeId = (length) => {
  let result = "";
  let characters = "abcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.findAll = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send({
      msg: "[successed] data found",
      data: patients,
      total: patients.length,
    });
  } catch (err) {
    res.status(404).send({
      msg: "[failed] data not found",
    });
  }
};

exports.create = async (req, res) => {
  let {
    code,
    preserveDate,
    name,
    gender,
    placeBirth,
    dateBirth,
    phone,
    address,
    city,
  } = req.body;

  if (!preserveDate) {
    preserveDate = new Date().toJSON();
  }

  if (await patientExist(name))
    return res.status(400).send({ msg: "[failed] name already exists" });

  const patient = Patient({
    code,
    preserveDate,
    name,
    gender,
    placeBirth,
    dateBirth,
    phone,
    address,
    city,
  });

  const username = name.split(" ")[0];
  const email = `${username.toLowerCase()}@clinic.org`;
  const password = makeId(4);
  const passwordHashed = await genHashedPass(password);

  const user = User({
    username,
    role: 4,
    name,
    email,
    password: passwordHashed,
  });

  try {
    const saved = await patient.save(patient);
    await user.save(user);
    res.status(200).send({
      msg: "[successed] data saved",
      data: [
        saved,
        {
          email,
          password,
        },
      ],
    });
  } catch (err) {
    res.status(409).send({
      msg:
        err.message ||
        "[failed] something went wrong while creating storing the data",
    });
  }
};

exports.find = async (req, res) => {
  try {
    const patients = await Patient.find({
      name: { $regex: req.body.name, $options: "i" },
    });
    res.status(200).send({
      msg: "[successed] data found",
      data: patients,
      total: patients.length,
    });
  } catch (err) {
    res.status(404).send({
      msg: "[failed] data not found",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      res.status(404).send({
        msg: "[failed] data not found",
      });
    }

    res.status(200).send({
      msg: "[successed] data updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).send({
      msg: "[failed] " + err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndRemove(req.params.id);
    const name = deleted.name.split(" ")[0];
    const email = `${name.toLowerCase()}@clinic.org`;
    await User.findOneAndDelete({ email });
    await Check.findOneAndDelete({ patient: req.params.id });
    await MedApp.findOneAndDelete({ patient: req.params.id });
    if (!deleted) {
      res.status(404).send({
        msg: "[failed] data not found",
      });
    }

    res.status(200).send({
      msg: "[successed] data deleted",
      data: deleted,
    });
  } catch (err) {
    res.status(500).send({
      msg: "[failed] " + err,
    });
  }
};

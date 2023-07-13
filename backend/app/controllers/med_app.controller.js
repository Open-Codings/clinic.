const db = require("../models");
const MedApp = db.medApps;

exports.create = async (req, res) => {
  let { medicine, description, patient } = req.body;

  const medApp = MedApp({
    medicine,
    description,
    patient,
  });

  try {
    const saved = await medApp.save(medApp);
    res.status(200).send({
      msg: "[successed] data saved",
      data: saved,
    });
  } catch (err) {
    res.status(409).send({
      msg:
        err.message ||
        "[failed] something went wrong while creating storing the data",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const medApps = await MedApp.find().populate("medicine");
    res.status(200).send({
      msg: "[successed] data found",
      data: medApps,
    });
  } catch (err) {
    res.status(404).send({
      msg: "[failed] data not found",
    });
  }
};

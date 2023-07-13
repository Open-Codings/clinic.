const db = require("../models");
const Check = db.checks;

exports.create = async (req, res) => {
  let { temperature, weight, complaint, patient } = req.body;

  const check = Check({
    temperature,
    weight,
    complaint,
    patient,
  });

  try {
    const saved = await check.save(check);
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
    const checks = await Check.find();
    res.status(200).send({
      msg: "[successed] data found",
      data: checks,
    });
  } catch (err) {
    res.status(404).send({
      msg: "[failed] data not found",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Check.findByIdAndUpdate(req.params.id, req.body);
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
    const deleted = await Check.findByIdAndRemove(req.params.id);
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

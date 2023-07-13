const db = require("../models");
const Medicine = db.medicines;

const medicineExist = async (name) => {
  const exist = await Medicine.findOne({ name });
  if (exist) return true;

  return false;
};

exports.findAll = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).send({
      msg: "[successed] data found",
      data: medicines,
      total: medicines.length,
    });
  } catch (err) {
    res.status(404).send({
      msg: "[failed] data not found",
    });
  }
};

exports.create = async (req, res) => {
  let { code, name, stock, price, unit, expireDate } = req.body;

  if (await medicineExist(name))
    return res.status(400).send({ msg: "[failed] name already exists" });

  if (!expireDate) {
    expireDate = new Date().toJSON();
  }

  const medicine = Medicine({
    code,
    name,
    stock,
    price,
    unit,
    expireDate,
  });

  try {
    const saved = await medicine.save(medicine);
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

exports.find = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      name: { $regex: req.body.name, $options: "i" },
    });
    res.status(200).send({
      msg: "[successed] data found",
      data: medicines,
      total: medicines.length,
    });
  } catch (err) {
    res.status(404).send({
      msg: "[failed] data not found",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body);
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
    const deleted = await Medicine.findByIdAndRemove(req.params.id);
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

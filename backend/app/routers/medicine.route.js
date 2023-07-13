module.exports = (app) => {
  const medicines = require("../controllers/medicine.controller");
  const router = require("express").Router();

  router.get("/", medicines.findAll);

  router.post("/", medicines.create);
  router.post("/find", medicines.find);

  router.put("/:id", medicines.update);

  router.delete("/:id", medicines.delete);

  app.use("/api/medicines", router);
};

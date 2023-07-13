module.exports = (app) => {
  const patients = require("../controllers/patient.controller");
  const router = require("express").Router();

  router.get("/", patients.findAll);

  router.post("/", patients.create);
  router.post("/find", patients.find);

  router.put("/:id", patients.update);

  router.delete("/:id", patients.delete);

  app.use("/api/patients", router);
};

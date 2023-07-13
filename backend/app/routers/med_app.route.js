module.exports = (app) => {
  const medApps = require("../controllers/med_app.controller");
  const router = require("express").Router();

  router.get("/", medApps.findAll);

  router.post("/", medApps.create);

  app.use("/api/medApps", router);
};

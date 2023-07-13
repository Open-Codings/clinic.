module.exports = (app) => {
  const checks = require("../controllers/check.controller");
  const router = require("express").Router();

  router.get("/", checks.findAll);

  router.post("/", checks.create);
  // router.post("/find", checks.find);

  router.put("/:id", checks.update);

  router.delete("/:id", checks.delete);

  app.use("/api/checks", router);
};

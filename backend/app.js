const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("cannot connect to database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    msg: "express template",
  });
});

require("./app/routers/user.route")(app);
require("./app/routers/medicine.route")(app);
require("./app/routers/patient.route")(app);
require("./app/routers/check.route")(app);
require("./app/routers/med_app.route")(app);

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

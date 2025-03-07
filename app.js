const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const customerRoutes = require("./src/routes/customerRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/customers", customerRoutes);

module.exports = app;
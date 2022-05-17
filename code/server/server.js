"use strict";
// import './modules/DB'
// import DB from './modules/DB';
const morgan = require("morgan");
const express = require("express");
// init express
const app = new express();
app.use(morgan("dev"));
const port = 3001;

app.use(express.json());
// const db=new DB;

const internalOrder = require("./modules/routers/InternalOrder");
const restockOrder = require("./modules/routers/RestockOrder");
const testDescriptors = require("./modules/routers/TestDescriptor");
const SKU = require("./modules/SKU");
const SKU_item = require("./modules/SKU_item");
const item = require("./modules/item");
const test_result = require("./modules/testResult");
const returnOrder = require("./modules/ReturnOrder");
const position = require("./modules/Position");

app.use("/api", internalOrder);
app.use("/api", restockOrder);
app.use("/api", testDescriptors);
app.use("/api", SKU);
app.use("/api", SKU_item);
app.use("/api", item);
app.use("/api", test_result);
app.use("/api", returnOrder);
app.use("/api", position);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;

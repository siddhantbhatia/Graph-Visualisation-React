var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors());

const dataSource = require("./model/data");

app.get("/getData", function (req, res) {
  res.json(dataSource.data);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

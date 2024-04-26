const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const port = 3001;

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

// log to console
// app.use(morgan("tiny"));

// log to file
// app.use(morgan("combined", { stream: accessLogStream }));

// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.get("/", (req, res) => {
  res.send("Hello, Morgan");
});

app.listen(port, () => {
  console.log(`🚀 on port ${port}`);
});

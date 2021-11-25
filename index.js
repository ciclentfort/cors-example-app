const cors = require("cors");
const express = require("express");
const path = require("path");

var app = express();
app.use(cors({ origin: "http://localhost:1337", credentials: true }));

app.get("/login", (req, res) => {
  res.cookie("token", "token");
  res.end();
});

app.get("/logout", (req, res) => {
  res.cookie("token", "token", { maxAge: 0 });
  res.end();
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/private", (req, res, next) => {
  if ((req.header("cookie") || "").indexOf("token=token") >= 0) {
    next();
  } else {
    res.status(404);
    res.end();
  }
});
app.use("/private", express.static(path.join(__dirname, "private")));

app.listen(31337, () => {
  console.log("server is listening on port 31337");
});

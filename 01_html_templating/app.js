const express = require("express");
const ejs = require("ejs");
const path = require("path");
const redditData = require("./data.json");

// Initialising Express
const app = express();

// View Engine
app.set("view engine", "ejs"); // by default express looks in views folder.
// blow line is recommended
app.set("views", path.join(__dirname, "views"));

// serving static files
// app.use(express.static("public")); // this would work but below is recommended
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rand", (req, res) => {
  // for if else statements
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  res.render("random", { rand: randomNumber });
});

app.get("/r/:subredit", (req, res) => {
  const { subredit } = req.params;
  const data = redditData[subredit];
  if (data) {
    res.render("subredit", { ...data });
  } else {
    res.render("notfound", { subredit });
  }
});

app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Winston", "Catty"];
  res.render("cats", { cats });
});

// Server
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on on port ${port} ...`);
});

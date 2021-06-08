const express = require("express");
const ejs = require("ejs"); // this line is not required
const path = require("path");
const { v4: uuid } = require("uuid");
const methdOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methdOverride("_method"));

// to read data from the user input

// This line will read data from the form
app.use(express.urlencoded({ extended: true }));

// This will read data from JSON payloads
app.use(express.json());

let comments = [
  {
    userName: "Todd",
    comment: "LOL that is so funny",
    id: uuid(),
  },
  {
    userName: "Nodd",
    comment: "Some other comment",
    id: uuid(),
  },
];

// Read  -  all comments
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// Creare  -  a new comment
app.get("/comments/new", (req, res) => {
  res.render("comments/newComment");
});

// Writing (create)
app.post("/comments", (req, res) => {
  const { userName, comment } = req.body;
  comments.push({ userName, comment, id: uuid() });
  //   res.send("it worked");
  res.redirect("/comments");
});

// GET - One particular response
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const commentS = comments.find((c) => c.id === id);
  console.log(commentS);
  res.render("comments/singleComment", { commentS });
});

// Update Request
app.patch("/comments/:id", (req, res) => {
  const id = req.params.id;
  const nComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = nComment;
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const id = req.params.id;
  const commentS = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment: commentS });
});

// DELETE Reques
app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  comments = comments.filter((c) => c.id !== id);
  console.log(comments);
  res.redirect("/comments");
});

/*
// Routes
app.get("/tacos", (req, res) => {
  res.send("GET/tacos response");
});

app.post("/tacos", (req, res) => {
  const { name, number } = req.body;
  console.log(name, number);
  res.send("You can post tacos at this route!");
});
*/

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`);
});

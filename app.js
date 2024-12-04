console.log("Hello World :D");
const express = require("express");
const cors = require("cors");
const postsRouter = require("./routers/posts.js");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandlers");
const path = require("path");

const app = express();
const port = 3017;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/", (req, res) => {
  console.log("Questa e' la root!");
  res.send("Hello World :D");
});

app.use("/posts", postsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Il server sta ascoltando sulla porta: ${port}`);
});

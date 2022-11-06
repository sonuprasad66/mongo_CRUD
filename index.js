const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
var cors = require("cors");
app.use(cors());
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/User.route");
const { todosRouter } = require("./Routes/Todos.route");

app.get("/", (req, res) => {
  res.send({ msg: "Home Page" });
});

app.use("/", userRouter);
app.use("/", todosRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB connected successfull");
  } catch (err) {
    console.log("DB connected Faild");
    console.log(err);
  }
  console.log(`App Listening on port ${process.env.PORT}`);
});

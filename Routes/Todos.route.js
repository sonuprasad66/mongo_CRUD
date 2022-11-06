const express = require("express");
const todosRouter = express.Router();
const { todosModel } = require("../Models/Todos.Model");

const { authentication } = require("../Middlewares/Auth");
const { userModel } = require("../Models/User.model");

todosRouter.get("/todos", authentication, async (req, res) => {
  const { user_id } = req.body;
  const user = await todosModel.find({ user_id });
  res.send({ user });
});

todosRouter.post("/create", authentication, async (req, res) => {
  const new_data = new todosModel({
    ...req.body,
  });
  await new_data.save();
  res.send({ msg: "Data Created successfull" });
});

todosRouter.delete("/delete", authentication, async (req, res) => {
  const { user_id } = req.body;
  // const { _id } = req.params;
  // const user = await todosModel.find({ user_id });
  // const { _id } = user;
  console.log(user_id);
  await todosModel.deleteOne({ user_id: user_id });
  res.send({ msg: "data deleted successfull" });
});

// todosRouter.delete("/delete", authentication, async (req, res) => {
//   let { _id, user_id } = req.body;
//   console.log(_id, user_id);
//   const data  = await todosModel.find({user_id});
//   console.log(data);
//   // await todosModel.findOneAndDelete({ user_id: user_id, _id: _id });
//   let remaining = await todosModel.find({ user_id: user_id });
//   console.log(remaining);
//   res.send(remaining);
// });

todosRouter.patch("/patch", authentication, async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id);
  await todosModel.updateOne({ user_id }, { $set: req.body });
  res.send({ msg: "data updated successfull" });
});

module.exports = {
  todosRouter,
};

const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema({
  title: { type: String, require: true },
  status: { type: String, default: "pending" },
  tag: { type: String, require: true },
  user_id: { type: String, require: true },
});

const todosModel = new mongoose.model("todo", TodosSchema);

module.exports = {
  todosModel,
};

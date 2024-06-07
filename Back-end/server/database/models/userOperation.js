const mongoose = require("mongoose");


const operationSchema = new mongoose.Schema(
  {
    date: String,
    title: String,
    montant: Number,
    description: String,
    category: String,
  },);
module.exports = mongoose.model("Operation", operationSchema);




const mongoose = require("mongoose");
const Operation = require("./userOperation");


const accountSchema = new mongoose.Schema(
		{
			name: String,
			nbAccount: String, 
			solde: Number,
			operations: [Operation.schema],
		},
);
module.exports = mongoose.model("Account", accountSchema);

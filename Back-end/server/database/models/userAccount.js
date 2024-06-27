const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema(
		{
			name: String,
			nbAccount: String, 
			solde: Number,
		},
);
module.exports = mongoose.model("Account", accountSchema);

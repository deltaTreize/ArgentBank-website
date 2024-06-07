const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createUser = async serviceData => {
  console.log(serviceData)
  try {
    const user = await User.findOne({ email: serviceData.email })
    if (user) {
      throw new Error('Email already exists')
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12)

    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      userName: serviceData.userName,
			account: serviceData.account,
    })
  console.log(newUser)
    let result = await newUser.save()

    return result
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.getUserProfile = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const user = await User.findOne({ _id: decodedJwtToken.id });

		if (!user) {
			throw new Error("User not found!");
		}

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.loginUser = async (serviceData) => {
	try {
		const user = await User.findOne({ email: serviceData.email });

		if (!user) {
			throw new Error("User not found!");
		}
		const isValid = await bcrypt.compare(serviceData.password, user.password);

		if (!isValid) {
			throw new Error("Password is invalid");
		}

		const token = jwt.sign(
			{ id: user._id },
			process.env.SECRET_KEY || "default-secret-key",
			{ expiresIn: "1d" }
		);

		return { token };
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.updateUserProfile = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const user = await User.findOneAndUpdate(
			{ _id: decodedJwtToken.id },
			{
				userName: serviceData.body.userName,
			},
			{ new: true }
		);
		if (!user) {
			throw new Error("User not found!");
		}

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.updateDescription = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const userId = serviceData.headers.id;
		const accountId = serviceData.headers.idaccount;
		const operationId = serviceData.headers.operationid;
		const user = await User.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		const accountIndex = user.account.findIndex(
			(data) => data.id === accountId
		);

		if (accountIndex === -1) {
			throw new Error("Account not found");
		}

		const operationIndex = user.account[accountIndex].operations.findIndex(
			(data) => data.id === operationId
		);

		if (operationIndex === -1) {
			throw new Error("Operation not found");
		}

		user.account[accountIndex].operations[operationIndex].description =
			serviceData.body.description;

		await user.save();

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.updateCategory = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const userId = serviceData.headers.id;
		const accountId = serviceData.headers.idaccount;
		const operationId = serviceData.headers.operationid;
		const user = await User.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		const accountIndex = user.account.findIndex(
			(data) => data.id === accountId
		);

		if (accountIndex === -1) {
			throw new Error("Account not found");
		}

		const operationIndex = user.account[accountIndex].operations.findIndex(
			(data) => data.id === operationId
		);

		if (operationIndex === -1) {
			throw new Error("Operation not found");
		}

		user.account[accountIndex].operations[operationIndex].category =
			serviceData.body.category;

		await user.save();

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

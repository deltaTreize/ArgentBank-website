const axios = require("axios");
const signupApi = "http://localhost:3001/api/v1/user/signup";

const users = [
	{
		firstName: "Tony",
		lastName: "Stark",
		email: "tony@stark.com",
		password: "password123",
		userName: "Iron-Man",
		accounts: [
			{
				name: "compte courant",
				nbAccount: "123456789",
				solde: 1000,
				operations: [
					{
						date: "22/01/01",
						title: "operation 1",
						montant: 100,
						description: "description 1",
						category: "category 1",
					},
					{
						date: "22/01/01",
						title: "operation 2",
						montant: 100,
						description: "description 2",
						category: "category 2",
					},
					{
						date: "22/01/01",
						title: "operation 3",
						montant: 100,
						description: "description 3",
						category: "category 3",
					},
				],
			},
			{
				name: "compte courant",
				nbAccount: "987654321",
				solde: 1000,
				operations: [
					{
						date: "22/01/01",
						title: "operation 1",
						montant: 100,
						description: "description 1",
						category: "category 1",
					},
					{
						date: "22/01/01",
						title: "operation 2",
						montant: 100,
						description: "description 2",
						category: "category 2",
					},
					{
						date: "22/01/01",
						title: "operation 3",
						montant: 100,
						description: "description 3",
						category: "category 3",
					},
				],
			},
			{
				name: "compte courant",
				nbAccount: "910111213",
				solde: 1000,
				operations: [
					{
						date: "22/01/01",
						title: "operation 1",
						montant: 100,
						description: "description 1",
						category: "category 1",
					},
					{
						date: "22/01/01",
						title: "operation 2",
						montant: 100,
						description: "description 2",
						category: "category 2",
					},
					{
						date: "22/01/01",
						title: "operation 3",
						montant: 100,
						description: "description 3",
						category: "category 3",
					},
				],
			},
		],
	},
	{
		firstName: "Steve",
		lastName: "Rogers",
		email: "steve@rogers.com",
		password: "password456",
		userName: "Captain",
		accounts: [
			{
				name: "compte courant",
				nbAccount: "123456789",
				solde: 1000,
				operations: [
					{
						date: "22/01/01",
						title: "operation 1",
						montant: 100,
						description: "description 1",
						category: "category 1",
					},
					{
						date: "22/01/01",
						title: "operation 2",
						montant: 100,
						description: "description 2",
						category: "category 2",
					},
					{
						date: "22/01/01",
						title: "operation 3",
						montant: 100,
						description: "description 3",
						category: "category 3",
					},
				],
			},	
			{
				name: "compte courant",
				nbAccount: "987654321",
				solde: 1000,
				operations: [
					{
						date: "22/01/01",
						title: "operation 1",
						montant: 100,
						description: "description 1",
						category: "category 1",
					},
					{
						date: "22/01/01",
						title: "operation 2",
						montant: 100,
						description: "description 2",
						category: "category 2",
					},
					{
						date: "22/01/01",
						title: "operation 3",
						montant: 100,
						description: "description 3",
						category: "category 3",
					},
				],
			},
			{
				name: "compte courant",
				nbAccount: "910111213",
				solde: 1000,
				operations: [
					{
						date: "22/01/01",
						title: "operation 1",
						montant: 100,
						description: "description 1",
						category: "category 1",
					},
					{
						date: "22/01/01",
						title: "operation 2",
						montant: 100,
						description: "description 2",
						category: "category 2",
					},
					{
						date: "22/01/01",
						title: "operation 3",
						montant: 100,
						description: "description 3",
						category: "category 3",
					},
				],
			},
		],
	},
];

users.forEach((user) => {
	axios
		.post(signupApi, user)
		.then((response) => console.log(response))
		.catch((error) => console.log(error));
});

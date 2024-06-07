import {
	AuthActionTypes,
	UserState,
} from "../actions/typeAction";

let initialState: UserState = {
	id: "",
	firstName: "",
	lastName: "",
	userName: "",
	email: "",
	account: [],
};

const userReducer = (	state = initialState,	action: AuthActionTypes ): UserState => {
	switch (action.type) {
		case "SIGN_IN":
			return {
				...state,
				id: action.payload.id,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				userName: action.payload.userName,
				email: action.payload.email,
				account: action.payload.account,
			};

		case "LOGOUT":
			return initialState;

		default:
			return state;
	}
};

export default userReducer;

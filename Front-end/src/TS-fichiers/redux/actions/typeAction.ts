export interface SignInAction {
	type: "SIGN_IN";
	payload: UserState;
}

export interface LogoutAction {
	type: "LOGOUT";
}

export interface TokenOnAction {
	type: "TOKEN_ON";
	payload: { token: string };
}

export interface TokenOffAction {
	type: "TOKEN_OFF";
}

export interface TokenState {
	token: string;
}

export interface UserState {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	account: Account[];
}

export interface operations{
	_id: number,
	date: string,
	title: string,
	montant: number,
	description: string,
	category: string,
}

export interface Account {
	_id: number;
	name: string;
	nbAccount: string;
	solde: number;
	operations: operations[];
}

export interface RootState {
	token: TokenState;
	user: UserState;
}

export type AuthActionTypes =
	| SignInAction
	| LogoutAction
	| TokenOnAction
	| TokenOffAction;

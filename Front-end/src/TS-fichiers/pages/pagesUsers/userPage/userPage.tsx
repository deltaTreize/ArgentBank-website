import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "../../../components/button/button";
import Spinner from "../../../components/spinner/spinner";
import { Login } from "../../../redux/actions/action";
import { AuthActionTypes, RootState, UserState } from "../../../redux/actions/typeAction";
import "./userPage.scss";
import { Account } from "../../../components/account/account";


export function User() {
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const userId = useSelector((state: RootState) => state.user.id);
	const accounts = useSelector((state: RootState) => state.user.accounts);
	const id = useSelector((state: RootState) => state.user.id);
	const userName = useSelector((state: RootState) => state.user.userName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const email = useSelector((state: RootState) => state.user.email);
	const token = useSelector((state: RootState) => state.token.token);
	const [isEditActive, setIsEditActive] = useState<boolean>(false);
	const dispatch:Dispatch<AuthActionTypes>= useDispatch();


	function handleEdit() {
		setIsEditActive(!isEditActive);
	}

	const [userNameValue, setUserNameValue] = useState<string>(userName);

	async function handleChange() {
		let headersList = {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			userName: userNameValue,
		});
		fetch(
			"http://localhost:3001/api/v1/user/profile",
			{
				method: "PUT",
				headers: headersList,
				body: bodyContent,
			}
		);
		const userData: UserState = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			userName: userNameValue,
			email: email,
			accounts: accounts,
		};
		dispatch(Login(userData));
		setUserNameValue("");
	}

	if (!accounts) {
		return <Spinner />;
	}

	return (
		<main className="main bg-dark">
						<div className="header-edit">
				<h1>Welcome back <br/>{firstName} {lastName}!</h1>
			</div>
			<div className={isEditActive ? 'edit-active' : 'edit'}>
				<Button to={``} text="Edit Name" type={""} className={"editName"} onClick={handleEdit} />
				<form action="" onSubmit={handleChange}>
					<div className="allLabel">
						<label htmlFor="userName">
							User name:
							<input
								type="text"
								placeholder={userName}
								id="userName"
								onChange={(e) =>
									setUserNameValue(e.target.value)
								}
							/>
						</label>
						<label className="infos-edit">
						Fisrt name:
							<input className="infos-edit-content" type="text" value={firstName} readOnly/>
						</label>
						<label className="infos-edit">
							Last name:
							<input className="infos-edit-content" type="text" value={lastName} readOnly/>
						</label>
					</div>
					<div className="edit-buttons">
						<input
							className="buttonArgentBank"
							type="submit"
							value="Save"
						/>
						<Button to={``} text="Cancel" type={""} className={""} onClick={handleEdit } />
					</div>
				</form>
			</div>

			<div className="allInfo-wrapper">
				<div className="account-wrapper">
					{accounts.map((data) =>
						<Account
							key={firstName + data.nbAccount + userId}
							firstName={firstName}
							nbAccount={data.nbAccount}
							solde={data.solde}
							name={data.name}
						/>
					)}
				</div>
			</div>
		</main>
	);
}

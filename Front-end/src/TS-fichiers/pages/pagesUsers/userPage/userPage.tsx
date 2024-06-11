import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "../../../components/button/button";
import Spinner from "../../../components/spinner/spinner";
import { Login } from "../../../redux/actions/action";
import { AuthActionTypes, RootState, UserState } from "../../../redux/actions/typeAction";
import "./userPage.scss";


export function User() {
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const userId = useSelector((state: RootState) => state.user.id);
	const accounts = useSelector((state: RootState) => state.user.accounts);
	const id = useSelector((state: RootState) => state.user.id);
	const userName = useSelector((state: RootState) => state.user.userName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const email = useSelector((state: RootState) => state.user.email);
	const token = useSelector((state: RootState) => state.token.token);
	const dispatch:Dispatch<AuthActionTypes>= useDispatch();

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
				<h1>Vos Informations</h1>
			</div>
			<div className="edit">
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
						<Button to={`/user/home`} text="Cancel" type={""} className={""} onClick={function (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
							throw new Error("Function not implemented.");
						} } />
					</div>
				</form>
			</div>

			<div className="allInfo-wrapper">
				<div className="account-wrapper">
					{accounts.map((data) =>
							<section
								className="account-userPage"
								key={firstName + data.nbAccount}
							>
								<div className="account-userPage-wrapper">
									<h3 className="account-title">{data.name}</h3>
									<p className="account-amount">{data.solde.toFixed(2)}€</p>
									<p className="account-amount-nbAccount">{data.nbAccount}</p>
								</div>
								<div className="account-content-wrapper cta">
									<Button
										to={`/user/home/${userId}/${data.nbAccount}`}
										text=">"
										type={""}
										className={"transactions-button"}
										onClick={function (
											event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
										): void {
											throw new Error("Function not implemented.");
										}}
									/>
								</div>
							</section>
					)}
				</div>
			</div>
		</main>
	);
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { Login, TokenOn } from "../../../redux/actions/action";
import { AuthActionTypes, UserState } from "../../../redux/actions/typeAction";
import "./signInPage.scss";

export function SignIn() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [inputType, setInputType] = useState<string>("password");
	const [checked, setChecked] = useState<boolean>(false);
	const [seSouvenir, setSeSouvenir] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const dispatch: Dispatch<AuthActionTypes> = useDispatch();
	const navigate = useNavigate();

	function handleChecked() {
		setChecked(!checked);
		!checked ? setInputType("text") : setInputType("password");
	}

	const HandleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);

		const loginData = await fetch("http://localhost:3001/api/v1/user/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				email: `${email}`,
				password: `${password}`,
			}),
		});
		const loginDataJson = await loginData.json();

		if (loginDataJson.status === 400) {
			setErrorMessage(loginDataJson.message);
			return;
		}

		if (loginDataJson.status === 200) {
			dispatch(TokenOn(loginDataJson.body.token));

			const userDataFetched = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + loginDataJson.body.token,
					},
				}
			);
			const userDataJson = await userDataFetched.json();

			const userData: UserState = {
				id: userDataJson.body.id,
				firstName: userDataJson.body.firstName,
				lastName: userDataJson.body.lastName,
				userName: userDataJson.body.userName,
				email: userDataJson.body.email,
				accounts: userDataJson.body.accounts,
			};
			dispatch(Login(userData));
			navigate("/user/home");
		}
	};
	return (
		<main>
			<div className="main bg-blur"></div>
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1 className="title-signup">Se connecter</h1>
				<form onSubmit={HandleSubmit}>
					<div className="input-wrapper">
						<label>
							Email
							<input
								type="text"
								id="username"
								autoComplete="username"
								onChange={(e) => {
									setEmail(e.target.value);
									setErrorMessage(null);
								}}
							/>
						</label>
					</div>
					<div className="input-wrapper">
						<label>
							Mot de passe
							<input
								type={inputType}
								id="password"
								autoComplete="current-password"
								onChange={(e) => {
									setPassword(e.target.value);
									setErrorMessage(null);
								}}
							/>
							<span className="show" onClick={handleChecked}>
								{checked && <i className="fa-solid fa-eye"></i>}
								{!checked && <i className="fa-solid fa-eye-slash"></i>}
							</span>
						</label>
					</div>
					<div className="input-remember">
						<label>
							Se souvenir de moi
							<input
								type="checkbox"
								id="remember-me"
								checked={seSouvenir}
								onChange={(e) => setSeSouvenir(e.target.checked)}
							/>
						</label>
					</div>
					<button type="submit" className="buttonArgentBank sign-in-button">
						Se connecter
					</button>
				</form>
				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</section>
		</main>
	);
}

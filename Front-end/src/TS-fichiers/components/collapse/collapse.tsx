import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AuthActionTypes, RootState, UserState } from "../../redux/actions/typeAction";
import "./collapse.scss";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Login } from "../../redux/actions/action";

interface CollapseProps {
	title: string;
	date: string;
	description: string;
	montant: number;
	operationId: number;
	idAccount: number;
	category: string;
}

export function Collapse({
	title,
	date,
	description,
	montant,
	operationId,
	idAccount,
	category,
}: CollapseProps) {
	const [descripDisplay, setDescripDisplay] = useState<boolean>(false);
	const [categoryDisplay, setCategoryDisplay] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [descriptionValue, setDescriptionValue] = useState<string>("");
	const [categoryValue, setCategoryValue] = useState<string>("");
	const [pencilDescriptionDisplay, setPencilDescriptionDisplay] =
		useState<boolean>(true);
	const [pencilCategoryDisplay, setPencilCategoryDisplay] =
		useState<boolean>(true);
	const token = useSelector((state: RootState) => state.token.token);
	const userId = useSelector((state: RootState) => state.user.id);
	const [userData, setUserData] = useState<UserState>();
	const dispatch: Dispatch<AuthActionTypes> = useDispatch();


	async function updateDescription() {
		setIsDisabled(!isDisabled);
		let headersList = {
			id: `${userId}`,
			idaccount: `${idAccount}`,
			operationid: `${operationId}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			description: descriptionValue,
		});
		const userDataFetched = await fetch("http://localhost:3001/api/v1/user/account/operations/description", {
			method: "PUT",
			body: bodyContent,
			headers: headersList,
		})

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
	}
	async function updateCategory() {
		setIsDisabled(!isDisabled);
		let headersList = {
			id: `${userId}`,
			idaccount: `${idAccount}`,
			operationid: `${operationId}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			category: categoryValue,
		});
		const userDataFetched = await fetch("http://localhost:3001/api/v1/user/account/operations/category", {
			method: "PUT",
			body: bodyContent,
			headers: headersList,
		})

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
	}

	return (
		<div className="operation-account">
			<div className="entete-operation-account">
				<p className="operation-account-date">{date}</p>
				<p className="operation-account-infos-title">{title}</p>
				<p className="operation-account-montant">{montant.toFixed(2)} €</p>
				{!descripDisplay && (
					<i
						className="fa-solid fa-chevron-down"
						onClick={() => {
							setDescripDisplay(!descripDisplay);
							setCategoryDisplay(!categoryDisplay);
						}}
					></i>
				)}
				{descripDisplay && (
					<i
						className="fa-solid fa-chevron-up"
						onClick={() => {
							setDescripDisplay(!descripDisplay);
							setCategoryDisplay(!categoryDisplay);
						}}
					></i>
				)}
			</div>

			<div className="operation-account-infos">
				<div
					className="operation-account-infos-description"
					style={{
						display: descripDisplay === true ? "flex" : "none",
					}}
				>
					<p>description:</p>
					<div className="modification">
						<input
							placeholder={description}
							value={descriptionValue}
							disabled={isDisabled}
							onChange={(e) => setDescriptionValue(e.target.value)}
							className={isDisabled === true ? "invisible" : ""}/>
						<i
							className="fa-solid fa-pencil"
							style={{
								display: pencilDescriptionDisplay === true ? "flex" : "none",
							}}
							onClick={() => {
								setPencilDescriptionDisplay(!pencilDescriptionDisplay);
								setIsDisabled(!isDisabled);
							}}
						></i>
						<i
							className="fa-solid fa-check"
							style={{
								display: pencilDescriptionDisplay === true ? "none" : "flex",
							}}
							onClick={() => {
								updateDescription();
								setPencilDescriptionDisplay(!pencilDescriptionDisplay);
							}}
						></i>
					</div>
				</div>
				<div
					className="operation-account-infos-category"
					style={{
						display: categoryDisplay === true ? "flex" : "none",
					}}
				>
					<p>catégories:</p>
					<div className="modification">
						<input
							placeholder={category}
							value={categoryValue}
							disabled={isDisabled}
							onChange={(e) => setCategoryValue(e.target.value)}
							className={isDisabled === true ? "invisible" : ""}/>
						<i
							className="fa-solid fa-pencil"
							style={{
								display: pencilCategoryDisplay === true ? "flex" : "none",
							}}
							onClick={() => {
								setPencilCategoryDisplay(!pencilCategoryDisplay);
								setIsDisabled(!isDisabled);
							}}
						></i>
						<i
							className="fa-solid fa-check"
							style={{
								display: pencilCategoryDisplay === true ? "none" : "flex",
							}}
							onClick={() => {
								updateCategory();
								setPencilCategoryDisplay(!pencilCategoryDisplay);
							}}
						></i>
					</div>
				</div>
			</div>
		</div>
	);
}

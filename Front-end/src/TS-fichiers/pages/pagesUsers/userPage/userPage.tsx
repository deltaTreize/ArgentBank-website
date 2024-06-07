import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../components/button/button";
import { RootState } from "../../../redux/actions/typeAction";
import "./userPage.scss";
import Spinner from "../../../components/spinner/spinner";


export function User() {
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const userId = useSelector((state: RootState) => state.user.id);
	const account = useSelector((state: RootState) => state.user.account);

	if (!account) {
		return <Spinner />;
	}

	return (
		<main className="main bg-dark">
			<div className="allInfo-wrapper">
				<div className="account-wrapper">
					{account.map((data) =>
							<section
								className="account-userPage"
								key={firstName + data.nbAccount}
							>
								<div className="account-userPage-wrapper">
									<p className="account-amount-nbAccount">{data.nbAccount}</p>
									<h3 className="account-title">{data.name}</h3>
									<p className="account-amount">{data.solde.toFixed(2)}€</p>
								</div>
								<div className="account-content-wrapper cta">
									<Button
										to={`/user/home/${userId}/${data.nbAccount}`}
										text="Transactions"
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

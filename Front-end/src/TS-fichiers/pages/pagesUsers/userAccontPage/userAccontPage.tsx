import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Collapse } from "../../../components/collapse/collapse";
import {  RootState } from "../../../redux/actions/typeAction";
import "./userAccountPage.scss";
import { BackArrow } from "../../../components/backArrow/backArrow";
import Spinner from "../../../components/spinner/spinner";


export function UserAccontPage() {
	const dataUsers = useSelector((state: RootState) => state.user.account);

	const { nbAccount } = useParams();


	const targetAccount = dataUsers.find((nb) => nb.nbAccount === nbAccount)
		
	const operations = targetAccount?.operations.slice().reverse()

	if (!targetAccount) {
		return <Spinner />;
	}
	return (
		<main className="main bg-dark">
			<BackArrow chemin={"/user/home"} />
			{targetAccount.name === "Compte courant" &&
			 <section className="dashboard portefeuille-wrapper">
			</section>}
			<div className="account-userAccountPage">
				<section className="entete-account">
					<p className="entete-account-description">{targetAccount.name}</p>
					<p className="entete-account-description">
						{targetAccount.nbAccount}
					</p>
					<p className="entete-account-description" style={{ color: Number(targetAccount.solde) >= 0 ? "green" : "red" }}>
						{targetAccount.solde.toFixed(2)} €
					</p>
				</section>
				<section className="AllOperation-account">
					{operations?.map((data) => (
						<Collapse
							title={data.title}
							date={data.date}
							montant={data.montant}
							description={data.description}
							key={data._id}
							operationId={data._id}
							idAccount={targetAccount._id}
							category={data.category}
						/>
					))}
				</section>
			</div>
		</main>
	);
}

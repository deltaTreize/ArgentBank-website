import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Collapse } from "../../../components/collapse/collapse";
import Spinner from "../../../components/spinner/spinner";
import { RootState } from "../../../redux/actions/typeAction";
import "./userAccountPage.scss";

export function UserAccontPage() {
	const dataUsers = useSelector((state: RootState) => state.user.accounts);

	const { nbAccount } = useParams();

	const targetAccount = dataUsers.find((nb) => nb.nbAccount === nbAccount);

	const operations = targetAccount?.operations.slice().reverse();

	if (!targetAccount) {
		return <Spinner />;
	}
	return (
		<main className="main bg-dark">
			{targetAccount.name === "Compte courant" && (
				<section className="dashboard portefeuille-wrapper"></section>
			)}
			<div className="account-userAccountPage">
				<section className="entete-account">
					<div className="text">
						<p className="entete-account-description">{targetAccount.name}</p>
						<p className="entete-account-solde">
							{targetAccount.solde.toFixed(2)} €
						</p>
						<p className="entete-account-description">
							{targetAccount.nbAccount}
						</p>
					</div>
					<Link to={"/user/home"}><i className="fa-solid fa-x"></i></Link>
				</section>
				<section className="title-culomn">
					<p>Date</p>
					<p>Description</p>
					<p className="title-culomn-montant">Montant</p>
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

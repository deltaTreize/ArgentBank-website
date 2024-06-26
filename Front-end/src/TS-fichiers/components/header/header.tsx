import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Logout, TokenOff } from "../../redux/actions/action";
import { RootState } from "../../redux/actions/typeAction";
import "./header.scss";

export function Header() {
	const token = useSelector((state: RootState) => state.token.token);
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const logged = token !== "" ? true : false;
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch<any>(TokenOff());
		dispatch<any>(Logout());
	};

	return (
		<div className="main-nav">
			<NavLink className="main-nav-logo" to={"/"}>
				<img
					className="main-nav-logo-image"
					src="../../../assets/argentBankLogo.webp"
					alt="Argent Bank Logo"
				/>
			</NavLink>
			<nav className="connectionLinks">
				{logged && (
					<div className="userName">
						<i className="fa fa-user-circle"></i>
						{firstName}
					</div>
				)}
				{!logged && (
					<NavLink className="main-nav-item" id="signInLink" to={"/sign-In"}>
						<i className="fa fa-user-circle"></i>
						Sign In
					</NavLink>
				)}
				{logged && (
					<NavLink
						className="main-nav-item"
						id="signOutLink"
						to={"/"}
						onClick={handleLogout}
					>
						Sign Out
					</NavLink>
				)}
			</nav>
		</div>
	);
}

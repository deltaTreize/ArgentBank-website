import React, { StrictMode } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer } from "./TS-fichiers/components/footer/footer";
import { Header } from "./TS-fichiers/components/header/header";
import { HomePage } from "./TS-fichiers/pages/pagePublic/homePage/homePage";
import { SignIn } from "./TS-fichiers/pages/pagePublic/signInPage/signInPage";
import { User } from "./TS-fichiers/pages/pagesUsers/userPage/userPage";
import { RootState } from "./TS-fichiers/redux/actions/typeAction";

function App() {
	const token = useSelector((state: RootState) => state.token);
	const logged: boolean = token ? true : false;
	return (
		<StrictMode>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/sign-In" element={<SignIn />} />
					{logged && <Route path="/profile" element={<User />} />}
				</Routes>
				<Footer />
			</BrowserRouter>
		</StrictMode>
	);
}

export default App;

import React, { Component, Fragment } from "react";
import style from "../style/main.scss";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./HOC/PrivateRoute";

import SignUp from "./Pages/SignUp";
import SignUpSuccess from "./Pages/SignUpSuccess";
import VerifyAccount from "./Pages/VerifyAccount";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import NewPassword from "./Pages/NewPassword";

import Dashboard from "./Pages/Dashboard";
import Meals from "./Pages/Meals";

import { hot } from "react-hot-loader";

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
				<div style={{ height: "100%", display: "grid" }}>
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/success" component={SignUpSuccess} />
					<Route
						exact
						path="/verify/:id/:hashID/:hash"
						component={VerifyAccount}
					/>
					<Route exact path="/login" component={Login} />
					<Route
						exact
						path="/reset_password"
						component={ForgotPassword}
					/>
					<Route
						exact
						path="/reset/:id/:hashID/:hash"
						component={NewPassword}
					/>
					<PrivateRoute exact path="/" component={Dashboard} />
					<PrivateRoute exact path="/meals" component={Meals} />
				</div>
			</BrowserRouter>
		);
	}
}

export default hot(module)(App);

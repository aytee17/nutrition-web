import React from "react";
import { Router } from "@reach/router";
import Private from "./Private";
import SignUpSuccess from "./Pages/SignUpSuccess";
import VerifyAccount from "./Pages/VerifyAccount";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";

import Dashboard from "./Pages/Dashboard";
import Meals from "./Pages/Meals/Meals";

import Loadable from "react-loadable";

import { hot } from "react-hot-loader";

import AppLayout from "./Templates/AppLayout";

const SignUp = Loadable({
    loader: () => import("./Pages/SignUp"),
    loading: () => <div />
});

const NewPassword = Loadable({
    loader: () => import("./Pages/NewPassword"),
    loading: () => <div />
});

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <SignUp path="/signup" />
                <SignUpSuccess path="/success" />
                <VerifyAccount path="/verify/:id/:hashID/:hash" />
                <Login path="/login" />
                <ForgotPassword path="/reset_password" />
                <NewPassword path="/reset/:id/:hashID/:hash" />
                <Private path="/">
                    <AppLayout path="/">
                        <Dashboard path="/" />
                        <Meals path="/meals" />
                    </AppLayout>
                </Private>
            </Router>
        );
    }
}

export default hot(module)(App);

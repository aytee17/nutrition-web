import React, { Component } from "react";

import DocumentTitle from "react-document-title";
import { Redirect, Link } from "@reach/router";

import { WelcomeHeading, Logo, Pane, Direction } from "../Templates/Templates";
import LoginForm from "../Forms/LoginForm";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../actions/index";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: undefined,
            id: undefined,
            hashID: undefined,
            email: undefined
        };
    }

    loggedInUnverified = ({ id, hashID, email }) => {
        this.setState({ verified: false, id, hashID, email });
    };

    render() {
        if (this.state.verified === false) {
            return (
                <Redirect
                    exact
                    push
                    to={{
                        pathname: "/success",
                        state: {
                            id: this.state.id,
                            hashID: this.state.hashID,
                            email: this.state.email
                        }
                    }}
                />
            );
        } else if (this.props.loggedIn) {
            return <Redirect to="/" />;
        } else {
            return (
                <DocumentTitle title="Login">
                    <div style={{ paddingTop: "9.375rem" }}>
                        <WelcomeHeading>
                            Login to <Logo />
                        </WelcomeHeading>
                        <Pane style={{ height: "240px" }} center>
                            <LoginForm
                                login={this.props.login}
                                loggedInUnverified={this.loggedInUnverified}
                            />
                        </Pane>

                        <Direction>
                            New to NutritionTrackr?{" "}
                            <Link to="/signup">Create an account</Link>
                        </Direction>
                    </div>
                </DocumentTitle>
            );
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

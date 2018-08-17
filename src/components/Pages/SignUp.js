import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import { Link, Redirect } from "@reach/router";
import { WelcomeHeading, Logo, Pane, Direction } from "../Templates/Templates";
import SignUpForm from "../Forms/SignUpForm";
import Recaptcha from "../Recaptcha";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            hashID: undefined,
            email: undefined,
            submitted: false
        };
    }

    setSubmitted = (submitted, id, hashID, email) => {
        this.setState({ id, hashID, email, submitted });
    };

    render() {
        if (this.state.submitted) {
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
        } else {
            return (
                <DocumentTitle title="Sign Up">
                    <div style={{ paddingTop: "70px" }}>
                        <WelcomeHeading>
                            Join <Logo />
                        </WelcomeHeading>
                        <Pane
                            style={{
                                width: "455px",
                                paddingBottom: "16.5px"
                            }}
                            center
                        >
                            <Recaptcha>
                                {getRecaptchaToken => (
                                    <SignUpForm
                                        getRecaptchaToken={getRecaptchaToken}
                                        setSubmitted={this.setSubmitted}
                                    />
                                )}
                            </Recaptcha>
                        </Pane>

                        <Direction>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </Direction>
                    </div>
                </DocumentTitle>
            );
        }
    }
}

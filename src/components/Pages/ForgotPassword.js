import React from "react";
import ResetPasswordForm from "../Forms/ResetPasswordForm";
import { Pane, Logo, WelcomeHeading, Direction } from "../Templates/Templates";
import { Link } from "@reach/router";
import Recaptcha from "../HOC/Recaptcha";

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { submitted: false, email: undefined };
    }

    setSubmitted = email => {
        this.setState({ submitted: true, email });
    };

    render() {
        const before =
            "Enter your email address to reveive \
		 an email with a link to reset your password.";

        const after =
            "An email has been sent with instructions on how to reset your password.";
        return (
            <div style={{ paddingTop: "9.375rem" }}>
                <WelcomeHeading>
                    <Logo />
                </WelcomeHeading>
                <Pane
                    style={{
                        height: this.state.submitted ? "10rem" : "16rem",
                        paddingTop: "1rem"
                    }}
                    center
                >
                    <div
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#333"
                        }}
                    >
                        {this.state.submitted
                            ? "Check your email"
                            : "Forgot your password?"}
                    </div>
                    <p
                        style={{
                            lineHeight: "1.5",
                            color: "#4e4a57",
                            fontSize: "0.9rem"
                        }}
                    >
                        {this.state.submitted ? after : before}
                    </p>
                    {this.state.submitted ? (
                        <div style={{ textAlign: "center", fontWeight: 700 }}>
                            {this.state.email}
                        </div>
                    ) : (
                        <Recaptcha>
                            {getRecaptchaToken => (
                                <ResetPasswordForm
                                    getRecaptchaToken={getRecaptchaToken}
                                    setSubmitted={this.setSubmitted}
                                />
                            )}
                        </Recaptcha>
                    )}
                </Pane>
                <Direction>
                    <Link to="/login">Back to Login</Link>
                </Direction>
            </div>
        );
    }
}

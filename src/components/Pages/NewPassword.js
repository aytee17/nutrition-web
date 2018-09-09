import React from "react";
import NewPasswordForm from "../Forms/NewPasswordForm";
import { Pane, Logo, WelcomeHeading } from "../Templates/Templates";

class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { submitted: false, invalidToken: false };
    }

    setSubmitted = () => {
        this.setState({ submitted: true });
    };

    render() {
        const before = "";
        const after =
            "An email has been sent with instructions on how to reset your password.";
        return (
            <div style={{ marginTop: "9.375rem" }}>
                <WelcomeHeading>
                    <Logo />
                </WelcomeHeading>
                <Pane
                    style={{
                        height: this.state.submitted ? "10rem" : "13rem",
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
                            ? "Your password has been changed"
                            : "Create a new password"}
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
                        <NewPasswordForm
                            {...this.props}
                            setSubmitted={this.setSubmitted}
                        />
                    )}
                </Pane>
            </div>
        );
    }
}

export default NewPassword;

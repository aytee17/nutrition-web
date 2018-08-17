import React, { Component } from "react";
import api from "../../utils/api";
import DocumentTitle from "react-document-title";
import { Pane } from "../Templates/Templates";
import { TickIcon } from "../Icons/Icons";
import TimedButton from "../UI/TimedButton";
import { Redirect } from "@reach/router";

export default class SignUpSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = { alreadyVerified: false };
    }

    render() {
        if (this.state.alreadyVerified) {
            return <Redirect to={{ pathname: "/login" }} />;
        } else if (!this.props.location.state) {
            return <Redirect to={{ pathname: "/signup" }} />;
        } else {
            const { id, email, hashID } = this.props.location.state;
            return (
                <DocumentTitle title="Account Created">
                    <div style={{ height: "100%" }}>
                        <Pane
                            style={{
                                width: "600px",
                                fontSize: "0.9rem",
                                padding: "1rem 1.4rem",
                                marginTop: "8rem"
                            }}
                            center
                        >
                            <div style={{ padding: "0.5rem" }}>
                                <div
                                    style={{
                                        fontSize: "1.2rem",
                                        borderBottom: "1px solid #e1e1e1",
                                        paddingBottom: "0.25rem",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        flexDirection: "row"
                                    }}
                                >
                                    <TickIcon />
                                    <div
                                        style={{ padding: "0.1rem 0 0 0.3rem" }}
                                    >
                                        Your account has been created
                                    </div>
                                </div>

                                <div style={{ padding: "1rem 0 2.2rem 0" }}>
                                    An email containing a verification link has
                                    been sent to:
                                    <div style={{ padding: "0.4rem" }}>
                                        <strong>{email}</strong>
                                    </div>
                                    Please confirm that this email address
                                    belongs to you clicking the link in the
                                    email.
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row"
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        marginLeft: "0.5rem",
                                        color: "#777"
                                    }}
                                >
                                    Didn't receive an email? It may take a few
                                    minutes to arrive.
                                    <br />
                                    Don't forget to check your spam/junk folder.
                                </div>

                                <TimedButton
                                    style={{ fontSize: "0.85rem" }}
                                    time={60}
                                    title="Resend Email"
                                    disabledTitle="Sent!"
                                    request={async () => {
                                        const response = await api.get(
                                            `/resend/${id}/${hashID}`
                                        );
                                        if (response.data.verified == true) {
                                            this.setState({
                                                alreadyVerified: true
                                            });
                                        }
                                        return response;
                                    }}
                                />
                            </div>
                        </Pane>
                    </div>
                </DocumentTitle>
            );
        }
    }
}

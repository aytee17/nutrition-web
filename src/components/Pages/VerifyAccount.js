import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login, logout } from "../../actions/index";

class VerifyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { verified: false, invalidToken: false };
    }

    componentDidMount() {
        let { id, hashID, hash } = this.props.match.params;
        http.get(`/verify/${id}/${hashID}/${hash}`)
            .then(response => {
                this.props.login(response.data);
                this.setState({ verified: true });
            })
            .catch(errors => {
                if (errors.response.status == 404) {
                    this.setState({ invalidToken: true });
                }
            });
    }

    render() {
        if (this.state.verified) {
            return <Redirect to="/" />;
        } else if (this.state.invalidToken) {
            return (
                <div>
                    This link is either invalid or expired.
                    <br />
                    Old links will expire if you requested a resend.
                    <br />
                    Check for the most recent activation email or login and
                    request a new one.
                </div>
            );
        } else {
            return <div>Verifying</div>;
        }
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ login, logout }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(VerifyAccount);

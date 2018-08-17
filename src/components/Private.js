import React from "react";
import { Redirect } from "@reach/router";
import { connect } from "react-redux";

const Private = ({ loggedIn, children }) => {
    return loggedIn ? children : <Redirect to="/login" />;
};

const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(Private);

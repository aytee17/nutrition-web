import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
    component: Component,
    componentProps,
    loggedIn,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                return loggedIn ? (
                    <Component {...componentProps} {...props} />
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
};
const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn
});
export default connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
)(PrivateRoute);

import React from "react";
import AppLayout from "../Templates/AppLayout";
import { Pane } from "../Templates/Templates";
import DetailsForm from "../Forms/DetailsForm";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUser } from "../../redux/actions/ActionCreators";

function Dashboard({ user, updateUser }) {
    if (user.weight === null || user.activity_level === null) {
        return (
            <AppLayout noBar>
                <Pane
                    center
                    style={{
                        marginTop: "3.5rem",
                        padding: "2rem",
                        width: "37%"
                    }}
                >
                    <div>Hi {user.name},</div>
                    <p>
                        Enter your <em>weight</em> and{" "}
                        <em>physical activity level</em> to calculate your
                        estimated energy requirement. You can change these
                        values later.
                    </p>

                    <DetailsForm user={user} updateUser={updateUser} />
                </Pane>
            </AppLayout>
        );
    } else {
        return <AppLayout />;
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ updateUser }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

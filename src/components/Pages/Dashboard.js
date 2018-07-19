import React from "react";

import AppTemplate from "../Templates/AppTemplate";
import { Pane } from "../Templates/Templates";
import DetailsForm from "../Forms/DetailsForm";
import { range } from "../../Utility";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUser } from "../../actions/index";

function Dashboard ({ user, updateUser }) {
	if (user.weight === null || user.activity_level === null) {
		return (
			<AppTemplate noBar >
				<Pane
					style={{ marginTop: "3.5rem", padding: "2rem", width: "37%" }}
				>
					<div>Hi {user.name},</div>
					<p>
						Enter your <em>weight</em> and{" "}
						<em>physical activity level</em> to calculate your
						estimated energy requirement. You can change these values later.
					</p>

					<DetailsForm user={user} updateUser={updateUser} />
				</Pane>
			</AppTemplate>
		);
	} else {
		return (
			<AppTemplate>
			</AppTemplate>
		);
	}
};

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

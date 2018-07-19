import React from "react";
import style from "./Header.scss";

import { Logo, MenuButton, MenuItem } from "./Templates";
import { AccountIcon} from "../Icons/Icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/index";


const Header = ({ dob, name, email, logout }) => (
	<div id={style["header"]}>
		<Logo
			style={{
				color: "#fbfbfb",
				fontSize: "1.25rem",
				fontWeight: "600",
				letterSpacing: "0px",
				marginLeft: "1rem" 
			}}
		/>
		<MenuButton>
			<AccountIcon />
			<MenuItem top>
				<div>{name}</div>
				<div style={{ fontSize: "0.75rem"}}>{email}</div>	
			</MenuItem>
			<MenuItem>Settings</MenuItem>
			<MenuItem onClick={() => logout()}>
				Logout
			</MenuItem>
		</MenuButton>
	</div>
);

const mapStateToProps = state => {
	const { name, email, dob } = state.user;
	return { name, email, dob };
};

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
